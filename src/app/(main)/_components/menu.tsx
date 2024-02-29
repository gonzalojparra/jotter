'use client'

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';

import { Id } from '@/../convex/_generated/dataModel';
import { api } from '@/../convex/_generated/api';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { MoreHorizontal, Trash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface MenuProps {
  documentId: Id<'documents'>;
}

export default function Menu({ documentId }: MenuProps) {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: 'Moving to trash...',
      success: 'Moved to trash',
      error: 'Failed to move to trash'
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='ghost'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-60'
        align='end'
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className='h-4 w-4 mr-2' />
          Move to trash
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className='text-xs text-muted-foreground p-2'>
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className='h-10 w-10' />
  )
}