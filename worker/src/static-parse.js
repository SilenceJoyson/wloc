// Personal GitHub Pages adaptation, 2026-09-14.
// Reuse upstream coordinate conversion without sending links to a public Worker.
import { extractFromString, toWgs84, inRange, round6 } from './parse.js';

export function parseStaticInput(input) {
  const hit = extractFromString(input, { allowBare: false });
  if (!hit) throw new Error('此链接未直接包含坐标。请在地图上选点、输入 WGS84 坐标，或使用自部署 Worker 解析短链。');
  const { lat, lon } = toWgs84(hit.lat, hit.lon, hit.src);
  if (!inRange(lat, lon)) throw new Error('坐标超出合法范围');
  return { lat: round6(lat), lon: round6(lon), name: hit.name || '' };
}
