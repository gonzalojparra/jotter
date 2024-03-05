'use client'

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import { useTheme } from 'next-themes';

import { useEdgeStore } from '@/lib/edgestore';

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
  const { edgestore } = useEdgeStore();

  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file
    });

    return res.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent:
      initialContent
      ? JSON.parse(initialContent)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload
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