"use client";

import { useEffect, useState } from "react";

// Escribe y borra cada rol en bucle, como en una terminal.
export default function TypedRoles({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[index % roles.length];
    let delay = deleting ? 28 : 55;
    if (!deleting && text === full) delay = 2200;
    if (deleting && text === "") delay = 300;

    const t = window.setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, roles]);

  return (
    <span>
      <span className="sr-only">{roles[0]}</span>
      <span aria-hidden="true">{text}</span>
      <span
        className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-[blink_1s_steps(1)_infinite] bg-accent-400"
        aria-hidden="true"
      />
    </span>
  );
}
