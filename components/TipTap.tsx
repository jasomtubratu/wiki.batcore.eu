'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Heading from '@tiptap/extension-heading';
import {
  IconBold, IconItalic, IconUnderline, IconStrikethrough, IconCode,
  IconLink, IconHighlight, IconQuote, IconH1, IconH2, IconH3,
} from '@tabler/icons-react';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/react';

const BUTTON_CONFIG = [
  { icon: IconBold, command: 'toggleBold', isActive: 'bold' },
  { icon: IconItalic, command: 'toggleItalic', isActive: 'italic' },
  { icon: IconUnderline, command: 'toggleUnderline', isActive: 'underline' },
  { icon: IconStrikethrough, command: 'toggleStrike', isActive: 'strike' },
  { icon: IconCode, command: 'toggleCode', isActive: 'code' },
  { icon: IconH1, command: 'toggleHeading', isActive: 'heading', level: 1 },
  { icon: IconH2, command: 'toggleHeading', isActive: 'heading', level: 2 },
  { icon: IconH3, command: 'toggleHeading', isActive: 'heading', level: 3 },
  { icon: IconHighlight, command: 'toggleHighlight', isActive: 'highlight' },
  { icon: IconQuote, command: 'toggleBlockquote', isActive: 'blockquote' },
];

export default function EnhancedDarkTiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Link.configure({ openOnClick: false }),
      Image,
      Underline,
      Highlight,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: '<p>Hello World!</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full mx-auto px-4 rounded-lg shadow-lg">
      <div className="mb-4 flex flex-wrap gap-2 p-2 rounded-md">
        {BUTTON_CONFIG.map(({ icon: Icon, command, isActive, level }) => (
          <Button
            key={command + (level || '')}
            aria-label={`Toggle ${command}`}
            className={`${editor.isActive(isActive, { level }) ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
            disabled={!editor.can().chain().focus()[command]({ level }).run()}
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus()[command]({ level }).run()}
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <Divider className="my-4" />
      <EditorContent
        className="min-h-[200px] border border-gray-700 rounded-md p-4"
        editor={editor}
      />
    </div>
  );
}
