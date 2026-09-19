# 拟真鱼种图标：参考资料与生成提示词

生成方式：built-in image_gen；逐种独立调用。没有使用 CLI/API fallback，没有拼成雪碧图，没有编辑站点或用户渔获照片。

这是一组根据照片与鱼种特征生成的网页图标，不是科学测量图。参考照片仅用于解剖形态与自然色研究，不作为网站可发布摄影素材。每张参考均下载并通过 view_image 目视检查后输入生成工具。

完成状态：九种鱼均已生成并接入网站；2026-09-16 完成透明背景与页面小尺寸检查。

## 原图与透明度

| ID | 原图尺寸 | alpha范围 | 状态 |
|---|---:|---:|---|
| char | 1254 × 1254 | (0, 255) | 已目视检查；原 PNG alpha 保留 |
| schizothorax | 1774 × 887 | (0, 255) | 已目视检查；原 PNG alpha 保留 |
| prenanti | 1254 × 1254 | (0, 255) | 已目视检查；原 PNG alpha 保留 |
| barbel | 1536 × 1024 | (0, 254) | 已目视检查；原 PNG alpha 保留 |
| whitearmor | 1536 × 1024 | (0, 254) | 已目视检查；原 PNG alpha 保留 |
| mandarin | 1254 × 1254 | (0, 255) | 已目视检查；原 PNG alpha 保留 |
| lenok | 1536 × 1024 | (0, 254) | 已目视检查；原 PNG alpha 保留 |
| grayling | 1254 × 1254 | (0, 255) | 已目视检查；原 PNG alpha 保留 |

whitearmor / barbel / lenok 的原图包含较宽半透明软光晕，alpha 最大为254（近乎不透明）。主代理已在纸色背景、小尺寸合成检查后确认可用。其他图最大为255；所有图均实际有透明像素。输出尺寸由内置工具返回，未强行拉伸至提示词目标1024。

## char — 白斑红点鲑 Salvelinus leucomaenis

2026-09-19 重绘：以用户实际鱼获 `char-0855.webp` 为主参照，并对照 FishBase、俄罗斯科学院远东海洋生物研究所标本、公开水族馆活体照片。新版收窄并拉长身体和尾柄，减少均匀装饰性斑点，恢复楔形头、大口、脂鳍，以及下鳍浅色前缘。

细鳞、白色小圆斑、橄榄灰背、浅腹、脂鳍；白斑与细鳞鲑的暗斑区别。

- 来源页：https://tonysharks.com/Tree_of_life/Eukaryote/Opisthokonta/Nikkoiwana/Nikkoiwana.html
- 目视检查的照片：https://tonysharks.com/Tree_of_life/Eukaryote/Opisthokonta/Nikkoiwana/IMG_0754.JPG
- 本地参考：`char-reference.jpg`
- 本地生成原图：`char.png`
- 备注：另查俄罗斯科学院北方生物学研究所标本目录 https://www.ibpn.ru/fishes ，以及北海道大学博物馆标本 https://minna-museum.jp/data/1694 。

精确生成提示词：

```text
Use case: scientific-educational. Asset type: individual realistic miniature 3D fish icon for a fly-fishing website, displayed at only 132-150 CSS pixels. Generate ONE fish only, 1024x1024 PNG with TRUE TRANSPARENT ALPHA background. Photorealistic high-quality 3D rendering of a natural adult fish, anatomically realistic, wet/satin scales with fine natural texture, translucent fin membranes and visible fin rays. Natural restrained colors. Left-facing full side profile with a tiny 10 degree three-quarter turn showing subtle body volume. Complete snout, fins and tail inside image. Horizontal fish centered and fills 80-85% image width; ample transparent margins. Soft upper-left studio illumination, tiny soft contact shadow only. No visible ground, no scene, no pedestal, no text, no logo, no watermarks, no hook, no people, no cartoon, no clay toy, no exaggerated eye, no engraving. Background must be transparent, NOT white, NOT black, NOT a painted checkerboard. Reference image is anatomy reference only: make a fresh living fish rendition, do not copy background, labels, preservation discoloration, damage, pose, hands or fishing tackle. Subject: white-spotted char, Salvelinus leucomaenis 白斑红点鲑. Long streamlined salmonid, dark olive-gray back grading to silver cream belly; numerous distinct ivory-white round spots on back and flanks, smaller on head, not black trout dots. Very fine scales. Modestly large terminal trout mouth. Small soft adipose fin behind triangular dorsal fin. Slightly forked broad tail; muted amber-gray lower fins with pale leading edges. Natural non-spawning adult color, no exaggerated orange belly.
```

