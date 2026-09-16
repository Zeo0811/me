import Image from 'next/image';
import type { CSSProperties } from 'react';
import { sceneAssets, type DayScene } from '@/lib/daylight';

// Fixed positions avoid random server/client mismatches and leave room for the slogan.
const stars = [
  [5, 8, 2], [14, 18, 1], [22, 6, 1.5], [35, 13, 1], [48, 5, 2],
  [60, 9, 1], [72, 5, 1.5], [86, 10, 1], [94, 19, 2], [8, 31, 1],
  [20, 27, 1.5], [32, 34, 1], [43, 25, 1], [56, 32, 2], [69, 22, 1],
  [79, 35, 1.5], [91, 40, 1], [4, 47, 1], [62, 43, 1], [97, 8, 1],
];
// Independent sky, sun, terrain, water highlights and transparent foreground.
export function RiverLandscape({ scene, idPrefix = 'opening', priority = true }: {
  scene: DayScene;
  idPrefix?: string;
  priority?: boolean;
}) {
  const terrain = sceneAssets[scene];
  return (
    <div className="river-scene" aria-hidden="true">
      <div className="scene-sky" />
      <div className="scene-cloudlight" />
      <div className="scene-stars">
        {stars.map(([x, y, size], index) => (
          <i key={index} style={{
            left: `${x}%`, top: `${y}%`, width: `${size}px`, height: `${size}px`,
            '--star-delay': `${index * -1.7}s`,
          } as CSSProperties} />
        ))}
      </div>
      <div className="scene-moon"><span /></div>
      <div className="scene-sun">
        <span />
      </div>
      <div className="scene-terrain">
        <Image
          unoptimized
          src={terrain}
          alt=""
          width={1536}
          height={1024}
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
        />
        <svg className="scene-current" viewBox="0 0 1536 1024" fill="none">
          <defs>
            <filter id={`${idPrefix}-water-light`}>
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.16" />
                <feFuncG type="linear" slope="1.13" />
                <feFuncB type="linear" slope="1.09" />
              </feComponentTransfer>
            </filter>
            <filter id={`${idPrefix}-water-soft-edge`}>
              <feGaussianBlur stdDeviation="9" />
            </filter>
            <mask id={`${idPrefix}-water-reflection-area`}>
              <g filter={`url(#${idPrefix}-water-soft-edge)`} fill="white">
                <path d="M1260 446H1536V1024H1270L1120 920 1290 850 1170 792 1280 729 1330 664 1450 606 1370 548 1310 505Z" />
                <path
                  d="M350 529C590 535 441 557 529 581S652 620 460 657 192 704 355 741 721 753 828 808 971 887 1190 944"
                  fill="none"
                  stroke="white"
                  strokeWidth="24"
                />
              </g>
            </mask>
          </defs>
          <g mask={`url(#${idPrefix}-water-reflection-area)`}>
            <image
              className="water-reflection"
              href={terrain}
              width="1536"
              height="1024"
              filter={`url(#${idPrefix}-water-light)`}
            />
          </g>
        </svg>
        <div className="scene-angler">
          <Image
            unoptimized
            src="/images/hero/zeo-angler.webp"
            alt=""
            width={640}
            height={640}
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      </div>
      <div className="scene-foreground">
        <Image
          unoptimized
          src="/images/hero/foreground.webp"
          alt=""
          width={1536}
          height={1024}
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
      <div className="scene-evening" />
    </div>
  );
}
export function RiverThread() {
  return (
    <svg
      className="river-thread"
      viewBox="0 0 220 140"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M103-8C34 34 165 21 125 65S39 92 106 143M121-8C55 34 182 23 141 68S64 96 125 147"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        className="flow-line"
        d="M112-8C42 34 174 21 133 67S51 94 115 146"
        stroke="currentColor"
        strokeDasharray="9 9"
      />
    </svg>
  );
}
export function Sea() {
  return (
    <svg
      className="closing-sea"
      viewBox="0 0 1440 190"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="#e0e6da"
        d="M0 30Q180 65 360 35T720 35T1080 35T1440 35V190H0Z"
      />
      {[65, 91, 117, 145, 172].map((y, i) => (
        <path
          key={y}
          className="sea-wave"
          style={{ animationDelay: `${i * -1.8}s` }}
          d={`M-360 ${y}Q-180 ${y - 15} 0 ${y}T360 ${y}T720 ${y}T1080 ${y}T1440 ${y}T1800 ${y}`}
          fill="none"
          stroke="#658e87"
          strokeWidth="1"
          opacity={0.2 + i * 0.07}
        />
      ))}
    </svg>
  );
}
