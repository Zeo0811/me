import { automaticLanguage, manualLanguage, visitorIp } from './locale';
import type { Language } from './locale';
import { rememberedTimeZone, validTimeZone } from './daylight';

type HeadersLike = { get(name: string): string | null };
type LocationHint = { country?: string; timezone?: string } | null;

export async function resolveVisitorContext(
  headers: HeadersLike,
  locate: (ip: string) => Promise<LocationHint>,
): Promise<{ language: Language; timeZone: string | null }> {
  let location: LocationHint = null;
  const ip = visitorIp(headers);
  if (ip) {
    try {
      location = await locate(ip);
    } catch {
      // Location is optional. Missing local data must not block the page.
    }
  }
  return {
    language: manualLanguage(headers.get('cookie'))
      ?? automaticLanguage(location?.country, headers.get('accept-language')),
    timeZone: rememberedTimeZone(headers.get('cookie')) ?? validTimeZone(location?.timezone),
  };
}
