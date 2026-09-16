'use client';
import { useRef, type PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, Check, Plus, Waves } from '@/components/journal-icons';
import { species, profileUrl, photoPostUrl } from '@/content/journal';

export default function Home() {
  const photo = useRef<HTMLDivElement>(null);
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = photo.current;
    if (!el) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    el.style.setProperty('--rx', `${-y * 7}deg`);
    el.style.setProperty('--ry', `${x * 8}deg`);
  }
  function resetTilt() {
    photo.current?.style.setProperty('--rx', '0deg');
    photo.current?.style.setProperty('--ry', '0deg');
  }
  return (
    <>
      <a className="skip" href="#collection">跳到鱼种图鉴</a>
      <header className="header">
        <a className="brand" href="#top" aria-label="Zeo 首页">zeo<span className="brand-dot">.</span><span className="brand-caption">FLY FISHING<br/>FIELD JOURNAL</span></a>
        <nav aria-label="主导航"><a href="#collection">鱼种图鉴 <span>09</span></a><a href="#wishlist">Wish list <span>01</span></a><a href="#about">关于我</a></nav>
        <a className="social-link" href={profileUrl} target="_blank" rel="noreferrer">小红书 <ArrowUpRight size={15}/></a>
      </header>
      <main id="top">
        <section className="intro wrap" aria-labelledby="intro-title">
          <div className="intro-copy">
            <p className="eyebrow"><span className="status-dot"/> ZEO’S PERSONAL FIELD JOURNAL</p>
            <h1 id="intro-title">In sync with<br/>the <em>current.</em></h1>
            <p className="intro-cn">水上学钓，林中观鸟。</p>
            <p className="intro-description">记录在河流里遇见的鱼，<br/>也给下一次出发，留一点期待。</p>
            <a className="text-link" href="#collection">翻开我的鱼种图鉴 <ArrowDown size={17}/></a>
            <div className="intro-bottom"><span>FLY FISHING & FLOAT FISHING</span><span>Catch. Release. Remember.</span></div>
          </div>
          <div className="photo-scene" onPointerMove={tilt} onPointerLeave={resetTilt}>
            <div className="photo-back" aria-hidden="true"/>
            <div className="photo-card" ref={photo}>
              <div className="photo-top"><span>ON THE WATER</span><span>↗</span></div>
              <Image unoptimized src="/images/zeo-river.webp" alt="Zeo 在林间溪流中双手托起一条鱼" width="1080" height="1440" fetchPriority="high"/>
              <div className="photo-caption"><span>Another one on the list.</span><a href={photoPostUrl} target="_blank" rel="noreferrer" aria-label="查看这张照片的小红书原帖"><ArrowUpRight size={18}/></a></div>
            </div>
            <span className="photo-credit">PHOTO BY 包哥爱玩野路子</span>
          </div>
        </section>

        <section id="collection" className="collection wrap" aria-labelledby="collection-title">
          <div className="section-heading"><div><p className="eyebrow">01 / THE COLLECTION</p><h2 id="collection-title">已经相遇<span className="heading-dot">.</span></h2></div><div className="section-meta"><strong>09</strong><span>种鱼 · 飞钓野钓记录</span></div></div>
          <div className="species-grid">
            {species.map((fish, index) => <article className="species-card" key={fish.name}>
              <div className="species-top"><span className="record-number">{String(index+1).padStart(2,'0')} / FIELD RECORD</span><Check size={16} strokeWidth={1.5} aria-label="已解锁"/></div>
              <h3>{fish.name}</h3>
              <div className="species-bottom"><span>{fish.name === '中华倒刺鲃' ? '清波 · 55 公分记录' : '野钓 · 已解锁'}</span><span className="little-line" aria-hidden="true"/></div>
            </article>)}
          </div>
          <div className="collection-foot"><span>每一个名字，都连着一段在水边的时间。</span><Waves size={28} strokeWidth={1}/></div>
        </section>

        <section id="wishlist" className="wish-section" aria-labelledby="wish-title">
          <div className="wish-inner wrap">
            <div className="wish-label"><p className="eyebrow">02 / THE WISH LIST</p><span className="wish-tag"><span className="status-dot"/> 下一次相遇</span></div>
            <div className="wish-main"><div><h2 id="wish-title">大个体<br/><span>白甲鱼</span></h2><p>曾经在急流里，与一条白甲僵持二十多分钟。<br/>最后脱钩了。下一次，想把这段故事继续写完。</p></div><div className="wish-symbol" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><Plus size={44} strokeWidth={.7}/><span>TO BE CONTINUED</span></div></div>
            <div className="wish-bottom"><span>从已经相遇，到个体突破。</span><span>01 WISH, MANY RIVERS.</span></div>
          </div>
        </section>

        <section id="about" className="about wrap" aria-labelledby="about-title">
          <div><p className="eyebrow">03 / THE ANGLER</p><h2 id="about-title">你好，我是 Zeo<span className="heading-dot">.</span></h2><p className="about-sign">See you by the river.</p></div>
          <div className="about-copy"><p>喜欢站在流水里，读水、绑蝇，<br className="desktop-break"/>琢磨一次更自然的 drift。</p><p>用 Euro nymphing 细细探一段流，也用 Centerpin 把飞蝇送向更远的水面。喜欢本土鱼，也喜欢每一次陌生的相遇。</p><p>希望很多年以后，仍然能在晨曦和日暮中走进河流。钓起，放归，慢慢学。</p><p><a className="text-link" href="mailto:zeo0811@gmail.com" aria-label="发送邮件给 Zeo：zeo0811@gmail.com">zeo0811@gmail.com <ArrowUpRight size={17}/></a></p><div className="about-bottom"><span>CATCH & RELEASE</span><a className="text-link" href={profileUrl} target="_blank" rel="noreferrer">更多水边日常 <ArrowUpRight size={17}/></a></div></div>
        </section>
      </main>
      <footer className="footer wrap"><a className="footer-wordmark" href="#top">zeo.</a><span>IN SYNC WITH THE CURRENT.</span><a href="#top" aria-label="回到顶部">回到上游 <ArrowUpRight size={16}/></a></footer>
    </>
  );
}
