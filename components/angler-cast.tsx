/* oxlint-disable next/no-img-element -- Images use prebuilt responsive srcsets with hashed cache URLs. */
'use client';

import { responsiveImage } from '@/lib/responsive-image';
import { useEffect, useRef } from 'react';

const frames = ['zeo-angler', 'zeo-cast-lift', 'zeo-cast-backcast', 'zeo-cast-forward', 'zeo-cast-lookback-v2'];
// A held drift, pickup, backcast stop, forward stroke, then another drift.
const sequence = [
  { frame: 0, hold: 700 },
  { frame: 1, hold: 180 },
  { frame: 2, hold: 150 },
  { frame: 4, hold: 350 },
  { frame: 2, hold: 100 },
  { frame: 1, hold: 90 },
  { frame: 3, hold: 230 },
];

/** Discrete image cels: no continuous redraw or independent character scaling. */
export function AnglerCast() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let ready = false, visible = false, disposed = false;
    let step = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const canPlay = () => ready && visible && !document.hidden && !reduced.matches;

    function schedule() {
      timer = setTimeout(() => {
        timer = undefined;
        if (!canPlay()) return;
        step = (step + 1) % sequence.length;
        node!.dataset.castFrame = String(sequence[step].frame);
        schedule();
      }, sequence[step].hold);
    }
    function sync() {
      clearTimeout(timer);
      timer = undefined;
      if (reduced.matches) {
        step = 0;
        node!.dataset.castFrame = '0';
      }
      node!.dataset.castPlaying = String(canPlay());
      if (canPlay()) schedule();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    // Keep casting throughout the camera move, including touch scrolling.
    observer.observe(node);
    // Never switch into an undecoded image, even on a slow connection.
    Promise.all(Array.from(node.querySelectorAll('img'), img => img.decode()))
      .then(() => { if (!disposed) { ready = true; sync(); } })
      .catch(() => { /* Keep the original static illustration if a cel cannot load. */ });
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <div className="scene-angler" ref={root} data-cast-frame="0">
    {frames.map((name, index) => <img
      key={name}
      className="angler-cel"
      data-cel={index}
      {...responsiveImage(`/images/hero/${name}.webp`, '90px')}
      alt=""
      width={640}
      height={640}
      loading="eager"
      decoding="async"
      fetchPriority="low"
    />)}
  </div>;
}
