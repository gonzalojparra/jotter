'use client'

import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import { api } from '@/../convex/_generated/api';

import { Button } from '@/components/ui/button';

import { PlusCircle } from 'lucide-react';

export default function DocumentsPage() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const handleCreateNote = () => {
    const promise = create({ title: 'Untitled' });
    toast.promise(promise, {
      loading: 'Creating note...',
      success: 'Note created!',
      error: 'Failed to create note.',
    });
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        src='/empty.png'
        alt='Empty'
        className='dark:hidden'
        height={300}
        width={300}
      />
      <Image
        src='/empty-dark.png'
        alt='Empty'
        className='hidden dark:block'
        height={300}
        width={300}
      />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Jotter!
      </h2>
      <Button onClick={handleCreateNote}>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  )
}