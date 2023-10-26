import Header from '../components/header.component';
import { fontPoppins, fontMontserrat } from '../lib/fonts';
import { TailwindIndicator } from '../components/tailwind-indicator';
import { Toaster } from 'react-hot-toast';
import { SidebarProvider } from '../components/context/SidebarContext';
import Sidebar from '../components/common/sidebar';
import { TaskContextProvider } from '../components/context/TasksContext';
import type { Metadata } from 'next';
import { NextAuthProvider } from './providers';
import { Analytics } from '@vercel/analytics/react';
import { siteConfig } from '../config/site';
import { fontSans } from '../lib/fonts';
import { cn } from '../lib/utils';
import { SiteHeader } from '../components/site-header';
import { ThemeProvider } from '../components/theme-provider';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${fontMontserrat.variable} ${fontPoppins.variable}`}
    >
      <body
        className={cn(
          'bg-body-light dark:bg-body-dark text-text-light dark:text-text-dark font-montSerrat antialiased'
        )}
      >
        <NextAuthProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {/* <Header /> */}
            <SidebarProvider>
              <TaskContextProvider>
                <SiteHeader />
                <Toaster />
                <div className='flex  w-full gap-5 '>
                  <Sidebar />
                  <main className=' w-full h-full py-5 md:py-10 pt-3 pr-5 scroll-hidden overflow-y-scroll '>
                    {children}
                  </main>
                </div>
              </TaskContextProvider>
            </SidebarProvider>
          </ThemeProvider>
          <Analytics />
        </NextAuthProvider>
      </body>
    </html>
  );
}
