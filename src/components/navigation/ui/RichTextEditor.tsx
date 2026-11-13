import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import {useEffect} from "react"

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

const RichTextEditor = ({
  value,
  onChange,
  // placeholder = "Start writing...",
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value,

    onUpdate: ({editor}) => {
      onChange(editor.getHTML())
    },

    editorProps: {
      attributes: {
        class:
          "min-h-40 p-3 outline-none text-sm [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1",
      },
    },
  })

  if (!editor) return null

  const buttonStyle = (active: boolean) =>
    `px-3 py-1.5 rounded text-sm font-medium cursor-pointer transition ${
      active
        ? "bg-indigo-100 text-indigo-700"
        : "text-slate-600 hover:bg-slate-100"
    }`

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value || "")
    }
  }, [editor, value])

  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-indigo-500">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50 p-2">
        <button
          type="button"
          title="Bold"
          className={buttonStyle(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </button>

        <button
          type="button"
          title="Italic"
          className={buttonStyle(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </button>

        <button
          type="button"
          title="Underline"
          className={buttonStyle(editor.isActive("underline"))}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </button>

        <div className="mx-1 h-5 border-l border-slate-300" />

        <button
          type="button"
          title="Heading 2"
          className={buttonStyle(editor.isActive("heading", {level: 2}))}
          onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
        >
          H2
        </button>

        <button
          type="button"
          title="Bullet List"
          className={buttonStyle(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>

        <button
          type="button"
          title="Numbered List"
          className={buttonStyle(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>

        {/* <div className="mx-1 h-5 border-l border-slate-300" /> */}

        {/* <button
          type="button"
          title="Undo"
          className={buttonStyle(false)}
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          ↶
        </button>

        <button
          type="button"
          title="Redo"
          className={buttonStyle(false)}
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          ↷
        </button> */}
      </div>

      {/* Editable Content */}
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor
