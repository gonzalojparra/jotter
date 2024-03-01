'use client'

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
};

export function CoverImage({
  url,
  preview
}: CoverImageProps) {
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
    </div>
  )
}