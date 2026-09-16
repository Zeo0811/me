import { useId } from 'react';

const forms: Record<string, { back: string; side: string; belly: string; fin: string; depth: number; dorsal: string; marks?: 'light' | 'dark' | 'patch'; scale?: boolean }> = {
  char: { back: '#314c49', side: '#657e68', belly: '#d8c2a0', fin: '#b77949', depth: 1, dorsal: 'M124 75 Q130 42 145 50 L171 78Z', marks: 'light' },
  schizothorax: { back: '#616c58', side: '#a7ab89', belly: '#ebe2bf', fin: '#978657', depth: .79, dorsal: 'M120 77 L144 42 Q164 60 177 80Z', marks: 'dark' },
  prenanti: { back: '#687a71', side: '#bccdc0', belly: '#f0eadc', fin: '#888a72', depth: .92, dorsal: 'M122 73 L141 40 Q164 58 179 80Z', scale: true },
  barbel: { back: '#394b40', side: '#849279', belly: '#d6d3ac', fin: '#536853', depth: 1.22, dorsal: 'M108 73 L134 36 L163 73Z', scale: true },
  gudgeon: { back: '#69867e', side: '#cbd8cc', belly: '#faf2d8', fin: '#b08c69', depth: 1.08, dorsal: 'M124 73 L148 37 L171 77Z', scale: true },
  whitearmor: { back: '#61746c', side: '#c5d3c3', belly: '#f4efde', fin: '#86958c', depth: 1.2, dorsal: 'M117 70 L140 37 L172 77Z', scale: true },
  mandarin: { back: '#686950', side: '#c1b583', belly: '#eee2bc', fin: '#a99c6d', depth: 1.2, dorsal: 'M94 74 L102 54 L111 65 L117 42 L125 62 L134 34 L142 57 L151 37 L158 57 Q180 24 204 53 L215 89Z', marks: 'patch' },
  lenok: { back: '#796d55', side: '#bca77b', belly: '#e9d9b8', fin: '#ad7558', depth: .95, dorsal: 'M119 75 Q131 45 144 47 L168 76Z', marks: 'dark' },
  grayling: { back: '#456e73', side: '#94b2b1', belly: '#e1dfcf', fin: '#946e89', depth: .79, dorsal: 'M102 77 Q107 23 129 24 Q157 19 197 44 L207 80Z', marks: 'dark' },
};

