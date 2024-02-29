'use client'

import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';

import { Id } from '@/../convex/_generated/dataModel';
import { api } from '@/../convex/_generated/api';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/modals/confirm-modal';

interface BannerProps {
  documentId: Id<'documents'>;
};

export default function Banner({ documentId }: BannerProps) {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: 'Removing...',
      success: 'Document removed',
      error: 'Failed to remove document'
    });

    router.push('/documents');
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring...',
      success: 'Document restored',
      error: 'Failed to restore document'
    });
  };

  return (
    <div className='w-full bg-primary text-center text-sm p-2 text-white flex items-center justify-center gap-x-2 font-semibold'>
      <p>This document is in the thrash.</p>
      <Button
        size='sm'
        onClick={onRestore}
        variant='outline'
        className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-semibold'
      >
        Restore document
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size='sm'
          variant='outline'
          className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-semibold'
        >
          Remove forever
        </Button>
      </ConfirmModal>
    </div>
  )
}