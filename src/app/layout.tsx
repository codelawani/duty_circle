import type { Metadata } from 'next';
// import { Inter } from "next/font/google";
import Header from '../components/header.component';
import { NextAuthProvider } from './providers';
import { Analytics } from '@vercel/analytics/react';
import { siteConfig } from '../config/site';
import { fontPoppins } from '../lib/fonts';
import { cn } from '../lib/utils';
import { SiteHeader } from '../components/site-header';
import { ThemeProvider } from '../components/theme-provider';
import { TailwindIndicator } from '../components/tailwind-indicator';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { SidebarProvider } from '../components/context/SidebarContext';
import Sidebar from '../components/common/sidebar';
import { TaskContextProvider } from '../components/context/TasksContext';

// const inter = Inter({ subsets: ["latin"] });
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
    <html lang='en'>
      <body
        className={cn(
          'bg-body-light dark:bg-body-dark text-text-light dark:text-text-dark font-sans antialiased',
          fontPoppins.className
        )}
      >
        <NextAuthProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {/* <Header /> */}
            <SidebarProvider>
              <TaskContextProvider>
                <div className='relative h-screen overflow-hidden'>
                  <SiteHeader />
                  <Toaster />
                  <div className='flex h-screen w-full gap-5'>
                    <Sidebar />
                    <main className='overflow-y-scroll w-full scroll-hidden h-full pb-20 pt-3 pr-5'>
                      {children}
                    </main>
                  </div>
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
