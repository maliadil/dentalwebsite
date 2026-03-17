import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'BrightSmile Dental Clinic – Expert Dental Care',
    template: '%s | BrightSmile Dental Clinic',
  },
  description:
    'BrightSmile Dental Clinic offers world-class dental care including teeth whitening, implants, orthodontics, and cosmetic dentistry. Book your appointment today.',
  keywords: [
    'dental clinic', 'dentist', 'teeth whitening', 'dental implants',
    'orthodontics', 'braces', 'root canal', 'cosmetic dentistry', 'family dentist',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BrightSmile Dental Clinic',
    title: 'BrightSmile Dental Clinic – Expert Dental Care',
    description: 'Compassionate, expert dental care for the whole family.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrightSmile Dental Clinic',
    description: 'Compassionate, expert dental care for the whole family.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Global AI Chat Widget */}
        <ChatBot />
      </body>
    </html>
  );
}
