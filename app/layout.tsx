import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://zeo-in-the-current.zeo0811.chatgpt.site'),
  title: 'Zeo — In sync with the current',
  description: '水上学钓，林中观鸟。Zeo 的个人飞钓图鉴：已经相遇的九种鱼，和下一次想遇见的大个体白甲鱼。',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
