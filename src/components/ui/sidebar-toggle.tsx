'use client';
import { Button } from './button';
import { Menu } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

export default function SideBarToggle() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      size={'sm'}
      onClick={toggleSidebar}
      variant={'outline'}
      className='border-cool-light'
    >
      <Menu />
    </Button>
  );
}
