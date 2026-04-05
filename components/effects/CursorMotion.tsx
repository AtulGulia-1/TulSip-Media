"use client";

import { useEffect } from "react";

export function CursorMotion() {
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
}
