import { NextResponse } from 'next/server';
// The response depends on visitor location, local time, and manual language.
export function middleware() {
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set(
    'Vary',
    'Cookie, Accept-Language, X-Forwarded-For, X-Real-IP',
  );
  return response;
}
export const config = { matcher: ['/'] };
