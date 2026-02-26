import type { Metadata } from 'next';
import { Sora, Source_Sans_3, IBM_Plex_Mono } from 'next/font/google';
import { Navbar } from '@/components/shell/navbar';
import { Footer } from '@/components/shell/footer';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['200', '300', '400', '600', '700'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Design System Showcase',
  description:
    'Interactive design analysis platform for exploring, inspecting, and comparing frontend design systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
