import * as React from 'react';
import Link from 'next/link';

import { siteConfig } from '../config/site';
// import { cn } from '../lib/utils';
import { Icons } from './icons';
import SideBarToggle from './ui/sidebar-toggle';

export function MainNav() {
  return (
    <div className='flex gap-3 md:gap-4'>
      <SideBarToggle />
      <Link href='/' className='flex items-center space-x-2'>
        <Icons.logo className='h-6 w-6' />

        <span className='inline-block font-bold text-sm md:text-lg'>
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}
