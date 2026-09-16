# 拟真鱼种图标

这组图标为参考真实鱼类形态后，使用内置 image_gen 逐种生成的 3D 拟真插画。它们与实际鱼获照片分开存储，不作为鱼获照片或鉴种结论。

- 页面文件：`public/images/fish-icons/*.webp`，保留透明 alpha。
- 尺寸清单：`content/fish-icons.json`，记录原始宽高，避免拉伸。
- 图标组件：`components/fish-icon.tsx`。
- 原 PNG：上级项目 `design/fish-icons/originals/`。
- 参考与精确提示词：`fish-icon-references.md`、`fish-icon-prompts.json`。
- 默认展示：桌面 150px 宽，手机 132px 宽。真实鱼获通过 hover 或点击查看。

共同风格：自然成鱼体形、左向近侧视、柔和左上光、真实鳞片与半透明鳍、透明背景、克制的 3D 体积感，无文字、人物、钩饵或场景。

修改某种图标时，以来源中的形态和该鱼种照片为依据，保留一致尺寸和光照；不得把另一个鱼种的图直接换名。
