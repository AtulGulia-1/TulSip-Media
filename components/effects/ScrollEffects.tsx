"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => {
        el.classList.remove("is-visible");
        observer.observe(el);
      });

      (window as unknown as { __tulsipRevealObserver?: IntersectionObserver }).__tulsipRevealObserver =
        observer;
    }, 40);

    return () => {
      clearTimeout(timeout);
      const observer = (window as unknown as { __tulsipRevealObserver?: IntersectionObserver })
        .__tulsipRevealObserver;
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
