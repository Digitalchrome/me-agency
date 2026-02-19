import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import MotionProvider from '@/components/MotionProvider';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/SEO/JsonLd';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

/**
 * Métadonnées du site pour SEO
 * Site metadata for SEO
 */
export const metadata: Metadata = {
  title: {
    default: "ME Modeling Agency | Humanity's Modeling Agency",
    template: '%s | ME Agency',
  },
  description:
    "ME Modeling Agency - Humanity's modeling agency. Celebrating diversity and making differences our strength. Discover our inclusive roster of professional models for fashion, editorial, and commercial projects.",
  keywords: [
    'modeling agency',
    'fashion models',
    'professional models',
    'editorial models',
    'commercial models',
  ],
  authors: [{ name: 'ME Modeling Agency' }],
  creator: 'ME Modeling Agency',
  publisher: 'ME Modeling Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://me-agency.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://me-agency.com',
    title: "ME Modeling Agency | Humanity's Modeling Agency",
    description: 'Celebrating diversity. Making differences our strength.',
    siteName: 'ME Modeling Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ME Modeling Agency',
    description: "Humanity's modeling agency. Celebrating diversity.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased overflow-x-hidden selection:bg-electric-blue selection:text-white">
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />

            {/* Main content with MotionProvider */}
            <main className="pt-20 flex-grow">
              <MotionProvider>{children}</MotionProvider>
            </main>

            {/* Footer / Pied de page */}
            <Footer />
            <CookieBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
