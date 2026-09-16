'use client';

import { useEffect, useRef, useState } from 'react';
import icons from '@/content/fish-icons.json';

/** Animate the existing illustration, keeping its head steady and bending toward the tail. */
export function FishSwimmer({ id }: { id: string }) {
  const icon = icons[id as keyof typeof icons];
  const photo = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Cached images can finish before hydration attaches the load handler.
    if (photo.current?.complete && photo.current.naturalWidth) setLoaded(true);
  }, [id]);

  useEffect(() => {
    const source = photo.current;
    const surface = canvas.current;
    if (!loaded || !source || !surface || !source.naturalWidth) return;
    const context = surface.getContext('2d');
    if (!context) return;
    let disposed = false;
    let frame = 0;
    let visible = false;
    let last = 0;
    const hash = [...id].reduce((value, letter) => Math.imul(value ^ letter.charCodeAt(0), 16777619), 2166136261) >>> 0;
    const variation = (hash % 997) / 997;
    const phase = ((hash >>> 10) % 991) / 991 * Math.PI * 2;
    const tailSpeed = 0.7 + variation * 0.8;
    const restSpeed = 0.23 + ((hash >>> 18) % 100) / 310;
    // These two illustrations need slightly more presence in the shared frame.
    const sizeBoost = id === 'char' || id === 'prenanti' ? 1.1 : 1;
    let time = phase * 3;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 760px), (pointer: coarse)');
    const flip = surface.closest<HTMLElement>('.fish-flip');
    let crop = { x: 0, y: 0, w: source.naturalWidth, h: source.naturalHeight };

    // Normalize transparent padding across the existing square and landscape assets.
    try {
      const sample = document.createElement('canvas');
      const sampleScale = Math.min(1, 128 / Math.max(source.naturalWidth, source.naturalHeight));
      sample.width = Math.max(1, Math.round(source.naturalWidth * sampleScale));
      sample.height = Math.max(1, Math.round(source.naturalHeight * sampleScale));
      const sampler = sample.getContext('2d', { willReadFrequently: true });
      if (sampler) {
        sampler.drawImage(source, 0, 0, sample.width, sample.height);
        const pixels = sampler.getImageData(0, 0, sample.width, sample.height).data;
        let left = sample.width, right = -1, top = sample.height, bottom = -1;
        for (let y = 0; y < sample.height; y++) {
          for (let x = 0; x < sample.width; x++) {
            if (pixels[(y * sample.width + x) * 4 + 3] > 24) {
              left = Math.min(left, x); right = Math.max(right, x);
              top = Math.min(top, y); bottom = Math.max(bottom, y);
            }
          }
        }
        if (right >= left && bottom >= top) {
          const sx = source.naturalWidth / sample.width, sy = source.naturalHeight / sample.height;
          crop = { x: left * sx, y: top * sy, w: (right - left + 1) * sx, h: (bottom - top + 1) * sy };
        }
      }
    } catch {
      // An unprocessable image still renders and swims at its original proportions.
    }

    function draw(still = false) {
      if (!surface || !context || !source || disposed) return;
      const w = surface.width, h = surface.height;
      context.clearRect(0, 0, w, h);
      const scale = Math.min(w * 0.88 * sizeBoost / crop.w, h * 0.78 * sizeBoost / crop.h);
      const fw = crop.w * scale, fh = crop.h * scale;
      const x = (w - fw) / 2 + (still ? 0 : Math.sin(time * (0.11 + variation * 0.09) + phase) * w * 0.003);
      const y = (h - fh) / 2 + (still ? 0 : Math.sin(time * (0.16 + variation * 0.13) - phase) * h * 0.004);
      if (still) {
        context.drawImage(source, crop.x, crop.y, crop.w, crop.h, x, y, fw, fh);
        return;
      }
      // Small overlapping strips form a continuous body bend; motion grows near the tail.
      const strips = compact.matches ? 24 : 96;
      // Each fish rests between tiny tail corrections; no shared metronome.
      const activity = 0.12 + 0.88 * Math.pow(Math.max(0, Math.sin(time * restSpeed + phase)), 4);
      for (let i = 0; i < strips; i++) {
        const u = i / strips;
        const tailWeight = Math.pow(Math.max(0, (u - 0.58) / 0.42), 2);
        const sway = Math.sin(time * tailSpeed - u * 3.4 + phase) * tailWeight * fh * (0.009 + variation * 0.005) * activity;
        const sw = Math.min(crop.w - u * crop.w, crop.w / strips + 0.6 / scale);
        context.drawImage(source, crop.x + u * crop.w, crop.y, sw, crop.h,
          x + u * fw, y + sway, sw * scale, fh);
      }
    }
    function tick(now: number) {
      if (disposed) return;
      if (!last || now - last >= 1000 / (compact.matches ? 15 : 30)) {
        time += last ? Math.min((now - last) / 1000, 0.08) : 0;
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (disposed) return;
      if (preference.matches) draw(true);
      else if (visible && !document.hidden && flip?.dataset.flipped !== 'true'
        && !(compact.matches && document.documentElement.classList.contains('is-scrolling'))) frame = requestAnimationFrame(tick);
    }
    function resize() {
      if (!surface) return;
      const ratio = Math.min(devicePixelRatio || 1, compact.matches ? 1.25 : 2);
      surface.width = Math.max(1, Math.round(surface.clientWidth * ratio));
      surface.height = Math.max(1, Math.round(surface.clientHeight * ratio));
      draw(preference.matches);
      setReady(true);
    }
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const flipObserver = new MutationObserver(sync);
    resizeObserver.observe(surface);
    visibilityObserver.observe(surface);
    if (flip) flipObserver.observe(flip, { attributes: true, attributeFilter: ['data-flipped'] });
    const onModeChange = () => { resize(); sync(); };
    compact.addEventListener('change', onModeChange);
    document.addEventListener('zeooo-scroll-state', sync);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect(); visibilityObserver.disconnect(); flipObserver.disconnect();
      compact.removeEventListener('change', onModeChange);
      document.removeEventListener('zeooo-scroll-state', sync);
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [loaded, id]);

  if (!icon) return null;
  return (
    <span className="fish-swimmer" data-ready={ready} aria-hidden="true">
      <img ref={photo} src={icon.src} width={icon.width} height={icon.height} alt=""
        loading="lazy" decoding="async" draggable={false} onLoad={() => setLoaded(true)} />
      <canvas ref={canvas} />
    </span>
  );
}