## schizothorax — 重口裂腹鱼 Schizothorax davidi

厚实下位唇、两对短须、细鳞、深叉尾、橄榄背与浅腹；没有脂鳍。

- 来源页：https://www.inaturalist.org/taxa/128328-Schizothorax-davidi
- 目视检查的照片：https://inaturalist-open-data.s3.amazonaws.com/photos/308892712/original.jpg
- 本地参考：`schizothorax-reference.jpg`
- 本地生成原图：`schizothorax.png`
- 备注：实拍摄影 cym88223。交叉资料：中国生态系统研究网络生物多样性知识平台 https://wiki.biodiversity.cern.ac.cn/index.php/重口裂腹鱼 。

精确生成提示词：

```text
Use case: scientific-educational. Asset type: individual realistic miniature 3D fish icon for a fly-fishing website, displayed at only 132-150 CSS pixels. Generate ONE fish only, 1024x1024 PNG with TRUE TRANSPARENT ALPHA background. Photorealistic high-quality 3D rendering of a natural adult fish, anatomically realistic, wet/satin scales with fine natural texture, translucent fin membranes and visible fin rays. Natural restrained colors. Left-facing full side profile with a tiny 10 degree three-quarter turn showing subtle body volume. Complete snout, fins and tail inside image. Horizontal fish centered and fills 80-85% image width; ample transparent margins. Soft upper-left studio illumination, tiny soft contact shadow only. No visible ground, no scene, no pedestal, no text, no logo, no watermarks, no hook, no people, no cartoon, no clay toy, no exaggerated eye, no engraving. Background must be transparent, NOT white, NOT black, NOT a painted checkerboard. Reference image is anatomy reference only: make a fresh living fish rendition, do not copy background, labels, preservation discoloration, damage, pose, hands or fishing tackle. Subject: heavy-lipped schizothoracin, Schizothorax davidi 重口裂腹鱼. Robust elongated gently compressed cyprinid, blunt rounded short conical head, conspicuously thick fleshy inferior lips, two pairs of small barbels; very fine closely packed scales. Olive charcoal dorsum, warm silver-gray flanks, ivory belly. Short triangular dorsal fin, NO adipose fin, deep forked tail. Lower fins smoky with restrained brown-orange edges. Preserve the more substantial fleshy lip versus Schizothorax prenanti; not a trout.
```

## prenanti — 齐口裂腹鱼 Schizothorax prenanti

吻圆钝、口下位横裂、刮食型下颌、两对短须、细鳞、叉尾；唇不应像重口一样肥厚。

- 来源页：https://www.fishbase.se/photos/PicturesSummary.php?ID=55358&showAll=yes&what=species
- 目视检查的照片：https://www.fishbase.se/images/species/Scpre_j0.jpg
- 本地参考：`prenanti-reference.jpg`
- 本地生成原图：`prenanti.png`
- 备注：参考是保存标本，只用结构和比例，不照抄保存后的褐色及损伤。另查神农架国家公园 https://www.snjnationalpark.com/zyjs/dw/qtdw/202210/t4507392.shtml ，当前有效学名由 California Academy of Sciences Catalog of Fishes https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=52792 支持。

精确生成提示词：

```text
Use case: scientific-educational. Asset type: individual realistic miniature 3D fish icon for a fly-fishing website, displayed at only 132-150 CSS pixels. Generate ONE fish only, 1024x1024 PNG with TRUE TRANSPARENT ALPHA background. Photorealistic high-quality 3D rendering of a natural adult fish, anatomically realistic, wet/satin scales with fine natural texture, translucent fin membranes and visible fin rays. Natural restrained colors. Left-facing full side profile with a tiny 10 degree three-quarter turn showing subtle body volume. Complete snout, fins and tail inside image. Horizontal fish centered and fills 80-85% image width; ample transparent margins. Soft upper-left studio illumination, tiny soft contact shadow only. No visible ground, no scene, no pedestal, no text, no logo, no watermarks, no hook, no people, no cartoon, no clay toy, no exaggerated eye, no engraving. Background must be transparent, NOT white, NOT black, NOT a painted checkerboard. Reference image is anatomy reference only: make a fresh living fish rendition, do not copy background, labels, preservation discoloration, damage, pose, hands or fishing tackle. Subject: Prenant's schizothoracin Schizothorax prenanti 齐口裂腹鱼. Elongated gently compressed fine-scaled cyprinid, rounded blunt projecting snout above an inferior transverse straight-edged scraping mouth, not thick swollen lips. Two pairs of short fine barbels around mouth about eye-diameter length. Subtle dorsal arch, long narrow caudal peduncle, forked tail. Dark slate olive back, silver-gray sides, pale belly, translucent gray fins and subdued reddish tail. Main dorsal short triangular soft rays; NO adipose fin. Reference is preserved specimen, recover natural silvery colors and fully spread healthy fins.
```

