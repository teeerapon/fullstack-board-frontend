'use client'

import { useEffect } from 'react'

export function CommentDialog({
  isOpen,
  onClose,
  onPost,
  onCancel,
  commentText,
  setCommentText,
}: {
  isOpen: boolean
  onClose: () => void
  onPost: () => void
  onCancel: () => void
  commentText: string
  setCommentText: (text: string) => void
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4 mx-4">
        <h2 className="text-lg font-semibold text-gray-800">Add a Comment</h2>
        <textarea
          className="w-full p-3 border rounded text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-[#5C8374]"
          placeholder="What's on your mind..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setCommentText('')
              onCancel()
              onClose()
            }}
            className="w-full px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onPost()
              onClose()
            }}
            className="w-full px-4 py-2 text-sm rounded bg-[#5C8374] hover:bg-[#4a6e61] text-white"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
