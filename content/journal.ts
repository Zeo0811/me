export type FishRecord = {
  id: string;
  name: string;
  date: string;
  place: string;
  source?: string;
  photos: string[];
  caption: string;
  locationBasis?: string;
};
// Legacy entries use note dates/regions; each locationBasis records user corrections.
// Replace date/place and photo paths here when Zeo corrects the records.
// Use the stable note route. `/explore/:id` links issued by Xiaohongshu depend on
// a short-lived xsec token and eventually become unavailable.
const xhsNote = (id: string) => `https://www.xiaohongshu.com/discovery/item/${id}`;
const sichuanPost = xhsNote('69fc000d0000000023004dc9');
export const species: FishRecord[] = [
  { id: 'char', name: '白斑红点鲑', date: '2025-11-10', place: '川西', source: xhsNote('6901992400000000050129fc'), photos: ['/images/catches/char-0855.webp'], caption: '溪流中的白斑红点鲑。', locationBasis: '照片由本人提供 IMG_0855.HEIC 并指定鱼种；本人确认解锁地点为川西。日期暂沿用小红书笔记，不代表新照片拍摄日期。' },
  { id: 'schizothorax', name: '重口裂腹鱼', date: '2025-12-05', place: '川西', source: xhsNote('69327201000000001e0386bf'), photos: ['/images/catches/schizothorax-0967.webp'], caption: '沿河换点，从深潭、白沫，到石后的缓流。', locationBasis: '照片由本人提供 IMG_0967.HEIC 并指定鱼种；日期与地区仍暂沿用笔记，新照片实际日期和城市待补。' },
  { id: 'prenanti', name: '齐口裂腹鱼', date: '2025-12-05', place: '川西', photos: ['/images/catches/prenanti-0983.webp'], caption: '溪流中的一次相遇。', locationBasis: '照片由本人提供 IMG_0983.HEIC 并指定鱼种。本人确认时间和地点与重口裂腹鱼相同，沿用其当前笔记记录 2025-12-05 / 川西。' },
  { id: 'barbel', name: '中华倒刺鲃', date: '2026-05-07', place: '四川', source: sichuanPost, photos: ['/images/catches/qingbo.webp', '/images/catches/qingbo-detail.webp', '/images/catches/qingbo-3845.webp'], caption: '四川欧若，一次与清波的相遇。', locationBasis: '原帖显示05-07，本人确认年份为2026；地区来自笔记标题。第三张照片由本人补充 IMG_3845.HEIC 并指定鱼种，不据此推断新照片实际日期与地点。' },
  { id: 'gudgeon', name: '圆吻鲴', date: '2026-05-07', place: '四川', source: sichuanPost, photos: ['/images/catches/yuanwengu.webp'], caption: '四川飞钓记录中的一尾圆吻鲴。', locationBasis: '原帖显示05-07，本人确认年份为2026；地区来自笔记标题，照片对应待本人复核。' },
  { id: 'whitearmor', name: '白甲鱼', date: '2026-05-07', place: '四川', source: sichuanPost, photos: ['/images/catches/whitearmor-3829.webp', '/images/catches/whitearmor-3827.webp'], caption: '已经解锁。下一次，期待更大的个体。', locationBasis: '两张照片由本人提供并指定鱼种，顺序为 IMG_3829、IMG_3827。日期与地区暂沿用小红书笔记，本人确认05-07年份为2026；不据此推断新照片的实际日期与地点。' },
  { id: 'mandarin', name: '斑鳜', date: '2026-05-07', place: '四川', source: sichuanPost, photos: ['/images/catches/bangui.webp'], caption: '意外的相遇，也值得记上一页。', locationBasis: '原帖显示05-07，本人确认年份为2026；地区来自笔记标题。' },
  { id: 'lenok', name: '细鳞鲑', date: '2026-09-12', place: '黑龙江', source: xhsNote('6aa48d3b000000000b034b31'), photos: ['/images/zeo-river.webp'], caption: 'Done! Another one on the list.', locationBasis: '按 9 月 16 日读取的「4 天前 · 黑龙江」暂录；照片对应待本人复核。摄影：包哥爱玩野路子。' },
  { id: 'grayling', name: '北极茴鱼', date: '2026-09-12', place: '黑龙江', photos: ['/images/catches/grayling-5345.webp'], caption: '溪流中的北极茴鱼。', locationBasis: '照片由本人提供 IMG_5345.HEIC。本人确认解锁时间和地点与细鳞鲑相同，沿用其当前记录 2026-09-12 / 黑龙江；该日期原按小红书相对发帖时间暂录。' },
  { id: 'redeye', name: '赤眼鳟', date: '2026-08-15', place: '重庆', photos: ['/images/catches/redeye-5082.webp', '/images/catches/redeye-5103.webp', '/images/catches/redeye-5073.webp'], caption: '重庆的一次相遇。', locationBasis: '鱼种、解锁日期2026-08-15及地点重庆由本人确认；照片顺序为IMG_5082、IMG_5103、IMG_5073。' },
];
export const profileUrl = 'https://www.xiaohongshu.com/user/profile/5bc58ba89fc6ff00016c7e3f';
export const photoPostUrl = xhsNote('6aa48d3b000000000b034b31');
