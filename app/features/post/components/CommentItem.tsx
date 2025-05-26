import { useState } from 'react'
import { Comment } from '../models/Comment'
import { CommentEditor } from './CommentEditor'
import Swal from 'sweetalert2'
import { deleteComment, updateComment } from '../usecases/AllComments'

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

function getShortTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return '1m ago'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function CommentItem({
  comment,
  author,
  onDelete,
  onUpdate,
}: {
  comment: Comment
  author: string
  onDelete: (id: string) => void
  onUpdate: (updatedComment: Comment) => void
}) {
  const isOwner = comment.author === author
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = async (newContent: string) => {
    try {
      const updated = await updateComment({ ...comment, content: newContent })
      onUpdate(updated)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update comment:', error)
      Swal.fire('Error', 'Could not update the comment', 'error')
    }
  }

  const handleDelete = async (commentId: string) => {
    const result = await Swal.fire({
      title: 'Please confirm if you wish to delete the comment',
      text: `Are you sure you want to delete the comment "${commentId}"? Once deleted, it cannot be recovered.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Delete',
    })

    if (result.isConfirmed) {
      try {
        await deleteComment(commentId)
        onDelete(commentId)
        Swal.fire({
          icon: 'success',
          title: 'Comment deleted successfully',
          timer: 1000,
          showConfirmButton: false,
        })
      } catch (err: unknown) {
        interface ErrorResponse {
          response?: {
            data?: {
              message?: string;
            };
          };
        }
        const errorObj = err as ErrorResponse;
        console.error(errorObj);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถส่งคอมเมนต์ได้', 'error');
      }
    }
  }

  return (
    <div className="flex gap-3 mb-6">
      <img
        src={comment.avatar}
        alt={comment.author}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-stretch text-sm font-bold text-gray-700 gap-4">
          <span>{truncate(comment.author, 20)}</span>
          <span className="text-xs text-gray-400">
            {getShortTimeAgo(new Date(comment.createdAt))}
          </span>
        </div>

        {isEditing ? (
          <CommentEditor
            initialValue={comment.content}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
          />
        ) : (
          <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
        )}

        {isOwner && !isEditing && (
          <div className="flex gap-2 mt-2 text-xs text-blue-500">
            <button onClick={() => setIsEditing(true)} className="hover:underline">
              Edit
            </button>
            <button onClick={() => handleDelete(comment.id)} className="hover:underline text-red-500">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
