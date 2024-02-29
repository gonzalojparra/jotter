'use client'

import { ElementRef, useRef, useState } from 'react';
import { useMutation } from 'convex/react';

import { Doc } from '@/../convex/_generated/dataModel';
import { api } from '@/../convex/_generated/api';

import { Button } from '@/components/ui/button';
import { IconPicker } from './icon-picker';
import { ImageIcon, Smile, X } from 'lucide-react';

interface ToolbarProps {
  initialData: Doc<'documents'>;
  preview?: boolean;
};

export function Toolbar({
  initialData,
  preview
}: ToolbarProps) {
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);

  const enableInputs = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || 'Untitled'
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      disableInput();
    }
  };

  return (
    <div className='pl-[54px] group relative'>
      {/* Owner */}
      {!!initialData.icon && !preview && (
        <div className='flex items-center gap-x-2 group/icon pt-6'>
          <IconPicker onChange={() => { }}>
            <p className='text-6xl hover:opacity-75 transition'>
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs'
            onChange={() => { }}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      )}
      {/* Guest */}
      {!!initialData.icon && preview && (
        <p className='text-6xl pt-6'>
          {initialData.icon}
        </p>
      )}
      <div className='opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4'>
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={() => { }}>
            <Button
              variant='outline'
              size='sm'
              className='text-muted-foreground text-xs'
            >
              <Smile className='h-4 w-4 mr-2' />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            variant='outline'
            size='sm'
            className='text-muted-foreground text-xs'
            onClick={() => {}}
          >
            <ImageIcon className='h-4 w-4 mr-2' />
            Add cover
          </Button>
        )}
      </div>
    </div>
  )
}