'use client'

import { ElementRef, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePathname } from 'next/navigation';

import { ChevronsLeftIcon, MenuIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div
          role='button'
          className={cn(
            'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
            isMobile && 'opacity-100'
          )}
        >
          <ChevronsLeftIcon className='h-6 w-6' />
        </div>
        <div>
          <p>Action items</p>
        </div>
        <div className='mt-4'>
          <p>Documents</p>
        </div>
        <div
          onMouseDown={() => {}}
          onClick={() => {}}
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
        />
      </aside>
      {/*
        The navbar is going to have to follow the width and collapse
        Everything that the sidebar does it's going to have to be in sync with the navbar
      */}
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[99999] left-60 w-[calc(100%-60px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && <MenuIcon role='button' className='h-6 w-6 text-muted-foreground' />}
        </nav>
      </div>
    </>
  )
}