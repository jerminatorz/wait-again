import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '乐巡｜大湾区古典音乐现场指南',
  description: '按作曲家或曲目，寻找香港、澳门、广州、深圳与珠海的近期古典音乐会。',
  metadataBase: new URL('https://lexun-gba-concerts.zjzhao.chatgpt.site'),
  openGraph: {
    title: '乐巡｜大湾区古典音乐现场指南',
    description: '按作曲家或曲目，寻找香港、澳门、广州、深圳与珠海的近期古典音乐会。',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '乐巡｜大湾区古典音乐现场指南',
    description: '按作曲家或曲目，寻找香港、澳门、广州、深圳与珠海的近期古典音乐会。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
