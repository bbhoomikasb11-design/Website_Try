import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" className="dark">
      <body className="bg-[#0B0E14] text-[#F4F1EA] antialiased selection:bg-[#D98C4A]/30 selection:text-[#E8A85C]">
        {children}
      </body>
    </html>
  );
}
