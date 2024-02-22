'use client'

import { useScrollTop } from '@/hooks/use-scroll-top';

import { ThemeToggle } from '@/components/theme-toggle';
import Logo from './logo';

import { cn } from '@/lib/utils';

export default function Navbar() {
  const scroll = useScrollTop();

  return (
    <div className={cn(
      'z-50 bg-background fixed top-0 flex items-center w-full p-6',
      scroll && 'border-b shadow-sm'
    )}>
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        <ThemeToggle />
      </div>
    </div>
  )
}