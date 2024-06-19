'use client'

import { useConvexAuth } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import { ThemeToggle } from '@/components/theme-toggle';

export function UserOptions() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
      {!isAuthenticated && (
        <SignInButton mode='modal'>
          <Button disabled={isLoading} size='sm'>Get Jotter!</Button>
        </SignInButton>
      )}
      {isAuthenticated && (
        <Button disabled={isLoading} variant='ghost' size='sm' asChild>
          <Link href='/documents'>Enter Jotter</Link>
        </Button>
      )}
      <ThemeToggle />
    </div>
  )
}