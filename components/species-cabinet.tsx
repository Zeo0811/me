/* oxlint-disable next/no-img-element -- Images use prebuilt responsive srcsets with hashed cache URLs. */
'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { responsiveImage } from '@/lib/responsive-image';
import { FishIcon } from '@/components/fish-icon';
import { FishPrint } from '@/components/fish-print';
import { CatchCorner } from '@/components/catch-corner';
import { FieldFrame, FrameRails } from '@/components/field-frame';
import { catchPhotoSizes } from '@/content/catch-photo-sizes';
import { species, type FishRecord } from '@/content/journal';
import { englishRecord, englishFishNames } from '@/content/journal-en';
import type { Language } from '@/lib/locale';

function CatchCard({
  record,
  index,
  language,
}: {
  record: FishRecord;
  index: number;
  language: Language;
}) {
  const fish = language === 'zh' ? record : englishRecord(record);
  const t = (zh: string, en: string) => (language === 'zh' ? zh : en);
  const [frame, setFrame] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [previewRequested, setPreviewRequested] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)');
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const [previewFailed, setPreviewFailed] = useState(false);
  const previewSize = catchPhotoSizes[fish.photos[0]];
  const trigger = useRef<HTMLButtonElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const origin = useRef<DOMRect | null>(null);
  const pointer = useRef('keyboard');
  const hasPreview = Boolean(fish.photos[0]) && !previewFailed;
  const flipped = hasPreview && previewReady && canHover && (hovered || focused);
  useLayoutEffect(() => {
    if (!open || !origin.current
      || window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px), (pointer: coarse)').matches
      || trigger.current?.closest('.motion-paused')) return;
    let animation: Animation | undefined;
    // Wait for the dialog portal to mount and lay out its intrinsic photograph.
    const frameId = window.requestAnimationFrame(() => {
      const node = popup.current;
      const from = origin.current;
      if (!node || !from || !node.animate) return;
      const to = node.getBoundingClientRect();
      if (!to.width || !to.height) return;
      const dx = from.left + from.width / 2 - to.left - to.width / 2;
      const dy = from.top + from.height / 2 - to.top - to.height / 2;
      animation = node.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`, opacity: 0.65 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      ], { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
    });
    return () => { window.cancelAnimationFrame(frameId); animation?.cancel(); };
  }, [open]);

  return (
    <div
      className="specimen"
      data-fish={fish.id}
      data-preview={flipped ? "true" : undefined}
      data-reveal
      style={
        { '--reveal-delay': `${(index % 3) * 90}ms` } as React.CSSProperties
      }
    >
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (value) {
            origin.current = trigger.current?.querySelector('.fish-flip-rotor')?.getBoundingClientRect() ?? null;
            setFrame(0);
            setImageFailed(false);
          } else {
            setFocused(false);
            setHovered(false);
          }
          setOpen(value);
        }}
      >
        <DialogTrigger
          render={
            <button
              ref={trigger}
              type="button"
              className="fish-record-card"
              onPointerDown={(event) => { pointer.current = event.pointerType; }}
              onPointerEnter={(event) => {
                if (canHover && event.pointerType === 'mouse') { pointer.current = 'mouse'; setPreviewRequested(true); setHovered(true); }
              }}
              onPointerLeave={() => setHovered(false)}
              onFocus={() => { if (pointer.current === 'keyboard') { setPreviewRequested(true); setFocused(true); } }}
              onBlur={() => { setFocused(false); }}
              onKeyDown={(event) => {
                pointer.current = 'keyboard';
                if (event.key === 'Escape') {
                  setFocused(false); setHovered(false);
                }
              }}
              aria-label={t(
                `打开${fish.name}的鱼获记录`,
                `Open the ${fish.name} catch record`,
              ) + ((fish.date || fish.place) ? t(
                `；小红书笔记记录：${[fish.date, fish.place].filter(Boolean).join('，')}`,
                `; Xiaohongshu note: ${[fish.date, fish.place].filter(Boolean).join(', ')}`,
              ) : '')}
            />
          }
        >
          <span className="fish-flip" data-flipped={flipped ? 'true' : 'false'} aria-hidden="true">
            <span className="fish-flip-rotor">
              <span className="fish-flip-face fish-flip-front">
                <FishPrint id={fish.id} name={fish.name} date={fish.date} place={fish.place} />
              </span>
              {hasPreview && canHover && (
                <span className="fish-flip-face fish-flip-back">
                  <FieldFrame className="fish-photo-print">
                    {previewRequested && <img
                      {...responsiveImage(fish.photos[0], '380px')}
                      alt=""
                      width={previewSize?.width}
                      height={previewSize?.height}
                      loading="eager"
                      fetchPriority="low"
                      onLoad={() => setPreviewReady(true)}
                      draggable={false}
                      onError={() => setPreviewFailed(true)}
                      decoding="async"
                    />}
                    <CatchCorner date={fish.date} place={fish.place} />
                  </FieldFrame>
                </span>
              )}
            </span>
          </span>
        </DialogTrigger>
        <DialogContent ref={popup} className="catch-dialog field-frame" showCloseButton={false}>
          <FrameRails />
          <DialogClose
            className="catch-close"
            aria-label={t('关闭鱼获记录', 'Close catch record')}
          >
            ×
          </DialogClose>
          <div className="catch-frame-content">
          <div className="catch-gallery">
            {fish.photos.length > 0 && !imageFailed ? (
              <img
                key={fish.photos[frame]}
                {...responsiveImage(fish.photos[frame], '(max-width: 760px) 92vw, 75vw')}
                alt={t(
                  `${fish.name}，Zeooo 的鱼获照片${frame + 1}`,
                  `${fish.name}, Zeooo’s catch, photo ${frame + 1}`,
                )}
                width={catchPhotoSizes[fish.photos[frame]]?.width}
                height={catchPhotoSizes[fish.photos[frame]]?.height}
                onError={() => setImageFailed(true)}
                className="catch-full-photo"
              />
            ) : (
              <div className="catch-photo-empty">
                <FishIcon id={fish.id} />
                <p>
                  {imageFailed
                    ? t(
                        '照片暂不可用',
                        'Photo unavailable',
                      )
                    : t(
                        '暂无照片',
                        'No photo yet',
                      )}
                </p>
              </div>
            )}
            {fish.photos.length > 1 && (
              <div
                className="catch-photo-controls"
                aria-label={t('切换鱼获照片', 'Choose a catch photo')}
              >
                {fish.photos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={t(
                      `查看第${i + 1}张照片`,
                      `View photo ${i + 1}`,
                    )}
                    aria-pressed={i === frame}
                    onClick={() => {
                      setFrame(i);
                      setImageFailed(false);
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="catch-story">
            <DialogTitle className="catch-title">
              <span lang="zh-CN">{record.name}</span>
              <span className="catch-name-en" lang="en">{englishFishNames[record.id]}</span>
            </DialogTitle>
            <DialogDescription className="sr-only">
              {t('鱼获照片、解锁日期与地点。', 'Catch photographs, unlock date and location.')}
            </DialogDescription>
            <dl className="catch-facts">
              <div>
                <dt>{t('解锁日期：', 'Unlock date:')}</dt>
                <dd>{fish.date || t('待补充', 'To be added')}</dd>
              </div>
              <div>
                <dt>{t('解锁地点：', 'Unlock location:')}</dt>
                <dd>{fish.place || t('待补充', 'To be added')}</dd>
              </div>
            </dl>
            {fish.source && (
              <a
                className="catch-source"
                href={fish.source}
                target="_blank"
                rel="noreferrer"
                aria-label={t('小红书原帖（在新窗口打开）', 'Original Xiaohongshu post (opens in a new window)')}
                title={t('小红书原帖', 'Original post')}
              >
                <span className="xiaohongshu-icon" aria-hidden="true" />
              </a>
            )}
          </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SpeciesCabinet({ language }: { language: Language }) {
  return (
    <div className="cabinet-grid fish-print-grid">
      {species.map((fish, index) => (
        <CatchCard
          key={fish.id}
          record={fish}
          index={index}
          language={language}
        />
      ))}
    </div>
  );
}
