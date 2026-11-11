"""Entrena la red del «Laboratorio en vivo» y la exporta para el navegador.

Perceptrón multicapa 784 → 64 → 32 → 10 (ReLU + softmax) escrito solo con
numpy: forward, backprop y Adam a mano, sin frameworks. Se entrena con MNIST
y aumento de datos (giros, escalados, desplazamientos y grosor de trazo) para
que reconozca también los números dibujados con el ratón o el dedo.

Los pesos se cuantizan a int8 (una escala por capa) y se guardan en
public/models/mnist-mlp.json, que la web carga y ejecuta en el navegador.

Uso:
    python3 scripts/train-mnist.py <carpeta-con-los-.gz-de-MNIST>
"""

import base64
import gzip
import json
import sys
import time
from pathlib import Path

import numpy as np

SIZES = [784, 64, 32, 10]
EPOCHS = 30
BATCH = 128
LR = 2e-3
SEED = 7
OUT = Path(__file__).resolve().parent.parent / "public" / "models" / "mnist-mlp.json"


def load_idx(path: Path) -> np.ndarray:
    with gzip.open(path, "rb") as f:
        data = f.read()
    ndim = data[3]
    shape = [int.from_bytes(data[4 + 4 * i : 8 + 4 * i], "big") for i in range(ndim)]
    return np.frombuffer(data, dtype=np.uint8, offset=4 + 4 * ndim).reshape(shape)


def load(folder: Path):
    xtr = load_idx(folder / "train-images-idx3-ubyte.gz").astype(np.float32) / 255
    ytr = load_idx(folder / "train-labels-idx1-ubyte.gz").astype(np.int64)
    xte = load_idx(folder / "t10k-images-idx3-ubyte.gz").astype(np.float32) / 255
    yte = load_idx(folder / "t10k-labels-idx1-ubyte.gz").astype(np.int64)
    return xtr, ytr, xte, yte


def augment(x: np.ndarray, rng: np.random.Generator) -> np.ndarray:
    """Transformación afín aleatoria (bilineal) + engrosado ocasional del trazo."""
    n = x.shape[0]
    ang = rng.uniform(-0.25, 0.25, n)
    scale = rng.uniform(0.82, 1.15, n)
    shear = rng.uniform(-0.2, 0.2, n)
    tx, ty = rng.uniform(-2.5, 2.5, (2, n))
    cos, sin = np.cos(ang) / scale, np.sin(ang) / scale
    grid = np.arange(28, dtype=np.float32) - 13.5
    gy, gx = np.meshgrid(grid, grid, indexing="ij")
    gx, gy = gx[None] - tx[:, None, None], gy[None] - ty[:, None, None]
    sx = cos[:, None, None] * gx + (sin + shear)[:, None, None] * gy + 13.5
    sy = -sin[:, None, None] * gx + cos[:, None, None] * gy + 13.5
    x0, y0 = np.floor(sx).astype(np.int64), np.floor(sy).astype(np.int64)
    fx, fy = sx - x0, sy - y0
    pad = np.pad(x, ((0, 0), (1, 2), (1, 2)))
    idx = np.arange(n)[:, None, None]

    def at(yy, xx):
        return pad[idx, np.clip(yy + 1, 0, 30), np.clip(xx + 1, 0, 30)]

    out = (
        at(y0, x0) * (1 - fx) * (1 - fy)
        + at(y0, x0 + 1) * fx * (1 - fy)
        + at(y0 + 1, x0) * (1 - fx) * fy
        + at(y0 + 1, x0 + 1) * fx * fy
    )
    thick = rng.random(n) < 0.35
    if thick.any():
        t = out[thick]
        p = np.pad(t, ((0, 0), (1, 1), (1, 1)))
        dil = np.maximum.reduce([p[:, 1:-1, 1:-1], p[:, :-2, 1:-1], p[:, 2:, 1:-1], p[:, 1:-1, :-2], p[:, 1:-1, 2:]])
        out[thick] = dil
    return out.astype(np.float32)


