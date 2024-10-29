'use client'

import { useCallback, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Heading from '@tiptap/extension-heading'
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconCode, 
         IconLink, IconHighlight, IconQuote, IconPhoto, IconH1, IconH2, IconH3,
         IconTable, IconColumnInsertLeft, IconColumnInsertRight, IconRowInsertTop, IconRowInsertBottom } from '@tabler/icons-react'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/react'

export default function EnhancedDarkTiptapEditor() {


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable to use custom Heading extension
      }),
      Link.configure({ openOnClick: false }),
      Image,
      Underline,
      Highlight,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: '<p>Hello World!</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })


  if (!editor) {
    return null
  }

  return (
    <div className="w-full mx-auto px-4 rounded-lg shadow-lg">
      <div className="mb-4 flex flex-wrap gap-2 p-2 rounded-md">
        <Button
          aria-label="Toggle bold"
          className={`${editor.isActive('bold') ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <IconBold className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle italic"
          className={`${editor.isActive('italic') ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <IconItalic className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle underline"
          className={`${editor.isActive('underline') ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <IconUnderline className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle strikethrough"
          className={`${editor.isActive('strike') ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <IconStrikethrough className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle code"
          className={`${editor.isActive('code') ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <IconCode className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle heading 1"
          className={`${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <IconH1 className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle heading 2"
          className={`${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <IconH2 className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle heading 3"
          className={`${editor.isActive('heading', { level: 3 }) ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <IconH3 className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle highlight"
          className={`${editor.isActive('highlight') ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleHighlight().run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <IconHighlight className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Toggle blockquote"
          className={`${editor.isActive('blockquote') ? 'bg-gray-700' : ''} text-white hover:bg-gray-700 hover:text-white`}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <IconQuote className="h-4 w-4" />
        </Button>
        
      </div>
      <Divider  className='my-4'/>
      <EditorContent 
        className="min-h-[200px] border border-gray-700 rounded-md p-4" 
        editor={editor} 
      />
    </div>
  )
}