/* oxlint-disable next/no-img-element -- Images use prebuilt responsive srcsets with hashed cache URLs. */
'use client';

import { useState } from 'react';
import { responsiveImage } from '@/lib/responsive-image';
import { FieldFrame } from './field-frame';
import type { Language } from '@/lib/locale';
const photos = [
  {
    src: '/images/about/river-portrait.webp',
    position: 'upper-left',
    width: 1494,
    height: 1600,
    zh: 'Zeo 在河中托起鱼获',
    en: 'Zeo holding a catch in the river',
  },
  {
    src: '/images/about/catch-closeup.webp',
    position: 'upper-right',
    width: 1600,
    height: 900,
    zh: '手持鱼获的近景，背景是河流和飞钓竿',
    en: 'A catch held close, with the river and a fly rod behind it',
  },
  {
    src: '/images/about/woodland-portrait.webp',
    position: 'lower',
    width: 1067,
    height: 1600,
    zh: 'Zeo 在林间溪流中托起鱼获',
    en: 'Zeo holding a catch in a wooded stream',
  },
];

export function AboutGallery({ language }: { language: Language }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const zh = language === 'zh';

  return (
    <section
      className="portrait about-gallery"
      aria-label={zh ? '水边的三张照片' : 'Three photographs by the water'}

    >
      <div className="photo-wall">
        {photos.map((photo) => (
          <button
            key={photo.src}
            type="button"
            className={`journal-photo journal-photo-${photo.position}`}
            aria-label={`${zh ? photo.zh : photo.en} · ${zh ? '放大照片' : 'Enlarge photograph'}`}
            aria-pressed={expanded === photo.src}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setExpanded(null);
                event.currentTarget.blur();
              }
            }}
            onClick={() => setExpanded(expanded === photo.src ? null : photo.src)}
            onBlur={() => setExpanded(null)}
          >
            <FieldFrame className="portrait-frame">
              <img
                {...responsiveImage(photo.src, photo.position === 'lower' ? '(max-width: 760px) 88vw, 430px' : '(max-width: 760px) 42vw, 215px')}
                alt={zh ? photo.zh : photo.en}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </FieldFrame>
          </button>
        ))}
      </div>
    </section>
  );
}
