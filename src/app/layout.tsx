import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from 'sonner';

import { ConvexClientProvider } from '@/components/providers/convex-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jotter',
  description: 'A simple note-taking app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            storageKey='jotter-theme'
            enableSystem
          >
            <Toaster position='bottom-center' richColors />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
