import { species } from '@/content/journal';
import type { Metadata } from 'next';
import { requestLanguage } from '@/lib/request-language';
import '@fontsource/libre-baskerville/latin-400.css';
import '@fontsource/libre-baskerville/latin-400-italic.css';
import './site-fonts.css';
import './globals.css';
import './materials.css';
export async function generateMetadata(): Promise<Metadata> {
  const language = await requestLanguage();
  return {
    title: 'About Zeo',
    description:
      language === 'zh'
        ? `水上学钓，林中观鸟。${species.length}种已经相遇的鱼，与下一段河流的期待。`
        : `A personal fly fishing journal. ${species.length} species encountered, and more rivers still to come.`,
    icons: { icon: '/favicon.svg' },
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={(await requestLanguage()) === 'zh' ? 'zh-CN' : 'en'}>
      <head><link rel="license" href="/credits.txt" /></head>
      <body>{children}</body>
    </html>
  );
}
