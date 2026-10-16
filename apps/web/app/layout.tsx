import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/layout/CartDrawer';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { FloatingWhatsApp } from '../components/common/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Umer Electronics — Smart Tech & Modern Living',
  description: 'Enterprise full-stack electronic store with official warranty, express nationwide shipping, and premium laptops, smartphones, TVs, and appliances.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col pb-16 md:pb-0">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
            <FloatingWhatsApp />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
