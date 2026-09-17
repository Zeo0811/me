import manifest from '@/content/responsive-images';

/** Static responsive files: no resize server, original proportions, durable hashed URLs. */
export function responsiveImage(src: string, sizes: string) {
  const image = manifest[src as keyof typeof manifest];
  if (!image) return { src };
  return {
    src: image.variants[0].src,
    srcSet: image.variants.map(item => `${item.src} ${item.width}w`).join(', '),
    sizes,
  };
}
