'use client';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { siteConfig } from '../config/site';
import { MoreVertical } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { Icons } from './icons';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';
import { LoginButton, LogoutButton } from './buttons.component';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../utils/task/fetch';

export function SiteHeader() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
  const unreadNotifications = notifications?.filter(
    (notification) => !notification.seen
  );
  const unread = unreadNotifications?.length ?? 0;
  return (
    <header className='bg-body-light dark:bg-body-dark text-main-light bg-opacity-80 sticky top-0 z-40 w-full border-b border-cool-light/30 py-2 shadow-cool-light shadow-sl'>
      <div className='px-5 py-4 flex items-center space-x-4 sm:justify-between sm:space-x-0'>
        <MainNav />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-1'>
            <ThemeToggle />
            <Link
              href={'/notifications'}
              className='relative hover:bg-accent hover:text-accent-foreground  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background h-9 px-3 rounded-md'
            >
              <Icons.notification className='h-5 w-5' />
              {unread > 0 && (
                <span className='absolute right-1 top-0 border-none w-4 h-4 rounded-full bg-red-900  text-white font-bold text-xs font-mono'>
                  {unread}
                </span>
              )}
              <span className='sr-only'>notifications</span>
            </Link>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className='md:hidden'>
                <MoreVertical />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className='w-fit 
                  bg-second-light dark:bg-second-dark px-5 py-3
                  rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] :animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]'
                  sideOffset={13}
                >
                  <DropdownMenu.Item>
                    <Link
                      href={siteConfig.links.github}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div
                        className={buttonVariants({
                          size: 'sm',
                          variant: 'ghost',
                        })}
                      >
                        <Icons.gitHub className='h-5 w-5' />
                        <span className='pl-2'>GitHub</span>
                      </div>
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Link
                      href={siteConfig.links.twitter}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div
                        className={buttonVariants({
                          size: 'sm',
                          variant: 'ghost',
                        })}
                      >
                        <Icons.twitter className='h-5 w-5 fill-current' />
                        <span className='pl-2'>Twitter</span>
                      </div>
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    {' '}
                    <LoginButton />
                    <LogoutButton />
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <div className='hidden md:flex items-center'>
              <Link
                href={siteConfig.links.github}
                target='_blank'
                rel='noreferrer'
              >
                <div
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  <Icons.gitHub className='h-5 w-5' />
                  <span className='sr-only'>GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target='_blank'
                rel='noreferrer'
              >
                <div
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  <Icons.twitter className='h-5 w-5 fill-current' />
                  <span className='sr-only'>Twitter</span>
                </div>
              </Link>
              <LoginButton />
              <LogoutButton />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
