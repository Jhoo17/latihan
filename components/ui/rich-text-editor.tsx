'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { 
  Bold, 
  Italic, 
  ImagePlus 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover'
import { useEffect, useState } from 'react'

interface RichTextEditorProps {
  content: any;
  onChange: (content: any) => void;
  uploadedMedia?: Array<{
    id: string;
    url: string;
    title: string;
  }>;
}

export function RichTextEditor({ content, onChange, uploadedMedia = [] }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {
          depth: 10,
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 focus:outline-none'
      }
    }
  })

  if (!isMounted) {
    return <div className="border rounded-lg p-4 min-h-[200px]">Loading editor...</div>
  }

  if (!editor) return null

  const insertMedia = (mediaId: string, url: string) => {
    editor
      .chain()
      .focus()
      .setImage({ 
        src: url,
        'data-asset-id': mediaId 
      })
      .run()
  }

  return (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex gap-2 flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-slate-200' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-slate-200' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>

        {uploadedMedia.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <ImagePlus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid grid-cols-2 gap-2 p-2">
                {uploadedMedia.map((media) => (
                  <div 
                    key={media.id} 
                    className="relative group cursor-pointer"
                    onClick={() => insertMedia(media.id, media.url)}
                  >
                    <img
                      src={media.url}
                      alt={media.title}
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm">Insert</span>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      <EditorContent editor={editor} />
    </div>
  )
} 