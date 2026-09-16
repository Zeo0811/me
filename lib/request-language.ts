import { headers } from 'next/headers';
import { cache } from 'react';
import { resolveVisitorContext } from './visitor-context';
import '../scripts/geo-env.mjs';

let database: Promise<typeof import('ip-location-api')> | undefined;
function localDatabase() {
  database ??= import('ip-location-api').then(async (geo) => {
    // Synchronous reload reads local files only and throws if they are absent.
    // Async reload can download a DB, which must never happen during a request.
    await geo.reload(undefined, true);
    return geo;
  }).catch((error) => {
    database = undefined;
    throw error;
  });
  return database;
}

export const requestVisitorContext = cache(async () =>
  resolveVisitorContext(await headers(), async (ip) => {
    const geo = await localDatabase();
    return await geo.lookup(ip);
  }),
);

export async function requestLanguage() {
  return (await requestVisitorContext()).language;
}
