'use client'

import Link from 'next/link';
import { useConvexAuth } from 'convex/react';
import { useScrollTop } from '@/hooks/use-scroll-top';

import { Button } from '@/components/ui/button';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import { ThemeToggle } from '@/components/theme-toggle';
import Logo from './logo';

import { cn } from '@/lib/utils';

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scroll = useScrollTop();

  return (
    <div className={cn(
      'z-50 bg-background fixed top-0 flex items-center w-full p-6',
      scroll && 'border-b shadow-sm'
    )}>
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button variant='ghost' size='sm'>Log in</Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button size='sm'>Get Jotter free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/documents'>Enter Jotter</Link>
            </Button>
            <UserButton afterSignOutUrl='/' />
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  )
}