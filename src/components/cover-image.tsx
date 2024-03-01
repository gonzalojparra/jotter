'use client'

import Image from 'next/image';
import { useCoverImage } from '@/hooks/use-cover-image';

import { cn } from '@/lib/utils';

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
            onClick={coverImage.onOpen}
            className='text-muted-foreground text-xs'
          >
            <ImageIcon className='h-4 w-4 mr-2' />
            Change cover
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => { }}
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