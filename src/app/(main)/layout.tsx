'use client'

import { redirect } from 'next/navigation';
import { useConvexAuth } from 'convex/react';

import Navigation from './_components/navigation';

import { Spinner } from '@/components/spinner';
import { SearchCommand } from '@/components/search-command';

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return (
    <div className='h-full flex bg-background'>
      <Navigation />
      <main className='flex-1 h-full overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  )
}