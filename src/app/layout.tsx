import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import './globals.css';

// Load Fraunces Variable Serif Font for Headlines
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

// Load Plus Jakarta Sans Variable Font for Body & UI
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Load Space Mono for Numerals and Data
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mini Web Solutions — Product Design & Software Engineering Studio',
  description:
    'We partner with founders on product design and software engineering. Single-page scroll-driven 3D experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${fraunces.variable} ${jakarta.variable} ${spaceMono.variable}`}
    >
      <body className="bg-[#0B0E14] text-[#F4F1EA] antialiased selection:bg-[#D98C4A]/30 selection:text-[#E8A85C] md:cursor-none">
        {children}
      </body>
    </html>
  );
}
