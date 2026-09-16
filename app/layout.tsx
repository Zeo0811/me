import type { Metadata } from 'next';
import { requestLanguage } from '@/lib/request-language';
import '@fontsource/libre-baskerville/latin-400.css';
import '@fontsource/libre-baskerville/latin-400-italic.css';
import '@fontsource-variable/noto-serif-sc/wght.css';
import './globals.css';
export async function generateMetadata(): Promise<Metadata> {
  const language = await requestLanguage();
  return {
    title: language === 'zh' ? 'Zeooo — 溪流手记' : 'Zeooo — A Field Journal',
    description:
      language === 'zh'
        ? '水上学钓，林中观鸟。九种已经相遇的鱼，与下一段河流的期待。'
        : 'A personal fly fishing journal. Nine species encountered, and more rivers still to come.',
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
