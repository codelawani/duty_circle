'use client';
import { siteConfig } from '@/src/config/site';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { useSidebar } from '../context/SidebarContext';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
}

export default function Sidebar() {
  const { showSidebar } = useSidebar();
  const path = usePathname();
  return (
    <div
      className={cn(
        'relative bg-second-light dark:bg-second-dark h-screen py-5 min-w-[4rem] md:min-w-fit rounded-e-2xl'
      )}
    >
      {' '}
      {siteConfig.mainNav?.length ? (
        <nav
          className={cn(
            'md:flex flex-col gap-6 group z-30 hidden h-full px-2 hover:min-w-[12rem]  rounded-e-2xl',
            showSidebar ? 'min-w-[12rem]' : ''
          )}
        >
          {siteConfig.mainNav?.map((item: NavItem, index) => {
            const isActive = path === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'text-muted-foreground flex items-center text-sm font-medium capitalize gap-4 px-2 py-1',
                  item.disabled && 'cursor-not-allowed opacity-80',
                  isActive &&
                    'rounded-lg bg-main-light font-semibold text-white'
                )}
              >
                <span className={''}>
                  <item.icon />
                </span>
                <span
                  className={cn(
                    showSidebar ? 'flex' : 'hidden',
                    'group-hover:flex'
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      ) : null}
      {siteConfig.mainNav?.length ? (
        <nav
          className={cn(
            'absolute top-0 py-5 flex flex-col gap-6 group z-30 bg-inherit h-full px-2 md:hidden rounded-e-2xl',
            showSidebar ? 'min-w-[12rem]' : 'w-fit'
          )}
        >
          {siteConfig.mainNav?.map((item: NavItem, index) => {
            const isActive = path === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'text-muted-foreground flex items-center text-sm font-medium capitalize gap-4 px-2 py-1',
                  item.disabled && 'cursor-not-allowed opacity-80',
                  isActive && 'rounded-lg bg-main-light'
                )}
              >
                <span>
                  <item.icon />
                </span>
                <span
                  className={cn(
                    showSidebar ? 'flex' : 'hidden',
                    'group-hover:flex'
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
