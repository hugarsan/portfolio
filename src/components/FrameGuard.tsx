"use client";

import { useEffect } from "react";

// Evita que la web se cargue dentro de un iframe ajeno (clickjacking).
// GitHub Pages no deja enviar X-Frame-Options ni frame-ancestors, y en <meta> no funcionan.
export default function FrameGuard() {
  useEffect(() => {
    if (window.self === window.top) return;
    document.documentElement.style.display = "none";
    try {
      window.top!.location.href = window.location.href;
    } catch {
      // Si el marco lo bloquea, la página queda oculta.
    }
  }, []);

  return null;
}
