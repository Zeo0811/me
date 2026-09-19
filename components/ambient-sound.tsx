'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TARGET_VOLUME = 0.075;

export function AmbientSound({ zh }: { zh: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(true);

  const fadeTo = useCallback((target: number, pauseAfter = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current);
    const start = audio.volume;
    const startedAt = performance.now();
    const duration = target > start ? 1800 : 700;
    const tick = () => {
      const now = performance.now();
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = start + (target - start) * eased;
      if (progress >= 1) {
        if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
        if (pauseAfter) audio.pause();
      }
    };
    tick();
    fadeTimerRef.current = window.setInterval(tick, 50);
  }, []);

  const begin = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    if (!audio.paused) return true;
    try {
      audio.volume = 0;
      await audio.play();
      fadeTo(TARGET_VOLUME);
      return true;
    } catch {
      return false;
    }
  }, [fadeTo]);

  useEffect(() => {
    const stored = localStorage.getItem('zeooo-ambient-sound');
    if (stored === 'off') {
      queueMicrotask(() => setEnabled(false));
      return;
    }
    void begin();
  }, [begin]);

  useEffect(() => {
    if (!enabled) return;
    const unlock = () => { void begin(); };
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [begin, enabled]);

  useEffect(() => () => {
    if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('zeooo-ambient-sound', next ? 'on' : 'off');
    if (next) window.setTimeout(() => { void begin(); }, 0);
    else fadeTo(0, true);
  };

  return (
    <div className="ambient-sound">
      {/* Background ambience has no spoken content that requires captions. */}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/audio/river-ambience.mp3" loop preload="auto" playsInline />
      <button
        type="button"
        className="ambient-sound-toggle"
        aria-pressed={enabled}
        aria-label={enabled
          ? (zh ? '关闭自然环境声' : 'Mute nature ambience')
          : (zh ? '开启自然环境声' : 'Play nature ambience')}
        title={enabled ? (zh ? '自然环境声：开' : 'Nature ambience: on') : (zh ? '自然环境声：关' : 'Nature ambience: off')}
        onClick={toggle}
      >
        <span className="ambient-sound-bars" aria-hidden="true">
          <i /><i /><i />
        </span>
      </button>
    </div>
  );
}
