'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Button } from './ui/button';
import { Icons } from './icons';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Icons.sun className='rotate-0 dark:scale-100 transition-all dark:-rotate-90 scale-0' />
      <Icons.moon className='absolute rotate-90 scale-100 transition-all dark:rotate-0 dark:scale-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
