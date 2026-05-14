"use client";

import { useEffect, useState, type RefObject } from "react";

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options: { rootMargin?: string; threshold?: number } = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      {
        rootMargin: options.rootMargin ?? "0px",
        threshold: options.threshold ?? 0,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options.rootMargin, options.threshold]);

  return inView;
}

export function useSectionInView(
  selector: string,
  rootMargin = "200px 0px"
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [selector, rootMargin]);

  return inView;
}