/** Bespoke vector icons, shaded like small sculpted fish. Decorative, not identification plates. */
export function FishIcon({ id }: { id: string }) {
  const uid = useId().replaceAll(':', '');
  const f = forms[id] ?? forms.char;
  const u = (name: string) => `url(#${uid}-${name})`;
  const body = id === 'mandarin'
    ? 'M43 99 Q53 77 83 72 C132 43 192 62 237 91 L255 95 L255 111 L233 112 C184 133 109 150 66 124 L43 115 L62 108Z'
    : 'M43 101 Q54 81 78 77 C129 50 189 69 237 91 L253 96 L253 108 L235 112 C176 136 106 142 62 121 Q48 116 43 108Z';
  return <svg className={`fish-icon fish-${id}`} viewBox="0 0 320 200" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0.12" y2="1"><stop stopColor={f.back}/><stop offset=".3" stopColor={f.side}/><stop offset=".62" stopColor={f.belly}/><stop offset=".8" stopColor={f.side}/><stop offset="1" stopColor={f.back}/></linearGradient>
      <linearGradient id={`${uid}-fin`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={f.fin}/><stop offset=".45" stopColor={f.belly}/><stop offset="1" stopColor={f.fin}/></linearGradient>
      <radialGradient id={`${uid}-head`} cx=".35" cy=".3" r=".8"><stop stopColor={f.belly}/><stop offset=".5" stopColor={f.side}/><stop offset="1" stopColor={f.back}/></radialGradient>
      <radialGradient id={`${uid}-shadow`}><stop stopColor="#264c3d" stopOpacity=".21"/><stop offset="1" stopColor="#264c3d" stopOpacity="0"/></radialGradient>
      <pattern id={`${uid}-scales`} width="12" height="10" patternUnits="userSpaceOnUse"><path d="M0 0 Q12 5 0 10 M6 -5 Q18 0 6 5 M6 5 Q18 10 6 15" fill="none" stroke={f.back} strokeWidth=".65" opacity=".3"/></pattern>
      <clipPath id={`${uid}-clip`}><path d={body}/></clipPath>
    </defs>
    <ellipse cx="163" cy="165" rx="107" ry="13" fill={u('shadow')}/>
    <g className="fish-sculpture" transform={`translate(0 ${102-102*f.depth}) scale(1 ${f.depth})`}>
      <path d="M232 99 Q260 82 286 66 Q278 91 269 103 Q279 116 286 137 Q259 124 236 109Z" fill={u('fin')} stroke={f.fin} strokeWidth=".8"/>
      <path d={f.dorsal} fill={u('fin')} stroke={f.fin} strokeWidth="1"/>
      {id === 'grayling' && Array.from({length:9},(_,i)=><path key={i} d={`M${112+i*10} ${35+i*.8} L${118+i*9} 79`} stroke="#53465f" strokeWidth="1.4" opacity=".55"/>)}
      <path d="M158 117 Q174 137 190 142 L183 119 M105 120 Q110 141 133 151 L132 122" fill={u('fin')} stroke={f.fin} strokeWidth=".7"/>
      {['char','lenok','grayling'].includes(id) && <path d="M215 88 Q218 70 227 77 L236 92" fill={u('fin')}/>}
      <path d={body} fill={u('body')} stroke={f.back} strokeWidth=".8"/>
      <g clipPath={u('clip')}>
        {f.scale && <path d={body} fill={u('scales')}/>}
        {f.marks && Array.from({length:f.marks==='patch'?12:41},(_,i)=>{
          const x=87+(i*31%145), y=76+(i*19%45);
          return <ellipse key={i} cx={x} cy={y} rx={f.marks==='patch'?5+(i%3)*2:f.marks==='light'?2.4:1.7} ry={f.marks==='patch'?8:1.9} fill={f.marks==='light'?'#e7dbc2':'#453f2e'} opacity={f.marks==='patch'?'.7':'.8'} transform={`rotate(${i*29} ${x} ${y})`}/>;
        })}
        <path d="M78 101 Q150 96 238 102" fill="none" stroke="#fffce8" strokeWidth="1.1" opacity=".42"/>
        <ellipse cx="155" cy="92" rx="78" ry="12" fill="#fff" opacity=".12"/>
      </g>
      <path d="M45 102 Q64 76 89 79 Q104 99 87 124 Q58 126 45 111Z" fill={u('head')}/>
      <path d="M88 80 Q104 102 86 123" fill="none" stroke={f.back} strokeWidth="1.4" opacity=".65"/>
      <path d="M90 108 Q122 106 139 130 Q111 136 90 113" fill={u('fin')} stroke={f.fin} strokeWidth=".8"/>
      <path d="M94 111 L129 127 M99 113 L121 127 M252 102 L280 73 M253 104 L278 128" stroke={f.back} opacity=".25" strokeWidth="1"/>
      <circle cx="64" cy="95" r="6.2" fill="#dace9d"/><circle cx="64" cy="95" r="4.4" fill="#142b2b"/><circle cx="62.7" cy="93.3" r="1.4" fill="#fff"/>
      <path d={id==='mandarin'?'M43 108 L73 109':'M44 108 Q52 112 61 110'} fill="none" stroke={f.back} strokeWidth="1.4"/>
      {['schizothorax','barbel'].includes(id) && <path d="M48 111 Q43 120 49 123 M54 112 Q59 121 65 121" fill="none" stroke={f.fin} strokeWidth="1.2"/>}
      <path d="M91 77 Q141 61 193 79" fill="none" stroke="#fff" strokeWidth="1.4" opacity=".45"/>
    </g>
  </svg>;
}
