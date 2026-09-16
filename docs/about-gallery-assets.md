# About gallery assets · 2026-09-16

Three original photographs supplied directly by Zeooo. Originals retained outside the website in `../design/about-photos/`. Public WebP versions preserve the complete composition, are limited to 1600 px on the long edge, and omit EXIF. No AI alteration of these photographs.

- `river-portrait.webp`: IMG_3850.HEIC, 1494 × 1600
- `catch-closeup.webp`: IMG_0988.HEIC, 1600 × 900
- `woodland-portrait.webp`: supplied clipboard JPEG, 1067 × 1600
- `walnut.webp`: generated wood texture, 1024 × 1024; original PNG outside website in `../design/about-photos/wood-texture.png`

Wood texture generated once using built-in image_gen. Frame geometry and mitered corners are CSS. Seamless tiling was requested but not independently verified; the frame uses a single covering texture on each rail.

Exact image-generation prompt:

```text
Use case: photorealistic-natural
Asset type: seamless square 1024 x 1024 wood texture for solid hardwood picture-frame rails on a vintage fly-fishing personal website.
Primary request: one realistic seamless tileable texture of matte oiled solid walnut wood, warm medium-dark brown, long natural straight horizontal grain.
Composition: flat orthographic close-up of the wood surface, texture filling the entire square edge to edge; continuous horizontal grain that can be rotated for vertical rails; seamless matching opposite edges for tiling.
Materials: restrained fine walnut pores and subtle irregular natural grain; understated authentic solid hardwood.
Lighting: perfectly even diffuse lighting, uniform exposure across the texture, no directional highlights or shadows.
Constraints: one texture only, no frame, no object, no scene, no text, no logo, no watermark, no knots, no seams between planks, no perspective, no bevels, no borders, no cast shadows.
```


## Contact icon

Xiaohongshu vector logo from Simple Icons (CC0): https://github.com/simple-icons/simple-icons/blob/develop/icons/xiaohongshu.svg
Local asset: `public/images/icons/xiaohongshu.svg`. Displayed monochrome via CSS mask.


## Pale ash frame revision

Replaces dark walnut rails with narrow matte pale ash rails for the three-photo wall. Generated once with the built-in image_gen tool; original stored at `../design/about-photos/pale-ash-texture.png`, website asset at `public/images/about/pale-ash.webp` (1024 × 1024, 169646 bytes). Original user photographs are unchanged. Top row: river portrait and woodland portrait. Bottom row: landscape catch closeup. The former carousel is replaced by simultaneous display with hover and focus enlargement and tap/click toggles.

Exact prompt:

```text
Use case: photorealistic-natural
Asset type: one seamless square 1024 x 1024 natural wood texture for understated picture-frame rails on a vintage riverside journal website.
Primary request: very light weathered ash wood / pale driftwood, cool warm-grey sand and oatmeal tones, matte unvarnished natural wood, subtle straight fine horizontal grain, very low contrast, calm and restrained.
Composition: flat orthographic close-up, one continuous wood surface filling the entire square edge to edge, horizontal grain, seamless matching opposite edges for tiling.
Lighting: completely uniform diffuse lighting, no directional light, no highlights, no shadows or vignetting.
Constraints: pale neutral grey-beige palette; no orange or yellow cast, no dark brown, no strong knots, no planks, no seams, no objects, no frame, no border, no bevels, no text, no watermark, no perspective, no shadows. Exactly one texture.
```


## Unified scene revision

Following user screenshot feedback, both wood textures are retained only as historical assets and no longer rendered. Three original photographs now use their natural aspect ratios with a thin warm-grey paper edge, slight static angles, and light shadows. Layout remains two above, one below. Removed the local white radial backdrop behind the biography; the full shared landscape now receives a scroll-linked atmospheric gradient instead. No new raster assets.
