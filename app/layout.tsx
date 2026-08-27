import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '再等一次｜寻找拉赫玛尼诺夫钢琴协奏曲的现场',
  description: '只寻找拉赫玛尼诺夫四首钢琴协奏曲与《帕格尼尼主题狂想曲》在中国内地、香港和澳门的下一次现场。',
  metadataBase: new URL('https://lexun-gba-concerts.zjzhao.chatgpt.site'),
  openGraph: {
    title: '再等一次｜寻找拉赫玛尼诺夫钢琴协奏曲的现场',
    description: '有些现场错过了，就再等一次。',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '再等一次｜寻找拉赫玛尼诺夫钢琴协奏曲的现场',
    description: '有些现场错过了，就再等一次。',
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
