import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StarknetProvider } from "@/components/sn-react/StarknetProvider";
import { ENVIRONMENT, GAME_CONFIG } from "@/config";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(ENVIRONMENT.PROD_URL),
  title: 'Shapes',
  description: `Solve ${GAME_CONFIG.SHAPES_PER_GAME} shapes, once a day`,
  keywords: ['shapes', 'starknet', 'game', 'exploration'],
  icons: {
    icon: '/media/favicon.svg',
  },
  openGraph: {
    title: 'Shapes: a Starknet exploration',
    description: `Solve ${GAME_CONFIG.SHAPES_PER_GAME} shapes, once a day`,
    images: [
      {
        url: '/media/og/og-default.png',
        width: 2000,
        height: 1400,
        alt: 'Shapes: a Starknet exploration'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shapes: a Starknet exploration',
    description: `Solve ${GAME_CONFIG.SHAPES_PER_GAME} shapes, once a day`,
    images: ['/media/og/og-default.png'],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarknetProvider>
            {children}
        </StarknetProvider>
      </body>
    </html>
  );
}
