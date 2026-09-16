# Zeooo · 溪流手记 / A Field Journal

个人 fly fishing / float fishing 网站。复古纸色、版画山水与衬线字体，以滚动浏览串起九种鱼、白甲鱼心愿和个人介绍。鱼种保留立体风格图标，悬停预览真实鱼获，点击打开照片、笔记日期、地区与原帖。

网站部署在 Railway，正式域名为 `about.zeooo.cc`。旧 Sites 配置保留作历史记录，已经移出运行和构建流程。

## 本地运行

需要 Node.js 22.13 或以上。

```sh
npm ci
npm run geo:prepare
npm run dev -- --port 3002
```

打开 http://localhost:3002 。正式运行：

```sh
npm run build
PORT=3000 npm start
```

服务监听 `0.0.0.0`，使用 Railway 提供的 `PORT`。健康检查为 `/healthz`。

## GitHub / Railway 部署

Git 仓库根目录是本文件所在的 `website/`。只需将这个网站仓库同步到自己的 GitHub；资料归档和聊天 context 在上一级项目中。

Railway 已连接 `Zeo0811/me` 的 `main` 分支，推送后自动部署，并自动识别根目录的 `Dockerfile`。当前 Railway 新服务已不再启用旧 Config as Code，因此 `railway.json` 仅作为配置参考；控制台已设置 `PORT=3000`、域名目标端口 `3000`、健康检查 `/healthz`。若未来把整个上级项目另建为仓库，Railway 的 Root Directory 应设为 `website`。

Docker 构建会安装依赖、下载国家与时区 IP 数据、构建网站；启动命令已设置为 `npm start`。不需要 Sites 或 Cloudflare 账户、绑定、访问凭据。

生产环境使用仓库根目录的 Dockerfile 构建，监听 Railway 注入的 `PORT`，通过 `/healthz` 检查。自定义域名配置为 `about.zeooo.cc`，DNS 的 CNAME 目标以 Railway 生成的值为准。

## 中英文与 IP 默认语言

手动选择的语言优先；自动模式下，中文 IP 或浏览器首选中文均显示中英文。其余已识别 IP / 浏览器默认英文，无信息时回退中文。

- 中国大陆、香港、澳门、台湾的 IP，或首选中文的浏览器，默认中文双语；海外 IP 不会覆盖中文浏览器偏好。
- 使用 Railway 反向代理转发的 `X-Forwarded-For`，并兼容 `X-Real-IP`、IPv4、IPv6。
- 本地和私网 IP 无地区，按浏览器语言回退。
- 首屏下方可手动切换，中英文选择记住一年。换语言时鱼获弹窗内容也同步。
- 服务器使用离线国家与时区数据库，不把访客 IP 发送给第三方定位服务；应用代码不保存 IP。
- 首页不进入共享缓存，避免不同访问者的语言互相影响。
- IP 仅是语言提示，代理/VPN 可能影响默认语言，手动选择始终优先。

数据库现在采用 [GeoLite2 City](https://www.maxmind.com/en/geolite2/eula)，经 ip-location-api 的 redist 渠道下载，只提取 country / timezone 两个字段。构建时更新，也可手动执行 `npm run geo:prepare`；生产部署应至少每月刷新数据库并重新启动服务，避免长期使用旧版本。没有启用请求时下载或运行时定时任务；访客 IP 不发送给定位服务。归属与许可信息在 `licenses/README.md`，页脚保留 MaxMind 署名。原 country-only 数据说明已被本节取代。

## 按设备当地时间切换风景

- 05:00–07:59 晨曦；08:00–16:59 白昼；17:00–19:59 日落；20:00–04:59 星夜。
- 设备 IANA 时区优先，IP 时区兜底，自动处理夏令时。海外代理不会覆盖设备当地时间。IP 国家与时区仍来自同一次离线查询。
- 首次 SSR 使用 IP 时区（无定位则先输出白昼），挂载后立即按设备时区修正。设备时区记录在 zeooo-timezone Cookie，后续 SSR 直接呈现设备时段。
- 页面每分钟和恢复可见时重新检测设备时区与时段，语言手动设置不影响时区。
- 四段是固定的艺术时段，并非根据季节/纬度计算天文日出日落。
- 复用日落地景，新增晨曦、白昼、星夜透明地景；天空、太阳/月亮/星星与草岸为独立层。前景草岸复用原切图并按时段调色。
- 夜景个人介绍自动改浅色文字；进入鱼获区后仍过渡到纸色。原有暂停和减少动态设置保留。
- 仅开发环境可用 `/?scene=dawn`、`/?scene=day`、`/?scene=sunset`、`/?scene=night` 对比四套效果；生产环境忽略此参数，按访客当地时间显示。
- 时段逻辑：`lib/daylight.ts`；请求定位：`lib/request-language.ts` / `lib/visitor-context.ts`；图片：`public/images/hero/`。
- `npm run test:daylight` 覆盖时段边界、多个时区、夏令时与无效时区；`npm run test:locale` 同时验证真实 IP 时区数据。


## 内容维护

- `content/journal.ts`：鱼种、笔记日期、地区、照片路径、来源和中文说明。
- `content/journal-en.ts`：英文鱼种显示名称、说明和地区译名。名称经 FishBase / NCBI 核对；未找到充分支持的英文俗名时用学名。依据见 `docs/fish-name-verification.md`，不再拼接拼音作为英文鱼名。
- `components/field-journal.tsx`：中英文介绍、心愿、联系方式和整体章节。
- `components/species-cabinet.tsx`：照片预览与详情交互。
- `app/globals.css`：视觉、响应式和动效。
- `public/images/catches/`：真实鱼获照片。新增照片在 `photos` 中填写 `/images/catches/文件名`。
- `public/images/zeo-river.webp`：本人公开原帖的照片，保留摄影“包哥爱玩野路子”与原帖链接。
- `public/images/zeooo-landscape.webp`：本轮原创生成的虚构山水版画插画，不代表某次实际鱼获地点。

日期暂按小红书笔记时间，地区暂按标题/正文/IP 属地；原帖只有月日时不擅补年份，没有城市时不伪造城市。修正实际鱼获信息时，同步改日期标签及来源说明。空日期、地区、照片会显示“待补充 / To come”。有几张照片的鱼种匹配仍待本人复核。

尚无网页内持久化编辑后台，直接修改以上内容文件即可。

## 动效与可访问性

普通滚动，不接管滚轮。山水视差、前景轻摆、水纹、鱼图标轻浮和章节逐一展开；手机使用双列鱼种并支持点击详情。支持键盘聚焦、Enter 打开、Esc 关闭及焦点返回。系统“减少动态效果”会停用动画；页脚也有暂停动效按钮。无 JavaScript 时文字与章节保持可见。

## 检查

```sh
npm run test:locale
npx tsc --noEmit
npm run build
```

本轮已检查类型、修改文件 lint、IP 国家映射/手动优先/回退逻辑、正式 SSR 中英文响应、9 条记录与媒体响应和健康检查。未做本轮浏览器视觉或点击测试；既有真实照片交互实现沿用上一版。

## GitHub 仓库

远程 `origin` 关联 [Zeo0811/me](https://github.com/Zeo0811/me)。Railway 连接该仓库的 `main` 分支。

The closing landscape reuses the opening scene and local-time palette. Visible footer copy and controls are removed. GeoLite attribution remains available at `/credits.txt` and in the project license documentation.
