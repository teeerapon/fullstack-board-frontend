import { useState } from 'react'

type CommentEditorProps = {
  initialValue: string
  onCancel: () => void
  onSave: (newContent: string) => void
}

export function CommentEditor({
  initialValue,
  onCancel,
  onSave,
}: CommentEditorProps) {
  const [commentText, setCommentText] = useState(initialValue)

  const handlePost = () => {
    if (commentText.trim()) {
      onSave(commentText.trim())
    }
  }

  return (
    <div className="space-y-2">
      <textarea
        className="w-full p-3 border rounded text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-[#5C8374]"
        placeholder="What's on your mind..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-sm rounded bg-[#5C8374] hover:bg-[#4a6e61] text-white"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  )
}
