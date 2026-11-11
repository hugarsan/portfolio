// Inferencia de la red del laboratorio (784 → 64 → 32 → 10) en el navegador.
// Los pesos vienen cuantizados a int8 de scripts/train-mnist.py y aquí se pasan a float.

type RawLayer = { shape: [number, number]; scale: number; w: string; b: number[] };

export type ModelMeta = {
  sizes: number[];
  params: number;
  quantization: string;
  testAccuracy: number;
  augmentedTestAccuracy: number;
  epochs: number;
};

export type Layer = { inDim: number; outDim: number; w: Float32Array; b: Float32Array };
export type Model = ModelMeta & { layers: Layer[] };

export async function loadModel(url: string): Promise<Model> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`modelo: HTTP ${res.status}`);
  const raw = (await res.json()) as ModelMeta & { layers: RawLayer[] };
  const layers = raw.layers.map((l) => {
    const bytes = Uint8Array.from(atob(l.w), (c) => c.charCodeAt(0));
    const q = new Int8Array(bytes.buffer);
    const w = new Float32Array(q.length);
    for (let i = 0; i < q.length; i++) w[i] = q[i] * l.scale;
    return { inDim: l.shape[0], outDim: l.shape[1], w, b: Float32Array.from(l.b) };
  });
  return { ...raw, layers };
}

/** Devuelve las activaciones de cada capa (entrada incluida); la última, ya en probabilidades. */
export function forward(model: Model, input: Float32Array): Float32Array[] {
  const acts: Float32Array[] = [input];
  model.layers.forEach((layer, li) => {
    const x = acts[acts.length - 1];
    const out = new Float32Array(layer.outDim);
    out.set(layer.b);
    for (let i = 0; i < layer.inDim; i++) {
      const xi = x[i];
      if (xi === 0) continue;
      const row = i * layer.outDim;
      for (let j = 0; j < layer.outDim; j++) out[j] += xi * layer.w[row + j];
    }
    if (li < model.layers.length - 1) {
      for (let j = 0; j < out.length; j++) if (out[j] < 0) out[j] = 0;
    } else {
      const max = Math.max(...out);
      let sum = 0;
      for (let j = 0; j < out.length; j++) sum += out[j] = Math.exp(out[j] - max);
      for (let j = 0; j < out.length; j++) out[j] /= sum;
    }
    acts.push(out);
  });
  return acts;
}

/**
 * Pasa el dibujo (canvas cuadrado, trazo blanco sobre transparente) al formato de MNIST:
 * recorta el trazo, lo encaja en 20×20 conservando la proporción y lo centra por su
 * centro de masas en una imagen de 28×28. Devuelve null si no hay nada dibujado.
 */
export function preprocess(src: HTMLCanvasElement): Float32Array | null {
  const ctx = src.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const { width: W, height: H } = src;
  const data = ctx.getImageData(0, 0, W, H).data;
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const k = 20 / Math.max(bw, bh);
  const dw = Math.max(1, Math.round(bw * k));
  const dh = Math.max(1, Math.round(bh * k));

  const tmp = document.createElement("canvas");
  tmp.width = 28;
  tmp.height = 28;
  const tctx = tmp.getContext("2d", { willReadFrequently: true });
  if (!tctx) return null;
  tctx.imageSmoothingEnabled = true;
  tctx.imageSmoothingQuality = "high";
  tctx.drawImage(src, minX, minY, bw, bh, Math.round((28 - dw) / 2), Math.round((28 - dh) / 2), dw, dh);
  const px = tctx.getImageData(0, 0, 28, 28).data;

  const img = new Float32Array(784);
  let mass = 0, cx = 0, cy = 0;
  for (let i = 0; i < 784; i++) {
    const v = px[i * 4 + 3] / 255;
    img[i] = v;
    mass += v;
    cx += v * (i % 28);
    cy += v * Math.floor(i / 28);
  }
  if (mass === 0) return null;
  const sx = Math.round(14 - cx / mass - 0.5);
  const sy = Math.round(14 - cy / mass - 0.5);
  const out = new Float32Array(784);
  for (let y = 0; y < 28; y++) {
    for (let x = 0; x < 28; x++) {
      const nx = x + sx, ny = y + sy;
      if (nx >= 0 && nx < 28 && ny >= 0 && ny < 28) out[ny * 28 + nx] = img[y * 28 + x];
    }
  }
  return out;
}
