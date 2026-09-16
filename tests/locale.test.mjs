import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveLanguage, visitorIp } from '../lib/locale.ts';
import '../scripts/geo-env.mjs';
const h = (values) => new Headers(values);
const cn = async () => 'CN';
const us = async () => 'US';
test('explicit language wins over country and browser', async () => {
  assert.equal(
    await resolveLanguage(
      h({
        cookie: 'zeooo-language=en',
        'x-forwarded-for': '114.114.114.114',
        'accept-language': 'zh-CN',
      }),
      cn,
    ),
    'en',
  );
  assert.equal(
    await resolveLanguage(
      h({
        cookie: 'zeooo-language=zh',
        'x-forwarded-for': '8.8.8.8',
        'accept-language': 'en',
      }),
      us,
    ),
    'zh',
  );
});
test('country defaults take precedence over browser preference', async () => {
  for (const country of ['CN', 'HK', 'MO', 'TW'])
    assert.equal(
      await resolveLanguage(
        h({ 'x-forwarded-for': '8.8.8.8', 'accept-language': 'en' }),
        async () => country,
      ),
      'zh',
    );
  assert.equal(
    await resolveLanguage(
      h({ 'x-forwarded-for': '8.8.8.8', 'accept-language': 'zh' }),
      us,
    ),
    'en',
  );
});
test('private IPs, missing DB and unknown country use browser preference', async () => {
  assert.equal(
    await resolveLanguage(
      h({ 'x-forwarded-for': '127.0.0.1', 'accept-language': 'en' }),
      cn,
    ),
    'en',
  );
  assert.equal(
    await resolveLanguage(
      h({ 'x-forwarded-for': '114.114.114.114', 'accept-language': 'zh-CN' }),
      async () => {
        throw Error('DB unavailable');
      },
    ),
    'zh',
  );
  assert.equal(
    await resolveLanguage(h({ 'accept-language': 'en;q=0.2,zh-CN;q=0.9' }), cn),
    'zh',
  );
  assert.equal(
    await resolveLanguage(h({ 'accept-language': 'zh;q=0,en;q=1' }), cn),
    'en',
  );
  assert.equal(
    await resolveLanguage(h({ cookie: 'zeooo-language=unexpected' }), cn),
    'zh',
  );
});
test('IPv4, IPv6, and invalid forwarded addresses', () => {
  assert.equal(
    visitorIp(h({ 'x-forwarded-for': '::ffff:8.8.8.8, 10.0.0.1' })),
    '8.8.8.8',
  );
  assert.equal(
    visitorIp(h({ 'x-real-ip': '2001:4860:4860::8888' })),
    '2001:4860:4860::8888',
  );
  for (const ip of [
    '::1',
    '127.0.0.1',
    '192.168.1.2',
    '10.1.1.1',
    '172.16.2.1',
    'fe80::1234',
    'fc00::1234',
    'bad-value',
  ])
    assert.equal(visitorIp(h({ 'x-forwarded-for': ip })), undefined);
});
test('real country database resolves Chinese, US and IPv6 addresses', async () => {
  const { lookup, reload } = await import('ip-location-api');
  await reload(undefined, true);
  assert.equal((await lookup('114.114.114.114'))?.country, 'CN');
  assert.equal((await lookup('8.8.8.8'))?.country, 'US');
  assert.equal((await lookup('2001:4860:4860::8888'))?.country, 'US');
  assert.equal((await lookup('114.114.114.114'))?.timezone, 'Asia/Shanghai');
  assert.equal((await lookup('128.112.1.1'))?.timezone, 'America/New_York');
});