## barbel — 中华倒刺鲃 Spinibarbus sinensis

2026-09-19 重绘：核对 FishBase/CAFS、iNaturalist 及明确标注 *Spinibarbus sinensis* 的水族箱与钓获侧面照片，并结合用户 `qingbo.webp` 实物。新版采用小型钝锥头、收紧的亚下位马蹄形口、贴口短须、平卧于背鳍起点前的倒刺，以及青黑背部和大鳞黑边；避免画成普通鲤鱼或青竹鲤。

大而黑缘的鳞片、两对须、背鳍基部向前的小倒刺、较健壮体形、灰黑鳍；不可混成 S. denticulatus / S. hollandi。

- 来源页：https://www.inaturalist.org/taxa/128334
- 目视检查的照片：https://inaturalist-open-data.s3.amazonaws.com/photos/382879011/large.png
- 本地参考：`barbel-reference.jpg`
- 本地生成原图：`barbel.png`
- 备注：照片来自长江上游珍稀特有鱼类保护资料转录。农业农村部公报区分三种倒刺鲃 https://www.moa.gov.cn/nybgb/2024/202402/202402/P020240228525280573633.pdf 。农业农村部介绍两对须及前向倒刺 https://yyj.moa.gov.cn/kjzl/201904/t20190428_6224725.htm 。

精确生成提示词：

```text
Use case: scientific-educational. Asset type: individual realistic miniature 3D fish icon for a fly-fishing website, displayed at only 132-150 CSS pixels. Generate ONE fish only, 1024x1024 PNG with TRUE TRANSPARENT ALPHA background. Photorealistic high-quality 3D rendering of a natural adult fish, anatomically realistic, wet/satin scales with fine natural texture, translucent fin membranes and visible fin rays. Natural restrained colors. Left-facing full side profile with a tiny 10 degree three-quarter turn showing subtle body volume. Complete snout, fins and tail inside image. Horizontal fish centered and fills 80-85% image width; ample transparent margins. Soft upper-left studio illumination, tiny soft contact shadow only. No visible ground, no scene, no pedestal, no text, no logo, no watermarks, no hook, no people, no cartoon, no clay toy, no exaggerated eye, no engraving. Background must be transparent, NOT white, NOT black, NOT a painted checkerboard. Reference image is anatomy reference only: make a fresh living fish rendition, do not copy background, labels, preservation discoloration, damage, pose, hands or fishing tackle. Subject: Chinese barbel Spinibarbus sinensis 中华倒刺鲃 specifically, NOT Spinibarbus denticulatus or hollandi. Sturdy elongated muscular cyprinid body; relatively large overlapping metallic silver-bronze scales each with pronounced charcoal edge making a natural lattice. Dark olive-gray back, silver-white belly; small broad blunt head with a subterminal mouth and two pairs of short obvious barbels. Tall short triangular dorsal fin with tiny forward-pointing recumbent spine at its base, forked dark-gray tail, smoky gray pectoral pelvic and anal fins with restrained warm amber tint. No adipose fin. No red-faced or orange tropical barb colors.
```

## whitearmor — 白甲鱼 Onychostoma sima / simum

短宽头、圆钝突出吻、下位横裂刮食口、可见中等银鳞、深叉尾、三角背鳍；须极短，不可混成台湾白甲鱼 O. barbatulum。

