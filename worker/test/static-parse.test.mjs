import test from 'node:test';
import assert from 'node:assert/strict';
import { parseStaticInput } from '../src/static-parse.js';

test('GitHub Pages parses overseas Apple coordinates without offset', () => {
  const p = parseStaticInput('https://maps.apple.com/?coordinate=35.681236,139.767125');
  assert.equal(p.lat, 35.681236);
  assert.equal(p.lon, 139.767125);
});
test('GitHub Pages converts mainland Apple coordinates to WGS84', () => {
  const p = parseStaticInput('https://maps.apple.com/?coordinate=22.543000,114.057000');
  assert.ok(Math.abs(p.lon - 114.057) > 0.001);
  assert.ok(Math.abs(p.lat - 22.543) > 0.001);
});
test('GitHub Pages rejects short links and unrelated decimal pairs', () => {
  assert.throws(() => parseStaticInput('https://surl.amap.com/abcd'));
  assert.throws(() => parseStaticInput('https://example.com/?scroll=1.5,2.5'));
  assert.throws(() => parseStaticInput('https://maps.apple.com/?coordinate=99.999,199.999'));
});
