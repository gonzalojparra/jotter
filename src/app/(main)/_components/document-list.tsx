'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';

import { Doc, Id } from '@/../convex/_generated/dataModel';
import { api } from '@/../convex/_generated/api';

import Item from './item';
import { FileIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface DocumentListProps {
  parentDocumentId?: Id<'documents'>;
  level?: number;
  data?: Doc<'documents'>[];
}

export default function DocumentList({
  parentDocumentId,
  level = 0
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded(prev => ({
      ...prev,
      [documentId]: !prev[documentId]
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${(level * 12) + 12}px` : '12px'
        }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            expanded={expanded[document._id]}
            onClick={() => onRedirect(document._id)}
            onExpand={() => onExpand(document._id)}
          />
          {/*
            If the document is expanded, render the DocumentList component with the parentDocumentId set to the current document's _id.
            This will render a new list of documents that are children of the current document. 
          */}
          {expanded[document._id] && (
            <DocumentList
              parentDocumentId={document._id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  )
}