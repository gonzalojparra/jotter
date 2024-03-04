'use client'

import Image from 'next/image';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { useEdgeStore } from '@/lib/edgestore';

import { Button } from '@/components/ui/button';
import { ImageIcon, X } from 'lucide-react';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
};

export function CoverImage({
  url,
  preview
}: CoverImageProps) {
  const coverImage = useCoverImage();
  const params = useParams();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const { edgestore } = useEdgeStore();

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url
      });
    }
    removeCoverImage({
      id: params.documentId as Id<'documents'>
    });
  }

  return (
    <div className={cn(
      'relative w-full h-[35vh] group',
      !url && 'h-[12vh]',
      url && 'bg-muted'
    )}>
      {!!url && (
        <Image
          src={url}
          fill
          alt='Cover Image'
          className='object-cover'
        />
      )}
      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => coverImage.onReplace(url)}
            className='text-muted-foreground text-xs'
          >
            <ImageIcon className='h-4 w-4 mr-2' />
            Change cover
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={onRemove}
            className='text-muted-foreground text-xs'
          >
            <X className='h-4 w-4 mr-2' />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}