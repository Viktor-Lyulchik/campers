import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TravelTracks',
  description:
    'Campers of your dreams. You can find everything you want in our catalog.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://campers.vercel.app',
    title: 'TravelTracks',
    description:
      'Campers of your dreams. You can find everything you want in our catalog.',
    images: [
      {
        url: 'https://campers.vercel.app/img/main.png',
        width: 1200,
        height: 630,
        alt: 'Campers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourTwitterHandle',
    title: 'TravelTracks',
    description:
      'Campers of your dreams. You can find everything you want in our catalog.',
    images: ['https://campers.vercel.app/img/main.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
