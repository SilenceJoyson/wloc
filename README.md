# Apple WLOC · SilenceJoyson 自用恢复版

从 Yu9191/wloc 的存档版本恢复，保留原作者提交历史、署名和 LICENSE。模块里的脚本和图标地址已改为本仓库，并增加 GitHub Pages 选点页。

**兼容性：原作者在此版本明确记录 iOS 27 beta 6 起因证书校验限制无法使用。复制仓库不能解除系统限制。** 原始说明见 [README.upstream.md](README.upstream.md)。本工具修改 WiFi/基站网络定位，GPS 信号可能覆盖结果，实际效果需要在你的手机验证。

## 自己的订阅地址

| 工具 | 订阅链接 |
|---|---|
| Shadowrocket（小火箭） | [wloc.module](https://raw.githubusercontent.com/SilenceJoyson/wloc/refs/heads/main/modules/wloc.module) |
| Surge / Egern | [wloc.sgmodule](https://raw.githubusercontent.com/SilenceJoyson/wloc/refs/heads/main/modules/wloc.sgmodule) |
| Quantumult X | [wloc.conf](https://raw.githubusercontent.com/SilenceJoyson/wloc/refs/heads/main/modules/wloc.conf) |
| Loon | [wloc.lpx](https://raw.githubusercontent.com/SilenceJoyson/wloc/refs/heads/main/modules/wloc.lpx) |
| Stash | [wloc.stoverride](https://raw.githubusercontent.com/SilenceJoyson/wloc/refs/heads/main/modules/wloc.stoverride) |

## 手机使用

1. 在代理工具中导入对应模块并启用。
2. 按代理工具说明安装并信任其 HTTPS 解密证书，启用 MITM。模块已列出所需域名，包括 `gs-loc.apple.com` 和 `gs-loc-cn.apple.com`。
3. 保持代理运行，用 Safari 打开 [自己的选点页](https://silencejoyson.github.io/wloc/)。
4. 在地图上选位置，点击「储存到设备」，再用苹果地图验证。
5. 恢复时在页面清除保存的位置，或关闭模块。若系统仍显示旧位置，可重启后重新验证。

电脑访问选点页时，「模块未生效」提示属预期：页面需要手机上的代理模块拦截储存请求。收藏仅存于浏览器；「储存到设备」才会写入代理工具供定位脚本读取。

## GitHub Pages

在仓库 **Settings → Pages** 选择 **Deploy from a branch → main → /docs → Save**。发布后地址是 https://silencejoyson.github.io/wloc/ 。

此页面支持地图选点、地名搜索、WGS84 坐标文本，以及直接含经纬度的地图长链接。原作者的坐标换算逻辑在浏览器中运行；不会把地图链接发送给原作者的 Worker。地图底图和地名搜索仍使用第三方地图服务，需要联网。

**高德等短链接无法在纯静态页面中展开**，页面会提示改用地图选点或自部署 Worker。保留的原版快捷指令也可能依赖作者的旧 Worker，不作为本恢复版的默认使用方式。

## 可选：完整 Worker 功能

需要短链接解析或原版快捷指令时，可部署自己的 Cloudflare Worker：

[部署到 Cloudflare Workers](https://deploy.workers.cloudflare.com/?url=https://github.com/SilenceJoyson/wloc/tree/main/worker)

也可以在 `worker` 目录安装依赖后运行 `npm run deploy`。部署成功后使用你自己的 Worker 地址，并把快捷指令内原作者的 Worker 地址替换成它。

## 来源与维护

- 原项目：Yu9191/wloc。
- 对应存档：[2026-09-07 15:55:31 快照](https://web.archive.org/web/20260907155531/https://github.com/Yu9191/wloc)。
- 恢复提交：`529fcd841952571e79f40faf2d3e0ef90a7bdfa6`（2026-09-04），与存档页面嵌入的 `currentOid` 一致。
- 提交对象恢复自 [xepes0/wloc](https://github.com/xepes0/wloc/commit/529fcd841952571e79f40faf2d3e0ef90a7bdfa6)。
- 本恢复版改动日期：2026-09-14。新增静态选点适配，更新订阅地址；定位响应脚本保持该恢复提交的原样。
- 许可证：[AGPL-3.0 原文](LICENSE)。原作者声明及贡献者名单保留在 [原始 README](README.upstream.md)。

重新生成静态页面：`node worker/build-github-pages.mjs`。

测试：进入 `worker` 后运行 `npm test`；覆盖坐标解析、坐标系转换、静态页面解析限制和 Stash 响应格式。
