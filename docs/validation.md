# 本地验证记录 · 2026-09-16

已通过：

- `npx tsc --noEmit`
- `npm run build`
- `npm run test:locale`：5 项通过，包括真实国家库的中国、美国和 IPv6 样本
- `git diff --check`
- 本次业务组件与语言处理文件的定向 `oxlint`
- 九张 WebP 加载成功；手机 390px 页面宽度与视口相等
- 桌面与手机目视检查；中文 / 英文；鱼获弹窗、第二张照片切换、Escape 和关闭按钮

已知检查限制：

- 全仓 `npm run lint` 未通过：现有通用 UI 模板 input-group、pagination、button-group、breadcrumb、spinner、label、input-otp、field、carousel、item、chart，以及 hooks/use-mobile.ts 存在无障碍语义、React effect 或模板类型规则报错。这些文件不属于本轮修改。
- 构建成功，工具链仍提示 middleware 命名与 Node module.register 弃用警告。
- 尚未在 Railway 实际部署；GitHub 仅关联 remote，未推送。


## 第二屏照片与背景修订

TypeScript、Sites 构建脚本调用的项目生产构建、git diff --check 通过。本地首页及三张照片和木纹 WebP 均 HTTP 200。本轮未做浏览器目视或交互验证，未部署。

## 个人简介与联系图标

验证：TypeScript、生产构建、git diff --check 通过；本地页面及小红书图标 HTTP 200。本轮未做浏览器交互检查，未提交、推送或部署。


## 浅木框与三图照片墙

TypeScript、生产构建、git diff --check 通过。本地页面和 pale-ash.webp HTTP 200。未做浏览器目视/交互验证，未部署。

## 第二屏整体感修订

验证：TypeScript、生产构建、git diff --check 通过，本地页面 HTTP 200；静态查找确认旧木框和局部白色光晕样式已移除。本轮未做浏览器目视/交互检查。仅本地更新，未提交、推送或部署。

## 简介标题与正文更新

验证：TypeScript、生产构建、git diff --check 通过，本地页面 HTTP 200。本轮未进行浏览器目视或交互检查；仅本地修改，未提交、推送或部署。

## 简介删句与文字可读性

验证：TypeScript、生产构建、git diff --check 通过；本地页面 HTTP 200。本轮未做浏览器目视/交互验证。仅本地修改，未提交、推送或部署。


## 首屏四时段场景与 IP 时区

- TypeScript、生产构建、git diff --check 通过。
- 9 项 Node 测试通过：语言默认/手动覆盖/回退、IPv4/IPv6、真实国家与时区库、四时段边界、跨时区同一时刻、夏令时、半小时时区、无效时区。
- 开发服务四个 scene 参数均返回正确场景和对应地景资产（HTTP 200）。
- 本地生产服务校验：中国、美国、日本 IP 各自当地时段；语言 Cookie 不影响时区；私网/非法 IP 返回可用的设备时区回退页面；生产忽略 scene 预览参数；私有无共享缓存；healthz 与五张图层资产 HTTP 200。
- 三张生成地景已目视检查与 alpha 检查；未做浏览器视觉/交互 QA，未在 Railway 部署。
- 框架既有 module.register/middleware 弃用提示仍存在，不影响构建。

## 个人介绍文字与图标放大

验证：生产构建、git diff --check 通过，本地页面 HTTP 200。本轮未做浏览器目视/交互检查。仅本地修改，未部署或推送。


## 鱼种相框与心愿单精简

TypeScript、生产构建、git diff --check 通过；本地页面 HTTP 200。复用已有鱼种图标与详情弹窗，九种鱼的列表及同款大个体白甲鱼心愿卡。未进行浏览器视觉或交互 QA；仅本地修改。
