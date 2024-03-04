'use client'

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import 'blocknote/core/style.css';

interface EditorProps {
  initialContent?: string;
  editable?: boolean;
  onChange: (value: string) => void;
};

export function Editor({
  initialContent,
  editable,
  onChange
}: EditorProps) {
  return (
    <div>
      Editor
    </div>
  )
}