import { isIP } from 'node:net';
export type Language = 'zh' | 'en';
type HeaderReader = { get(name: string): string | null };

export function manualLanguage(cookie: string | null): Language | undefined {
  const value = cookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('zeooo-language='))
    ?.split('=')[1];
  return value === 'zh' || value === 'en' ? value : undefined;
}
export function browserLanguage(header: string | null): Language {
  const languages = (header || '')
    .split(',')
    .map((item, index) => {
      const [tag, quality] = item.trim().toLowerCase().split(';');
      return {
        tag,
        quality: quality ? Number(quality.replace(/^q=/, '')) : 1,
        index,
      };
    })
    .filter((item) => item.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  for (const { tag } of languages) {
    if (tag === 'zh' || tag.startsWith('zh-')) return 'zh';
    if (tag === 'en' || tag.startsWith('en-')) return 'en';
  }
  return header ? 'en' : 'zh';
}
export function countryLanguage(country?: string): Language | undefined {
  if (!country || !/^[A-Z]{2}$/.test(country)) return undefined;
  return ['CN', 'HK', 'MO', 'TW'].includes(country) ? 'zh' : 'en';
}
// Chinese visitors or a Chinese browser get the bilingual presentation.
export function automaticLanguage(country: string | undefined, acceptLanguage: string | null): Language {
  const fromCountry = countryLanguage(country);
  const fromBrowser = acceptLanguage ? browserLanguage(acceptLanguage) : undefined;
  if (fromCountry === 'zh' || fromBrowser === 'zh') return 'zh';
  return fromCountry ?? fromBrowser ?? 'zh';
}

export function visitorIp(headers: HeaderReader): string | undefined {
  // Railway's proxy forwards visitor IP. This is a presentation hint, never an auth signal.
  const candidate = (
    headers.get('x-forwarded-for')?.split(',')[0] || headers.get('x-real-ip')
  )
    ?.trim()
    .replace(/^::ffff:/i, '');
  if (!candidate || !isIP(candidate)) return undefined;
  if (
    /^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2\d|3[01])\.)/.test(
      candidate,
    ) ||
    /^(::1$|::$|f[cd]|fe[89ab])/i.test(candidate)
  )
    return undefined;
  return candidate;
}
export async function resolveLanguage(
  headers: HeaderReader,
  lookupCountry: (ip: string) => Promise<string | undefined>,
): Promise<Language> {
  const manual = manualLanguage(headers.get('cookie'));
  if (manual) return manual;
  const ip = visitorIp(headers);
  let country: string | undefined;
  if (ip) {
    try {
      country = await lookupCountry(ip);
    } catch {
      /* A missing country database must never block the journal. */
    }
  }
  return automaticLanguage(country, headers.get('accept-language'));
}
