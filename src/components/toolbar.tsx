'use client'

import { Doc } from '@/../convex/_generated/dataModel';

interface ToolbarProps {
  initialData: Doc<'documents'>;
  preview?: boolean;
};

export function Toolbar({
  initialData,
  preview
}: ToolbarProps) {
  return (
    <div>Toolbar</div>
  )
}