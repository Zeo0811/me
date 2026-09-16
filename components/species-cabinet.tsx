'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { ArrowUpRight, Check } from '@/components/journal-icons';
import { FishIcon } from '@/components/fish-icon';
import { species, type FishRecord } from '@/content/journal';

function CatchCard({ fish, index }: { fish: FishRecord; index: number }) {
  const [frame, setFrame] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [hoverDismissed, setHoverDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={(value) => { setOpen(value); if(value) {setFrame(0);setImageFailed(false);} }}>
    <DialogTrigger render={<button type="button" className={`cabinet-card${hoverDismissed ? ' hover-dismissed' : ''}`} onPointerEnter={()=>setHoverDismissed(false)} onFocus={()=>setHoverDismissed(false)} onKeyDown={(event)=>{if(event.key==='Escape')setHoverDismissed(true);}} aria-label={`打开${fish.name}的鱼获记录`}/> }>
      <span className="cabinet-stage">
        <span className="cabinet-index">{String(index + 1).padStart(2,'0')}</span>
        <span className="unlocked-mark"><Check size={13}/><span>已解锁</span></span>
        <FishIcon id={fish.id}/>
        <span className={`catch-peek${fish.photos.length ? '' : ' catch-peek-empty'}`}>
          {fish.photos.length > 0 && <Image unoptimized src={fish.photos[0]} alt="" width={600} height={400} loading="lazy"/>}
          <span className="peek-copy"><span>{fish.photos.length ? '我的鱼获' : '鱼获照片待补充'}</span><span>{fish.date || '日期待补'} · {fish.place || '地点待补'}</span><small>点击打开记录 ↗</small></span>
        </span>
      </span>
      <span className="cabinet-caption"><span><span className="cabinet-name">{fish.name}</span><span className="cabinet-sub">WILD CATCH / {String(index + 1).padStart(2,'0')}</span></span><span className="open-record"><ArrowUpRight size={19}/></span></span>
    </DialogTrigger>
    <DialogContent className="catch-dialog" showCloseButton={false}>
      <DialogClose className="catch-close" aria-label="关闭鱼获记录">×</DialogClose>
      <div className="catch-gallery">
        {fish.photos.length && !imageFailed ? <Image unoptimized key={fish.photos[frame]} src={fish.photos[frame]} alt={`${fish.name}，Zeo 的鱼获照片${frame + 1}`} width={1600} height={1200} onError={()=>setImageFailed(true)} className="catch-full-photo"/> : <div className="catch-photo-empty"><FishIcon id={fish.id}/><p>{imageFailed ? '照片暂时无法显示' : '这尾鱼的照片，稍后补上。'}</p></div>}
        {fish.photos.length > 1 && <div className="catch-photo-controls" aria-label="切换鱼获照片">{fish.photos.map((_,i)=><button key={i} type="button" aria-label={`查看第${i+1}张照片`} aria-pressed={i===frame} onClick={()=>{setFrame(i);setImageFailed(false);}}>{String(i+1).padStart(2,'0')}</button>)}</div>}
      </div>
      <div className="catch-story">
        <p className="eyebrow">FIELD RECORD / {String(index+1).padStart(2,'0')}</p>
        <span className="catch-unlocked"><Check size={14}/>飞钓野钓 · 已解锁</span>
        <DialogTitle className="catch-title">{fish.name}</DialogTitle>
        <DialogDescription className="catch-description">{fish.caption}</DialogDescription>
        <dl className="catch-facts"><div><dt>笔记时间</dt><dd>{fish.date || '待补充'}</dd></div><div><dt>城市 / 地区</dt><dd>{fish.place || '待补充'}</dd></div></dl>
        <p className="catch-provenance">{fish.source ? '日期与地区暂按小红书记录，待补实际鱼获信息。' : '鱼种已解锁，照片、日期与城市待补充。'}{fish.locationBasis && <span>{fish.locationBasis}</span>}</p>
        {fish.source && <a className="text-link" href={fish.source} target="_blank" rel="noreferrer">查看小红书原帖 <ArrowUpRight size={16}/></a>}
        <p className="catch-sign">Catch. Release. Remember.</p>
      </div>
    </DialogContent>
  </Dialog>;
}

export function SpeciesCabinet(){
  return <><p className="cabinet-instruction"><span className="desktop-hover-hint">悬停看看鱼获，</span>点击展开那一次相遇。</p><div className="cabinet-grid">{species.map((fish,index)=><CatchCard key={fish.id} fish={fish} index={index}/>)}</div></>;
}
