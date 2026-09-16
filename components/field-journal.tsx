'use client';
import { useEffect, useRef, useState } from 'react';
import { AboutGallery } from './about-gallery';
import type { Language } from '@/lib/locale';
import { SpeciesCabinet } from './species-cabinet';
import { FishPrint } from './fish-print';
import { RiverLandscape } from './river-landscape';
import { ArrowUpRight, Mail } from './journal-icons';
import { profileUrl } from '@/content/journal';
import { englishFishNames } from '@/content/journal-en';
import { wishlist } from '@/content/wishlist';
import { preferredTimeZone, sceneAt, validTimeZone, type DayScene } from '@/lib/daylight';

export function FieldJournal({
  initialLanguage,
  timeZone,
  initialScene,
  previewScene,
}: {
  initialLanguage: Language;
  timeZone: string | null;
  initialScene: DayScene;
  previewScene?: DayScene;
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [scene, setScene] = useState(initialScene);
  const root = useRef<HTMLDivElement>(null);
  const zh = language === 'zh';
  const t = (cn: string, en: string) => (zh ? cn : en);
  useEffect(() => {
    if (previewScene) return;
    const update = () => {
      if (document.hidden) return;
      let deviceZone: string | null = null;
      try {
        deviceZone = validTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      } catch {
        // IP timezone remains available when device timezone detection fails.
      }
      setScene(sceneAt(new Date(), preferredTimeZone(deviceZone, timeZone)));
      if (deviceZone) {
        // Let the next server render start with the device's local-time landscape.
        const value = encodeURIComponent(deviceZone);
        if (!document.cookie.split(';').some((part) => part.trim() === `zeooo-timezone=${value}`)) {
          document.cookie = `zeooo-timezone=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
        }
      }
    };
    update();
    const timer = window.setInterval(update, 60_000);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
    };
  }, [timeZone, previewScene]);
  useEffect(() => {
    document.documentElement.lang = zh ? 'zh-CN' : 'en';
    document.title = zh ? 'Zeooo — 溪流手记' : 'Zeooo — A Field Journal';
  }, [zh]);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactMotion = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    let dispose = () => {};
    function setup() {
      dispose();
      for (const name of ['--opening-progress', '--encounter-progress', '--about-enter',
        '--hero-ink', '--closing-progress', '--paper-wash', '--scroll-y', '--read-progress']) {
        el?.style.removeProperty(name);
      }
      if (!el || preference.matches) {
        el?.classList.remove('motion-ready');
        el?.style.setProperty('--scroll-y', '0px');
        return;
      }
      el.classList.add('motion-ready');
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.09 },
      );
      el.querySelectorAll('[data-reveal]').forEach((node) =>
        observer.observe(node),
      );
      const hero = el.querySelector<HTMLElement>('.living-hero');
      const about = el.querySelector<HTMLElement>('#about');
      const collection = el.querySelector<HTMLElement>('#collection');
      const journey = el.querySelector<HTMLElement>('.river-journey');
      const scenery = el.querySelector<HTMLElement>('.journey-scenery');
      const closing = el.querySelector<HTMLElement>('.journey-ending');
      // Touch scrolling stays browser-native: no frame-by-frame layout reads or
      // inherited CSS variable updates across the entire page.
      if (compactMotion.matches) {
        el.dataset.motion = 'compact';
        const chapters = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            el.dataset.chapter = entry.target === hero ? 'hero'
              : entry.target === about ? 'about'
              : entry.target === closing ? 'ending' : 'collection';
          }
        }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
        [hero, about, collection, el.querySelector('#wishlist'), closing].forEach((node) => {
          if (node) chapters.observe(node);
        });
        let idleTimer = 0;
        const setScrolling = (active: boolean) => {
          if (document.documentElement.classList.contains('is-scrolling') === active) return;
          document.documentElement.classList.toggle('is-scrolling', active);
          document.dispatchEvent(new Event('zeooo-scroll-state'));
        };
        const onMobileScroll = () => {
          setScrolling(true);
          window.clearTimeout(idleTimer);
          idleTimer = window.setTimeout(() => setScrolling(false), 180);
        };
        window.addEventListener('scroll', onMobileScroll, { passive: true });
        dispose = () => {
          observer.disconnect();
          chapters.disconnect();
          window.removeEventListener('scroll', onMobileScroll);
          window.clearTimeout(idleTimer);
          setScrolling(false);
          delete el.dataset.motion;
          delete el.dataset.chapter;
        };
        return;
      }
      const specimens = [...el.querySelectorAll<HTMLElement>('.specimen')];
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const ease = (n: number) => n * n * (3 - 2 * n);
      let frame = 0;
      const update = () => {
        frame = 0;
        const viewport = window.innerHeight;
        const heroRect = hero?.getBoundingClientRect();
        const aboutRect = about?.getBoundingClientRect();
        const collectionRect = collection?.getBoundingClientRect();
        const opening = clamp(
          -(heroRect?.top ?? 0) / (heroRect?.height || viewport),
        );
        const encounter = clamp(
          (viewport * 0.92 - (collectionRect?.top ?? viewport)) /
            (viewport * 0.9),
        );
        // Let the paper wash build across a longer scroll distance than the title.
        const wash = ease(clamp(
          (viewport * 0.95 - (collectionRect?.top ?? viewport)) / (viewport * 1.5),
        ));
        const entering = ease(
          clamp(
            (viewport * 0.86 - (aboutRect?.top ?? viewport)) /
              (viewport * 0.66),
          ),
        );
        const closingRect = closing?.getBoundingClientRect();
        const journeyBottom = journey?.getBoundingClientRect().bottom ?? 0;
        const height = document.documentElement.scrollHeight - viewport;
        const specimenPositions = specimens.map((node) => ({
          node,
          naturalTop: node.getBoundingClientRect().top
            - (1 - Number(node.style.getPropertyValue('--fish-enter') || 1)) * 30,
        }));
        el.style.setProperty('--opening-progress', String(opening));
        el.style.setProperty('--encounter-progress', String(ease(encounter)));
        el.style.setProperty('--about-enter', String(entering));
        el.style.setProperty(
          '--hero-ink',
          String(1 - ease(clamp(opening / 0.62))),
        );
        const closingReveal = ease(clamp((viewport - (closingRect?.top ?? viewport)) / viewport));
        el.style.setProperty('--closing-progress', String(closingReveal));
        el.style.setProperty(
          '--paper-wash',
          String(
            Math.min(
              1,
              (0.24 * ease(clamp(opening / 0.92)) + 0.24 * wash) * (1 - closingReveal),
            ),
          ),
        );
        el.style.setProperty(
          '--scroll-y',
          `${Math.min(window.scrollY, 1100)}px`,
        );
        el.style.setProperty(
          '--read-progress',
          String(height > 0 ? clamp(window.scrollY / height) : 0),
        );
        scenery?.classList.toggle(
          'scene-offscreen',
          journeyBottom < 0 || (heroRect?.top ?? 0) > viewport,
        );
        specimenPositions.forEach(({ node, naturalTop }) => {
          const reveal = ease(
            clamp(
              (viewport * 0.96 - naturalTop) / Math.min(190, viewport * 0.25),
            ),
          );
          node.style.setProperty('--fish-enter', String(reveal));
        });
      };
      const onScroll = () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      };
      const resizeObserver = new ResizeObserver(onScroll);
      if (about) resizeObserver.observe(about);
      if (hero) resizeObserver.observe(hero);
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      dispose = () => {
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        cancelAnimationFrame(frame);
      };
    }
    setup();
    preference.addEventListener('change', setup);
    compactMotion.addEventListener('change', setup);
    return () => {
      dispose();
      preference.removeEventListener('change', setup);
      compactMotion.removeEventListener('change', setup);
    };
  }, []);
  function changeLanguage(next: Language) {
    setLanguage(next);
    document.cookie = `zeooo-language=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  }
  return (
    <div
      ref={root}
      data-scene={scene}
      className="journal"
    >
      <a className="skip" href="#collection">
        {t('跳到鱼种图鉴', 'Skip to the collection')}
      </a>
      <aside
        className="margin-tools"
        aria-label={t('阅读设置', 'Reading preferences')}
      >
        <fieldset className="language-switch" aria-label="Language / 语言">
          <button
            type="button"
            lang="zh-CN"
            aria-pressed={zh}
            onClick={() => changeLanguage('zh')}
          >
            中
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            lang="en"
            aria-pressed={!zh}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
        </fieldset>
      </aside>
      <main id="top">
        <div className="river-journey">
          <div className="journey-scenery" aria-hidden="true">
            <RiverLandscape scene={scene} />
            <div className="journey-atmosphere" />
            <div className="journey-paper" />
          </div>
          <section className="hero living-hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <h1 id="hero-title" className={zh ? 'slogan-bilingual' : 'slogan-english'}>
                {zh && (
                  <span className="hero-title-cn" lang="zh-CN">
                    水上学钓，林中观鸟
                    <span className="hero-letterlight" aria-hidden="true">水上学钓，林中观鸟</span>
                  </span>
                )}
                <span className="hero-title-en" lang="en">
                  In sync with the current.
                  <span className="hero-letterlight" aria-hidden="true">In sync with the current.</span>
                </span>
              </h1>
            </div>
          </section>

          <section
            id="about"
            className="about wrap journey-about"
            aria-labelledby="about-title"
          >
            <AboutGallery language={language} />
            <div className="about-copy">
              <h2 id="about-title">
                {t('你好，我是', 'Hello, I’m')}{' '}
                <em>Zeo</em>
              </h2>
              <p>
                {t(
                  '喜欢站在流水里，读水、绑蝇，琢磨一段自然的 dead drift。',
                  'I like standing in running water, reading the current, tying flies, and working on a natural dead drift.',
                )}
              </p>
              <p>
                {t(
                  '目前主要玩 Euro nymphing 和 Centerpin。近处细细探流，远处顺水走漂；也喜欢琢磨水面之下，飞蝇究竟怎样经过鱼的身边。',
                  'These days, I mostly fish Euro nymphing and Centerpin: exploring the water close at hand, or following a drift farther downstream. I like figuring out what happens below the surface—how the fly actually passes a fish.',
                )}
              </p>
              <p>
                {t(
                  '偏爱本土原生鱼种，从溪流里的裂腹鱼，到江河中的清波、白甲。',
                  'I’m drawn to the native fish of China’s streams and rivers.',
                )}
              </p>
              <div className="contact contact-icons">
                <a
                  href="mailto:zeo0811@gmail.com"
                  className="contact-icon"
                  aria-label={t('发邮件给 Zeo：zeo0811@gmail.com', 'Email Zeo at zeo0811@gmail.com')}
                  title="zeo0811@gmail.com"
                >
                  <Mail size={28} strokeWidth={1.5} />
                </a>
                <a
                  className="contact-icon contact-xiaohongshu"
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t('Zeo 的小红书主页（在新窗口打开）', 'Zeo on Xiaohongshu (opens in a new window)')}
                  title={t('小红书', 'Xiaohongshu')}
                >
                  <span className="xiaohongshu-icon" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section
            id="collection"
            className="collection wrap journey-collection"
            aria-labelledby="collection-title"
          >
            <div className="collection-heading journey-collection-header">
              <h2 id="collection-title">
                {t('我目前已经解锁：', 'The fish I’ve caught:')}
              </h2>
            </div>
            <SpeciesCabinet language={language} />
          </section>

        <section
          id="wishlist"
          className="wishlist-section wrap"
          aria-labelledby="wish-title"
        >
          <div className="collection-heading" data-reveal>
            <h2 id="wish-title">{t('心愿单：', 'Wish list:')}</h2>
          </div>
          <div className="cabinet-grid fish-print-grid" data-reveal>
            {wishlist.map((fish) => (
              <FishPrint
                key={fish.id}
                id={fish.id}
                name={t(fish.name, `${englishFishNames[fish.id]}${fish.largeSpecimen ? ' — a big one' : ''}`)}
                lockedLabel={t('未解锁', 'Not yet unlocked')}
              />
            ))}
          </div>
        </section>
          <footer id="ending" className="journey-ending wishlist-section wrap" aria-labelledby="simulator-title">
            <div className="collection-heading" data-reveal>
              <h2 id="simulator-title">
                {t('我做了个水下 Dead Drift 3D模拟器：', 'I built an underwater Dead Drift 3D simulator:')}
              </h2>
            </div>
            <a
              className="drift-entry"
              href="https://fish.zeooo.cc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(
                '来水下看看：我做的 3D dead drift 模拟器（在新窗口打开）',
                'Come below the surface: my 3D dead drift simulator (opens in a new window)',
              )}
            >
              <img
                className="drift-entry-art"
                src="/images/river-studio-entry.webp"
                width={1536}
                height={1024}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="drift-entry-copy">
                <span className="drift-entry-title drift-entry-action">
                  <span>{t('来水下看看', 'Come below the surface')}</span>
                  <ArrowUpRight size={32} aria-hidden="true" />
                </span>
              </div>
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}
