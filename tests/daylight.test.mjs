import test from 'node:test';
import assert from 'node:assert/strict';
import { preferredTimeZone, rememberedTimeZone, sceneAt, sceneForHour, validTimeZone } from '../lib/daylight.ts';

test('the four periods cover the clock, including every boundary', () => {
  for (const [hour, scene] of [[0,'night'],[4.99,'night'],[5,'dawn'],[7.99,'dawn'],[8,'day'],[16.99,'day'],[17,'sunset'],[19.99,'sunset'],[20,'night'],[23.99,'night']]) {
    assert.equal(sceneForHour(hour), scene);
  }
});
test('the same instant follows different visitor timezones, not the server clock', () => {
  const instant = new Date('2026-09-16T10:00:00Z');
  assert.equal(sceneAt(instant, 'Asia/Shanghai'), 'sunset');
  assert.equal(sceneAt(instant, 'America/New_York'), 'dawn');
  assert.equal(sceneAt(instant, 'America/Los_Angeles'), 'night');
  assert.equal(sceneAt(instant, 'Europe/London'), 'day');
});
test('IANA conversion respects daylight saving and fractional-hour zones', () => {
  assert.equal(sceneAt(new Date('2026-01-16T12:00:00Z'), 'America/New_York'), 'dawn');
  assert.equal(sceneAt(new Date('2026-07-16T12:00:00Z'), 'America/New_York'), 'day');
  assert.equal(sceneAt(new Date('2026-09-16T11:30:00Z'), 'Asia/Kolkata'), 'sunset');
});
test('invalid or missing zones are rejected for device-time fallback', () => {
  assert.equal(validTimeZone('Asia/Shanghai'), 'Asia/Shanghai');
  for (const value of [undefined, null, '', 'Mars/Olympus', 'x'.repeat(120)]) {
    assert.equal(validTimeZone(value), null);
  }
});

test('device local time wins over a proxy IP timezone, with validated fallback', () => {
  const now = new Date('2026-09-16T13:00:00Z');
  assert.equal(sceneAt(now, preferredTimeZone('Asia/Shanghai', 'America/Los_Angeles')), 'night');
  assert.equal(sceneAt(now, preferredTimeZone(null, 'America/Los_Angeles')), 'dawn');
  assert.equal(preferredTimeZone('invalid', 'Asia/Shanghai'), 'Asia/Shanghai');
  assert.equal(preferredTimeZone(null, null), 'UTC');
});
test('remembered device timezone supports SSR and rejects malformed values', () => {
  assert.equal(rememberedTimeZone('zeooo-language=zh; zeooo-timezone=Asia%2FShanghai'), 'Asia/Shanghai');
  for (const cookie of [null, '', 'zeooo-timezone=Mars%2FOlympus', 'zeooo-timezone=%ZZ']) {
    assert.equal(rememberedTimeZone(cookie), null);
  }
});
