'use client';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { siteConfig } from '../config/site';
import { MoreVertical } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { Icons } from './icons';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';
import { LoginButton, LogoutButton } from './buttons.component';
import useNotification from './hooks/useNotification';
import Notifications from './notifications';

export function SiteHeader() {
  return (
    <header className='bg-main-light text-text-light bg-opacity-80 sticky top-0 z-40 w-full border-b'>
      <div className='px-5 py-4 flex items-center space-x-4 sm:justify-between sm:space-x-0'>
        <MainNav />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-1'>
            <ThemeToggle />
            <Notifications />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className='md:hidden'>
                <MoreVertical />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className='w-fit 
                  bg-second-light dark:bg-second-dark px-5 py-3
                  rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] :animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
                  sideOffset={5}
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
                        <span className='sr-only'>GitHub</span>
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
                        <span className='sr-only'>Twitter</span>
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
