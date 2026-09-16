'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value * value * (3 - 2 * value);

/** One camera for the entire landscape; the angler never scales independently. */
export function SceneCamera({ children }: { children: ReactNode }) {
  const camera = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = camera.current;
    const journey = node?.closest('.river-journey');
    const hero = journey?.querySelector<HTMLElement>('.living-hero');
    const title = hero?.querySelector<HTMLElement>('.hero-copy');
    const terrain = node?.querySelector<HTMLElement>('.scene-terrain');
    if (!node || !hero || !terrain) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 760px), (pointer: coarse)');
    let frame = 0;
    let start = 0, distance = 1, zoom = 0.5, panX = 0, panY = 0;
    let current = -1;
    const progress = () => ease(clamp((window.scrollY - start - 24) / distance));
    function draw() {
      frame = 0;
      if (!node || reduced.matches) return;
      const target = progress();
      current = current < 0 || Math.abs(target - current) < 0.001
        ? target : current + (target - current) * 0.18;
      node.style.transform = `translate3d(${panX * current}px, ${panY * current}px, 0) scale(${1 + zoom * current})`;
      if (compact.matches && title) title.style.opacity = String(1 - ease(clamp(current / 0.65)));
      if (current !== target) frame = requestAnimationFrame(draw);
    }
    function onScroll() {
      if (!reduced.matches && !frame && progress() !== current) frame = requestAnimationFrame(draw);
    }
    function measure() {
      if (!node || !hero || !terrain) return;
      cancelAnimationFrame(frame);
      frame = 0;
      node.style.removeProperty('transform');
      title?.style.removeProperty('opacity');
      if (reduced.matches) return;
      // Geometry is read only on resize, never during a scroll frame.
      const w = node.clientWidth, h = node.clientHeight;
      const x = terrain.offsetLeft + terrain.offsetWidth * 0.425;
      const y = terrain.offsetTop + terrain.offsetHeight * 0.60;
      start = hero.getBoundingClientRect().top + window.scrollY;
      distance = h * 0.78;
      zoom = compact.matches ? 0.22 : 0.5;
      // Keep every viewport edge covered as the river bend moves toward centre.
      panX = Math.max(-zoom * (w - x), Math.min(zoom * x, w * 0.5 - x));
      panY = Math.max(-zoom * (h - y), Math.min(zoom * y, h * 0.60 - y));
      node.style.transformOrigin = `${x}px ${y}px`;
      current = progress();
      draw();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    observer.observe(terrain);
    observer.observe(hero);
    reduced.addEventListener('change', measure);
    compact.addEventListener('change', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener('change', measure);
      compact.removeEventListener('change', measure);
      window.removeEventListener('scroll', onScroll);
      node.style.removeProperty('transform');
      node.style.removeProperty('transform-origin');
      title?.style.removeProperty('opacity');
    };
  }, []);
  return <div className="scene-camera" ref={camera}>{children}</div>;
}
