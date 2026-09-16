import './geo-env.mjs';
process.env.ILA_SKIP_INITIAL_RELOAD = 'true';
const { updateDb } = await import('ip-location-api');
await updateDb();
console.log('Country and timezone database prepared.');
