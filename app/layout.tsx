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
  title: 'Campers from TravelTracks',
  description:
    'Camper rental in Ukraine 🚐. Modern motorhomes for your perfect road trip. Comfort, freedom, and great prices. Book your camper online!',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://campers-sand.vercel.app',
    title: 'Campers from TravelTracks',
    siteName: 'Campers',
    description:
      'Camper rental in Ukraine 🚐. Modern motorhomes for your perfect road trip. Comfort, freedom, and great prices. Book your camper online!',
    images: [
      {
        url: 'https://campers-sand.vercel.app/camper.png',
        width: 1200,
        height: 630,
        alt: 'Campers from TravelTracks rental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourTwitterHandle',
    title: 'Campers from TravelTracks',
    description:
      'Camper rental in Ukraine 🚐. Modern motorhomes for your perfect road trip. Comfort, freedom, and great prices. Book your camper online!',
    images: ['https://campers-sand.vercel.app/camper.png'],
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