- 来源页：https://www.sohu.com/a/379191698_100044289
- 目视检查的照片：https://5b0988e595225.cdn.sohucs.com/images/20200311/2c6e80b13c164863953fb2950787c8a8.jpeg
- 本地参考：`whitearmor-reference.jpg`
- 本地生成原图：`whitearmor.png`
- 备注：原始摄影者未由转载页确认，作为解剖参考而非网页素材。种名通过农业农村部公报 https://www.moa.gov.cn/nybgb/2024/202402/202402/P020240228525280573633.pdf 和中科院水生生物学报 https://ssswxb.ihb.ac.cn/article/doi/10.7541/2018.064 核对。另核对野生动物摄影师物种记录 https://www.pierrewildlife.com/searchspecies/fishes/cyprinidae/carps/onychostomasimum/ 。

精确生成提示词：

```text
Use case: scientific-educational. Asset type: individual realistic miniature 3D fish icon for a fly-fishing website, displayed at only 132-150 CSS pixels. Generate ONE fish only, 1024x1024 PNG with TRUE TRANSPARENT ALPHA background. Photorealistic high-quality 3D rendering of a natural adult fish, anatomically realistic, wet/satin scales with fine natural texture, translucent fin membranes and visible fin rays. Natural restrained colors. Left-facing full side profile with a tiny 10 degree three-quarter turn showing subtle body volume. Complete snout, fins and tail inside image. Horizontal fish centered and fills 80-85% image width; ample transparent margins. Soft upper-left studio illumination, tiny soft contact shadow only. No visible ground, no scene, no pedestal, no text, no logo, no watermarks, no hook, no people, no cartoon, no clay toy, no exaggerated eye, no engraving. Background must be transparent, NOT white, NOT black, NOT a painted checkerboard. Reference image is anatomy reference only: make a fresh living fish rendition, do not copy background, labels, preservation discoloration, damage, pose, hands or fishing tackle. Subject: white armor fish / Sima shoveljaw carp Onychostoma sima (Onychostoma simum) 白甲鱼. NOT Onychostoma barbatulum. Compressed spindle-shaped silver cyprinid, modest dorsal arch and long tapered tail stock; short broad head with rounded overhanging snout, inferior transverse scraping mouth with a sharp keratinized lower jaw. Barely visible tiny barbels, no long whiskers. Medium-large silver scales with darker rims, olive-blue-gray back, bright silver belly. Triangular high dorsal fin with hardened leading ray, strongly forked pale smoke-gray tail with darker rims; fins subtly amber gray. No adipose fin, no black spots, no red eye.
```

## mandarin — 斑鳜 Siniperca scherzeri

