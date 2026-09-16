'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const frames = ['zeo-angler', 'zeo-cast-lift', 'zeo-cast-backcast', 'zeo-cast-forward', 'zeo-cast-lookback-v2'];
// A held drift, pickup, backcast stop, forward stroke, then another drift.
const sequence = [
  { frame: 0, hold: 2800 },
  { frame: 1, hold: 210 },
  { frame: 2, hold: 170 },
  { frame: 4, hold: 440 },
  { frame: 2, hold: 120 },
  { frame: 1, hold: 110 },
  { frame: 3, hold: 350 },
];

/** Discrete image cels: no continuous redraw or independent character scaling. */
export function AnglerCast() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    const hero = node?.closest('.river-journey')?.querySelector('.living-hero');
    if (!node || !hero) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 760px), (pointer: coarse)');
    let ready = false, visible = false, disposed = false;
    let step = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const canPlay = () => ready && visible && !document.hidden && !reduced.matches
      && !(compact.matches && document.documentElement.classList.contains('is-scrolling'));

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
    observer.observe(hero);
    // Never switch into an undecoded image, even on a slow connection.
    Promise.all(Array.from(node.querySelectorAll('img'), img => img.decode()))
      .then(() => { if (!disposed) { ready = true; sync(); } })
      .catch(() => { /* Keep the original static illustration if a cel cannot load. */ });
    reduced.addEventListener('change', sync);
    compact.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    document.addEventListener('zeooo-scroll-state', sync);
    return () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      compact.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      document.removeEventListener('zeooo-scroll-state', sync);
    };
  }, []);

  return <div className="scene-angler" ref={root} data-cast-frame="0">
    {frames.map((name, index) => <Image
      key={name}
      className="angler-cel"
      data-cel={index}
      unoptimized
      src={`/images/hero/${name}.webp`}
      alt=""
      width={640}
      height={640}
      loading="eager"
      fetchPriority="low"
    />)}
  </div>;
}
