import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { getPageHtml } from './src/page.js';

const output = new URL('../docs/', import.meta.url);
await mkdir(output, { recursive: true });
const original = `const r = await fetch('/api/parse?format=json&u=' + encodeURIComponent(input));
      data = await r.json();`;
let html = getPageHtml();
if (!html.includes(original)) throw new Error('Upstream parser changed; review static adaptation.');
html = html.replace(original, `const { parseStaticInput } = await import('./static-parse.js');
      data = parseStaticInput(input);`);
html = html.replace("toast('解析服务不可达', 3000);", "toast(e.message || '链接解析失败', 5000);");
html = html.replace('<title>WLOC 虚拟定位</title>', '<title>SilenceJoyson · WLOC 选点</title>');
html = html.replace('<div class="panel">', `<div class="panel">
  <div class="card" style="font-size:13px;line-height:1.6">
    <b>SilenceJoyson 的 WLOC 选点页</b><br>
    先启用自己的 WLOC 模块，再选点并储存到设备。支持地图选点和直接含坐标的地图链接；短链需要自部署 Worker。<br>
    <a href="https://github.com/SilenceJoyson/wloc">代码、模块订阅和使用说明</a>
  </div>`);
await writeFile(new URL('index.html', output), html);
await writeFile(new URL('.nojekyll', output), '');
for (const file of ['parse.js', 'static-parse.js']) {
  await copyFile(new URL(`./src/${file}`, import.meta.url), new URL(file, output));
}
console.log('Generated docs/index.html and browser coordinate parser.');