2026-09-19 按用户实际鱼获照片重绘。新图优先保留鱼获中的黄橄榄底色、背部深色鞍斑、侧线环状豹纹、斑点鳍和修长体型，不再使用旧图标均匀小圆点的表现。补充参考 [FishBase 形态摘要](https://www.fishbase.se/summary/Siniperca-scherzeri.html) 与用户给出的鱼获照片。

大头大口、下颌突出、许多独立细圆暗斑、前棘后软的连续背鳍、扇形圆尾；不可用普通鳜的大块不规则暗斑。

- 来源页：https://bwg.shou.edu.cn/2020/0709/c15622a272662/page.htm
- 目视检查的照片：https://bwg.shou.edu.cn/_upload/article/images/fb/07/c653bc944ee1ab191774fcd8fbaf/71bd870b-4d12-458f-b42e-f0e2d7fa4eb2.jpg
- 本地参考：`mandarin-reference.jpg`
- 本地生成原图：`mandarin.png`
- 备注：上海海洋大学博物馆保存标本；恢复活体颜色，明确提取圆斑。

精确生成提示词：

```text
Use case: scientific-educational. Asset type: individual realistic miniature 3D fish icon for a fly-fishing website, displayed at only 132-150 CSS pixels. Generate ONE fish only, 1024x1024 PNG with TRUE TRANSPARENT ALPHA background. Photorealistic high-quality 3D rendering of a natural adult fish, anatomically realistic, wet/satin scales with fine natural texture, translucent fin membranes and visible fin rays. Natural restrained colors. Left-facing full side profile with a tiny 10 degree three-quarter turn showing subtle body volume. Complete snout, fins and tail inside image. Horizontal fish centered and fills 80-85% image width; ample transparent margins. Soft upper-left studio illumination, tiny soft contact shadow only. No visible ground, no scene, no pedestal, no text, no logo, no watermarks, no hook, no people, no cartoon, no clay toy, no exaggerated eye, no engraving. Background must be transparent, NOT white, NOT black, NOT a painted checkerboard. Reference image is anatomy reference only: make a fresh living fish rendition, do not copy background, labels, preservation discoloration, damage, pose, hands or fishing tackle. Subject: spotted mandarin fish Siniperca scherzeri 斑鳜, NOT common mandarin fish Siniperca chuatsi. Stout elongated perch body with big head and large slightly upturned mouth, protruding lower jaw. Natural muted gray-olive beige body with MANY distinct separate small rounded dark-brown/black leopard-like dots across body, head, dorsal and caudal fins. Dense ROUND spots, NOT large irregular camouflage patches or big dark vertical bands. Long continuous dorsal fin with sharp spiny front section followed by taller rounded soft rear section, fan-shaped rounded tail, translucent spotted yellow-gray fins. Fine realistic scales, no barbels, no adipose fin. The museum specimen reference is dark and preserved: restore living natural silvery olive-beige base so separated dark round spots are clearly visible.
```

## lenok — 细鳞鲑 Brachymystax lenok

尖吻、细鳞、背和头部密集暗斑、侧面淡玫瑰红斑、脂鳍；不混成钝吻的 B. tumensis。

- 来源页：https://www.inaturalist.org/taxa/620189-Brachymystax-lenok
- 目视检查的照片：https://inaturalist-open-data.s3.amazonaws.com/photos/379499275/original.jpeg
- 本地参考：`lenok-reference.jpg`
- 本地生成原图：`lenok.png`
- 备注：实拍摄影 Shumik A。同时检索到 GBIF 物种记录 https://www.gbif.org/species/2351356 和 FishBase 实拍；已排除 image search 错入的 B. tumensis。

精确生成提示词：

```text
Use case: scientific-educational. Asset type: individual realistic miniature 3D fish icon for a fly-fishing website, displayed at only 132-150 CSS pixels. Generate ONE fish only, 1024x1024 PNG with TRUE TRANSPARENT ALPHA background. Photorealistic high-quality 3D rendering of a natural adult fish, anatomically realistic, wet/satin scales with fine natural texture, translucent fin membranes and visible fin rays. Natural restrained colors. Left-facing full side profile with a tiny 10 degree three-quarter turn showing subtle body volume. Complete snout, fins and tail inside image. Horizontal fish centered and fills 80-85% image width; ample transparent margins. Soft upper-left studio illumination, tiny soft contact shadow only. No visible ground, no scene, no pedestal, no text, no logo, no watermarks, no hook, no people, no cartoon, no clay toy, no exaggerated eye, no engraving. Background must be transparent, NOT white, NOT black, NOT a painted checkerboard. Reference image is anatomy reference only: make a fresh living fish rendition, do not copy background, labels, preservation discoloration, damage, pose, hands or fishing tackle. Subject: sharp-snouted lenok Brachymystax lenok 细鳞鲑 specifically, NOT blunt-snouted Brachymystax tumensis. Streamlined long salmonid body, visibly pointed wedge-shaped snout and modest mouth; tiny scales. Olive-bronze back grading to silvery flanks and pale underside, dense irregular small DARK rounded spots across upper body and head, modest faded rose-red patches on flank and reddish-gray lower fins. Small adipose fin behind main triangular dorsal fin; gently forked tail with fine dark dots. Preserve natural sharp snout and restrained warm silver coloration; no rainbow trout stripe and no large bright red patches.
```

## grayling — 北极茴鱼 Thymallus arcticus

小头小口、银灰体、显著帆状大背鳍、脂鳍、叉尾；背鳍有低饱和红褐点列。

- 来源页：https://www.fws.gov/media/thymallus-arcticus-2
- 目视检查的照片：https://www.fws.gov/sites/default/files/images/2016-01/21231.jpg
- 本地参考：`grayling-reference.jpg`
- 本地生成原图：`grayling.png`
- 备注：美国鱼类及野生动物管理局标本照片，背鳍收拢、保存色偏褐，提示词明确恢复活体银灰色并展开背鳍。另参考俄罗斯科学院北方生物学研究所 https://www.ibpn.ru/fishes 的侧面标本图。

精确生成提示词：

```text
Use case: scientific-educational. Asset type: individual realistic miniature 3D fish icon for a fly-fishing website, displayed at only 132-150 CSS pixels. Generate ONE fish only, 1024x1024 PNG with TRUE TRANSPARENT ALPHA background. Photorealistic high-quality 3D rendering of a natural adult fish, anatomically realistic, wet/satin scales with fine natural texture, translucent fin membranes and visible fin rays. Natural restrained colors. Left-facing full side profile with a tiny 10 degree three-quarter turn showing subtle body volume. Complete snout, fins and tail inside image. Horizontal fish centered and fills 80-85% image width; ample transparent margins. Soft upper-left studio illumination, tiny soft contact shadow only. No visible ground, no scene, no pedestal, no text, no logo, no watermarks, no hook, no people, no cartoon, no clay toy, no exaggerated eye, no engraving. Background must be transparent, NOT white, NOT black, NOT a painted checkerboard. Reference image is anatomy reference only: make a fresh living fish rendition, do not copy background, labels, preservation discoloration, damage, pose, hands or fishing tackle. Subject: Arctic grayling Thymallus arcticus 北极茴鱼. Elegant elongated silver-gray salmonid, small conical head, small mouth, visible medium fine scales. Distinctively enormous upright sail-like dorsal fin, broad long base and tall curved outline, translucent slate violet with neat rows of muted rust-red spots. Small adipose fin near tail, deeply forked silver-smoke tail, subtle dark dots scattered on upper silver flanks, muted violet-gold sheen. This reference is a preserved specimen with collapsed dorsal: show a healthy LIVING fish with dorsal fully extended to its recognizable large sail, restore silver color rather than brown preservation staining.
```

## gudgeon — 圆吻鲴：用户照片校正版 v2

2026-09-16 根据用户提供的活体照片重新生成；该照片为当前主要形态与颜色参考，取代第一版博物馆标本参考。重点调整圆钝头吻、小嘴、高而侧扁的体形、银金鳞片、金色鳃盖与浅橙胸鳍；网遮住的尾部与鱼鳍由模型补全。

- 本地参考：`design/fish-icons/references/gudgeon-user-reference.png`
- 当前原图：`design/fish-icons/originals/gudgeon.png`
- 第一版归档：`design/fish-icons/originals/gudgeon-v1.png`
- 网页图标：`website/public/images/fish-icons/gudgeon-v2.webp`
- 模式：内置 image_gen，用户照片作为形态参考生成，透明底。

精确生成提示词：

```text
Use case: scientific-educational. Generate one corrected miniature 3D realistic fish icon, Yuanwen gudgeon 圆吻鲴 Distoechodon tumirostris, for a vintage fly fishing journal. The attached real fish photograph is the primary anatomical and color reference and OVERRIDES generic fish assumptions. Faithfully capture THIS fish's distinctive short blunt rounded almost bulbous snout, small fleshy downturned/subterminal mouth, small compact head, round dark eye with pale gold iris, large smoothly rounded warm golden gill plate, high laterally compressed full-bodied silvery torso, broad pale silver overlapping scales with subdued champagne gold reflected sheen and darker gray olive back, softly rounded pale belly, translucent dusty peach/orange pectoral fin. No barbels, no pointed salmon-like snout, no long predatory jaw, no trout spots, no black dotted lateral stripe, no exaggerated dorsal hump. Make a natural complete adult fish with proportionally deep body and a tapering caudal peduncle, small-to-moderate triangular gray dorsal fin and forked translucent smoky gray tail. Reconstruct only the parts hidden by the landing net plausibly; the visible head, scales, body depth and pectoral color must match the attached photo closely. Remove all net, human hands, background water, trees, city and tackle. Full fish LEFT-FACING horizontal near-side profile with slight 5 degree dimensional turn, complete fins and tail inside frame, centered occupying 84% of image width. Understated high-quality photorealistic 3D rendering, real satin scales, fine fin rays, soft diffuse upper-left light, natural subdued color, sufficient broad shape detail to read at 150px. Transparent alpha background, not white, no checkerboard, no backdrop, no surface or pedestal, no cast shadow. One fish only, no text, label, logo, watermark. Output square PNG.
```

## 项目保存位置

- 网页图标：`website/public/images/fish-icons/`
- 未压缩原图：`design/fish-icons/originals/`
- 本地参考照片：`design/fish-icons/references/`（仅研究参考）
- 精确提示词 JSON：`website/docs/fish-icon-prompts.json`
