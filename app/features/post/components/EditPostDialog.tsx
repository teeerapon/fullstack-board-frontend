'use client'

import { useEffect, useState } from 'react'
import { Category } from '../models/Category'
import { GetAllCategory } from '../usecases/AllCommunication'
import { Post } from '../models/Post'

export function EditPostDialog({
  isOpen,
  onClose,
  onSave,
  onCancel,
  areaPost,
  setAreaPost,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
  areaPost: Post
  setAreaPost: (text: Post) => void
}) {
  const [category, setCategory] = useState<Category[]>([])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  useEffect(() => {
    GetAllCategory().then((data) => {
      setCategory([...data])
    })
  }, [])


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4 mx-4">
        <h2 className="text-lg font-semibold text-gray-800">Edit Post</h2>

        {/* Category select */}
        <div className="relative w-full md:w-auto">
          <select
            className="w-auto p-3 border rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5C8374]"
            value={areaPost.category}
            onChange={(e) => setAreaPost({ ...areaPost, category: e.target.value })}
          >
            <option disabled value="">Choose a community</option>
            {category.map((com) => (
              <option key={com.id} value={com.title}>
                {com.title}
              </option>
            ))}
          </select>
        </div>

        {/* Title input */}
        <input
          className="w-full p-3 border rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5C8374]"
          placeholder="Post title"
          value={areaPost.title}
          onChange={(e) => setAreaPost({ ...areaPost, title: e.target.value })}
        />

        {/* Content textarea */}
        <textarea
          className="w-full p-3 border rounded text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-[#5C8374]"
          placeholder="What's on your mind..."
          value={areaPost.content}
          onChange={(e) => setAreaPost({ ...areaPost, content: e.target.value })}
          rows={4}
        />

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              onCancel()
              onClose()
            }}
            className="w-full px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave()
              onClose()
            }}
            className="w-full px-4 py-2 text-sm rounded bg-[#5C8374] hover:bg-[#4a6e61] text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
