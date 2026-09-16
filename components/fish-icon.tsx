import Image from 'next/image';
import icons from '@/content/fish-icons.json';

/** Species-referenced generated artwork. Actual catches are separate photographs. */
export function FishIcon({ id }: { id: string }) {
  const icon = icons[id as keyof typeof icons];
  if (!icon) return null;
  return (
    <Image
      unoptimized
      className={`fish-icon fish-${id}`}
      src={icon.src}
      alt=""
      aria-hidden="true"
      width={icon.width}
      height={icon.height}
      loading="lazy"
      draggable={false}
    />
  );
}
