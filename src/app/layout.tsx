import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PlanProvider } from '../context/PlanContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'A dark, no-nonsense gym companion: pick a lift, lock it into todays plan, and watch the weeks work add up.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-[#090a0f] text-white flex flex-col min-h-screen antialiased`}>
        <PlanProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}