import * as React from 'react';
import Link from 'next/link';

import { siteConfig } from '../config/site';
// import { cn } from '../lib/utils';
import { Icons } from './icons';
import SideBarToggle from './ui/sidebar-toggle';

export function MainNav() {
  return (
    <div className='flex gap-3 md:gap-10'>
      <SideBarToggle />
      <Link href='/' className='flex items-center space-x-2'>
        <Icons.logo className='h-6 w-6' />
        <span className='inline-block font-bold'>{siteConfig.name}</span>
      </Link>
      {/* {items?.length ? (
        <nav className='flex gap-6'>
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'text-muted-foreground flex items-center text-sm font-medium capitalize',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null} */}
    </div>
  );
}
