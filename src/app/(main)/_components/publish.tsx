'use client'

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useOrigin } from '@/hooks/use-origin';

import { Doc } from '@/../convex/_generated/dataModel';
import { api } from '@/../convex/_generated/api';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { Check, Copy, Globe } from 'lucide-react';

interface PublishProps {
  initialData: Doc<'documents'>;
}

export default function Publish({
  initialData
}: PublishProps) {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true
    })
      .finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Publishing document...',
      success: 'Document published',
      error: 'Failed to publish document'
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false
    })
      .finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Unpublishing document...',
      success: 'Document unpublished',
      error: 'Failed to unpublish document'
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm' variant='ghost'>
          Publish
          {initialData.isPublished && (
            <Globe className='w-4 h-4 ml-2' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-72'
        align='end'
        alignOffset={8}
        forceMount
      >
        {initialData.isPublished ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
              <Globe className='h-4 w-4 text-muted-foreground animate-pulse' />
              <p className='text-xs font-medium'>
                This note is live on the web!
              </p>
            </div>
            <div className='flex items-center'>
              <input
                disabled
                value={url}
                className='flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate'
              />
              <Button
                disabled={copied}
                onClick={onCopy}
                className='h-8 rounded-l-none'
              >
                {copied ? (
                  <Check className='w-4 h-4' />
                ) : (
                  <Copy className='w-4 h-4' />
                )}
              </Button>
            </div>
            <Button
              size='sm'
              className='w-full text-xs'
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Globe className='h-8 w-8 text-muted-foreground mb-2' />
            <p className='text-sm font-medium mb-2'>Publish this document</p>
            <span className='text-xs text-muted-foreground mb-4'>Share your notes with others.</span>
            <Button
              size='sm'
              disabled={isSubmitting}
              onClick={onPublish}
              className='w-full text-xs'
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}