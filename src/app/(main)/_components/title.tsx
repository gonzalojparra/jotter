'use client'

import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';

import { api } from '@/../convex/_generated/api';
import { Doc } from '@/../convex/_generated/dataModel';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TitleProps {
  initialData: Doc<'documents'>
};

export default function Title({ initialData }: TitleProps) {
  const update = useMutation(api.documents.update);
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData.title || 'Untitled');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input className='h-7 px-2 focus-visible:ring-transparent' />
      ) : (
        <Button
          className='font-normal h-auto p-1'
          variant='ghost'
          size='sm'
          onClick={() => { }}
        >
          <span className='truncate'>
            {initialData.title}
          </span>
        </Button>
      )}
    </div>
  )
}