export type DayScene = 'dawn' | 'day' | 'sunset' | 'night';

export function validTimeZone(value?: string | null): string | null {
  if (!value || value.length > 100) return null;
  try {
    return new Intl.DateTimeFormat('en', { timeZone: value }).resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

export function sceneForHour(hour: number): DayScene {
  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'sunset';
  return 'night';
}

export function sceneAt(date: Date, timeZone: string): DayScene {
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    hourCycle: 'h23',
  }).format(date));
  return sceneForHour(hour);
}

export const sceneAssets: Record<DayScene, string> = {
  dawn: '/images/hero/dawn-terrain.webp',
  day: '/images/hero/day-terrain.webp',
  sunset: '/images/hero/terrain.webp',
  night: '/images/hero/night-terrain.webp',
};
