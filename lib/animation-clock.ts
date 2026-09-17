type Listener = (now: number) => void;
const listeners = new Set<Listener>();
let timer: ReturnType<typeof setTimeout> | undefined;
let frame = 0;

// One capped clock for visible fish, not one full-refresh-rate loop per canvas.
function schedule() {
  if (!listeners.size || timer || frame) return;
  const delay = matchMedia('(max-width: 760px), (pointer: coarse)').matches ? 60 : 32;
  timer = setTimeout(() => {
    timer = undefined;
    frame = requestAnimationFrame(now => {
      frame = 0;
      for (const listener of listeners) listener(now);
      schedule();
    });
  }, delay);
}

export function animateFish(listener: Listener) {
  listeners.add(listener);
  schedule();
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      timer = undefined;
      frame = 0;
    }
  };
}
