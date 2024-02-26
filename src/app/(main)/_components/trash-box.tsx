'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { toast } from 'sonner';

import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { Spinner } from '@/components/spinner';

export default function ThrashBox() {
  const router = useRouter();
  const params = useParams();
  const [search, setSearch] = useState('');

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<'documents'>) => {
    e.stopPropagation();

    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring...',
      success: 'Restored',
      error: 'Failed to restore'
    });
  };

  const onRemove = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: 'Removing...',
      success: 'Removed',
      error: 'Failed to remove'
    });

    if (params.documentId === documentId) {
      router.push('/documents');
    }

    if (documents === undefined) {
      return (
        <div className='h-full flex items-center justify-center p-4'>
          <Spinner size='lg' />
        </div>
      )
    }
  };

  return (
    <div>Thrash</div>
  )
}