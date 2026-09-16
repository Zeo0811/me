# 首屏图层与动效

主标题：中文「水上学钓，林中观鸟。」与英文「In sync with the current.」同屏显示。首屏没有署名、副标题、滚动提示文字；个人信息在关于我。

生成方式：内置 image_gen，参考原有 public/images/zeooo-landscape.webp 编辑。

- 网页地景：public/images/hero/terrain.webp
- 网页前景：public/images/hero/foreground.webp
- 原始 PNG：上级项目 design/hero-layers/terrain.png 与 foreground.png
- 完整生成提示词：[hero-layer-prompts.json](hero-layer-prompts.json)
- 组件：components/river-landscape.tsx
- 样式：app/globals.css 的 Slogan-led opening 区块

天空、太阳、地景、水纹与前景为独立层。地景与前景由图像模型分别生成；太阳和沿河水纹为代码图层。太阳保持在山脊上方，光晕、文字、风、水面反光和天光自动循环，不依赖滚动；首屏离开视口后暂停。水面使用原图同位置纹理及柔边水域蒙版，只变化亮度，没有人为滑动线条。前景缩至桌面宽度 64%、手机 115%，只保留底部和左下近景。保留页面底部暂停按钮与系统减少动态偏好支持。

桌面 1399px 与手机 390px、320px 已目视检查；中英文、真实动画样式变化、手动暂停已验证。生产构建和业务组件检查通过。未部署。


## 连续三屏滚动

`FieldJournal` 的 `.river-journey` 包含首屏、about、collection，同一 `.journey-scenery` 在这三段保持 sticky。`--opening-progress` 控制首屏退场和地景推进，`--about-enter` 控制介绍进入，`--encounter-progress` 控制图鉴进入，`--paper-wash` 连续将背景淡成纸色。CSS 变量用 requestAnimationFrame 更新，ResizeObserver 处理语言/布局尺寸变化；滚动事件只读进度，不改用户的滚动位置。

鱼种图标以各自的自然位置计算 `--fish-enter`，扣除自身位移避免滚动反馈。手动暂停/系统减少动态移除 motion-ready，改成普通文档流与静态首屏；照片、链接和鱼获按钮保持可用。

当前顺序：hero → about → collection → wishlist。
