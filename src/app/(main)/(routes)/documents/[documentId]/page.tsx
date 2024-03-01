'use client'

import { useQuery } from 'convex/react';

import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';

import { Toolbar } from '@/components/toolbar';
import { CoverImage } from '@/components/cover-image';

interface DocumentIdPageProps {
  /* The params variable comes from the dynamic route
  In this way we don't use the 'useParams' hook */
  params: {
    documentId: Id<'documents'>;
  };
};

export default function DocumentIdPage({
  params: { documentId }
}: DocumentIdPageProps) {
  const document = useQuery(api.documents.getById, {
    documentId: documentId
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className='pb-40'>
      <CoverImage url={document.coverImage} />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document} />
      </div>
    </div>
  )
}