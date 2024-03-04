'use client'

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import { useTheme } from 'next-themes';

import '@blocknote/react/style.css';

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
  const { resolvedTheme } = useTheme();
  
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent:
      initialContent
      ? JSON.parse(initialContent) as PartialBlock[]
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    }
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={theme}
      />
    </div>
  )
}