def init(rng: np.random.Generator):
    params = []
    for fan_in, fan_out in zip(SIZES[:-1], SIZES[1:]):
        w = rng.normal(0, np.sqrt(2 / fan_in), (fan_in, fan_out)).astype(np.float32)
        params.append([w, np.zeros(fan_out, np.float32)])
    return params


def forward(params, x):
    acts = [x]
    for i, (w, b) in enumerate(params):
        z = acts[-1] @ w + b
        acts.append(np.maximum(z, 0) if i < len(params) - 1 else z)
    return acts


def accuracy(params, x, y) -> float:
    return float((forward(params, x.reshape(len(x), -1))[-1].argmax(1) == y).mean())


def train(xtr, ytr, xte, yte):
    rng = np.random.default_rng(SEED)
    params = init(rng)
    m = [[np.zeros_like(p) for p in layer] for layer in params]
    v = [[np.zeros_like(p) for p in layer] for layer in params]
    step = 0
    for epoch in range(1, EPOCHS + 1):
        t0 = time.time()
        lr = LR * 0.5 * (1 + np.cos(np.pi * (epoch - 1) / EPOCHS))
        order = rng.permutation(len(xtr))
        xa = augment(xtr[order], rng) if epoch > 1 else xtr[order]
        xa, ya = xa.reshape(len(xa), -1), ytr[order]
        for s in range(0, len(xa), BATCH):
            xb, yb = xa[s : s + BATCH], ya[s : s + BATCH]
            acts = forward(params, xb)
            logits = acts[-1] - acts[-1].max(1, keepdims=True)
            prob = np.exp(logits)
            prob /= prob.sum(1, keepdims=True)
            grad = prob
            grad[np.arange(len(yb)), yb] -= 1
            grad /= len(yb)
            step += 1
            for i in range(len(params) - 1, -1, -1):
                w, b = params[i]
                gw = acts[i].T @ grad + 1e-5 * w
                gb = grad.sum(0)
                if i > 0:
                    grad = (grad @ w.T) * (acts[i] > 0)
                for j, g in enumerate((gw, gb)):
                    m[i][j] = 0.9 * m[i][j] + 0.1 * g
                    v[i][j] = 0.999 * v[i][j] + 0.001 * g * g
                    mh = m[i][j] / (1 - 0.9**step)
                    vh = v[i][j] / (1 - 0.999**step)
                    params[i][j] -= lr * mh / (np.sqrt(vh) + 1e-8)
        acc = accuracy(params, xte, yte)
        print(f"época {epoch:2d}  test {acc:.4f}  lr {lr:.5f}  {time.time() - t0:.1f}s", flush=True)
    return params


def quantize(params):
    layers, deq = [], []
    for w, b in params:
        scale = float(np.abs(w).max() / 127)
        q = np.clip(np.round(w / scale), -127, 127).astype(np.int8)
        layers.append(
            {
                "shape": list(w.shape),
                "scale": scale,
                "w": base64.b64encode(q.tobytes()).decode(),
                "b": [round(float(x), 5) for x in b],
            }
        )
        deq.append([q.astype(np.float32) * scale, np.round(b, 5).astype(np.float32)])
    return layers, deq


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    xtr, ytr, xte, yte = load(Path(sys.argv[1]))
    params = train(xtr, ytr, xte, yte)
    layers, deq = quantize(params)
    acc = accuracy(deq, xte, yte)
    rng = np.random.default_rng(1)
    acc_aug = accuracy(deq, augment(xte, rng), yte)
    n_params = sum(w.size + b.size for w, b in params)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(
            {
                "name": "mnist-mlp",
                "sizes": SIZES,
                "params": int(n_params),
                "quantization": "int8 por capa",
                "testAccuracy": round(acc, 4),
                "augmentedTestAccuracy": round(acc_aug, 4),
                "epochs": EPOCHS,
                "layers": layers,
            },
            separators=(",", ":"),
        )
    )
    print(f"int8: test {acc:.4f} · test aumentado {acc_aug:.4f} · {n_params} parámetros → {OUT}")


if __name__ == "__main__":
    main()
