'use client'

import { useState, useEffect } from 'react'
import { Post } from '../models/Post'
import { MessageSquare } from 'lucide-react'
import { Comment } from '../models/Comment'
import { createComment, getCommentsByPostId } from '../usecases/AllComments'
import { CommentItem } from './CommentItem'
import { CommentDialog } from './CommentDialog'
import { useAuth } from '@/context/AuthContext'
import Swal from 'sweetalert2'
import { Edit3, Trash2 } from 'lucide-react'
import { EditPostDialog } from '@/features/post/components/EditPostDialog'
import { deletePost, updatePost } from '../usecases/AllPosts'

interface PostCardProps {
  post: Post
  currentUser?: string
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export function PostCard({ post, currentUser, posts, setPosts }: PostCardProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [showComments, setShowComments] = useState(false)
  const [showTextArea, setShowTextArea] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const { signOut, username } = useAuth()
  const isLoggedIn = !!username
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editablePost, setEditablePost] = useState<Post>({
    id: '0',
    title: '',
    content: '',
    category: '',
    avatar: '',
    comments: [],
    author: '',
    createdAt: '',
    commentCount: 0,
  })
  const [isExpanded, setIsExpanded] = useState(false)
  const MAX_LENGTH = 100 // จำนวนตัวอักษรที่จะแสดงแบบย่อ

  const handleShowComments = async () => {
    if (!showComments) {
      const data = await getCommentsByPostId(post.id)
      setComments(data)
      setShowComments(true)
      setShowTextArea(false)
    } else {
      setShowComments(false)
    }
  }

  const handleShowTextArea = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        text: 'You need to login to add comments',
        title: 'Redirecting to login...',
        showConfirmButton: false,
        timer: 1000,
      }).finally(() => signOut())
      return
    }
    setShowTextArea((prev) => !prev)
  }

  const handlePost = async () => {
    try {
      const newComment: Comment = {
        id: '0',
        post_id: post.id,
        content: commentText,
        author: username ?? '',
        createdAt: new Date().toISOString(),
      }
      const savedComment = await createComment(newComment)
      setComments((prev) => [...prev, savedComment])
      Swal.fire('สำเร็จ', 'คอมเมนต์ถูกส่งแล้ว', 'success');
      setCommentText('')
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

  const handleCancel = () => {
    setShowTextArea(false)
  }

  const handleDeletePost = (postId: string) => {
    Swal.fire({
      title: 'Please confirm if you wish to delete the post',
      text: `Are you sure you want to delete the post ${postId} ? Once deleted, it cannot be recovered.`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePost(postId)
          const updatedPosts: Post[] = posts.filter(post => post.id !== postId)
          setPosts(updatedPosts)
          Swal.fire('Deleted!', 'The post has been deleted.', 'success')
        } catch (error) {
          console.error('Failed to delete post:', error)
          Swal.fire('Error', 'Could not delete the post.', 'error')
        }
      }
    })
  }


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])


  const handleEditPost = (postSelect: Post) => {
    setEditablePost({
      id: postSelect.id,
      title: postSelect.title,
      content: postSelect.content,
      category: postSelect.category,
      avatar: postSelect.avatar,
      comments: postSelect.comments,
      author: postSelect.author,
      createdAt: postSelect.createdAt,
      commentCount: postSelect.commentCount,
    })
    setShowEditDialog(true)
  }

  const handleSaveEdit = async () => {
    try {
      const updated = await updatePost(editablePost)
      const updatedPosts = posts.map((p) => (p.id === updated.id ? updated : p))
      setPosts(updatedPosts)
      setEditablePost(updated)
      Swal.fire('สำเร็จ', 'โพสต์ถูกแก้ไขแล้ว', 'success')
    } catch (error) {
      console.error('Failed to update post:', error)
      Swal.fire('Error', 'Could not update the post', 'error')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={post.avatar || '/default-avatar.png'}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-md text-gray-600 font-medium">{post.author}</div>
        {/* Edit/Delete buttons */}
        {post.author === currentUser && (
          <div className="ml-auto flex gap-4">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleEditPost(post)}
              title="Edit post"
            >
              <Edit3 size={16} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeletePost(post.id)}
              title="Delete post"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div>
        <span className="inline-block text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
          {post.category}
        </span>
      </div>

      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p className="text-sm text-gray-600">
        {isExpanded || post.content.length <= MAX_LENGTH ? (
          <>
            {post.content}
            {post.content.length > MAX_LENGTH && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-blue-500 ml-1 hover:underline"
              >
                Show less
              </button>
            )}
          </>
        ) : (
          <>
            {post.content.slice(0, MAX_LENGTH)}...
            <button
              onClick={() => setIsExpanded(true)}
              className="text-blue-500 ml-1 hover:underline"
            >
              Show more
            </button>
          </>
        )}
      </p>

      {/* Comments Toggle */}
      <div
        className="flex items-center text-sm text-gray-500 gap-1 cursor-pointer hover:text-blue-500"
        onClick={handleShowComments}
      >
        <MessageSquare className="w-4 h-4" />
        <span>{post.commentCount ?? comments.length} Comments</span>
      </div>

      {/* Add Comments */}
      {showComments && !showTextArea && (
        <button
          className="border border-[#5C8374] text-[#5C8374] px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-[#5C8374] hover:text-white transition-colors"
          onClick={handleShowTextArea}
        >
          <span>Add Comments</span>
        </button>
      )}

      {showComments && showTextArea && !isMobile && (
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
              onClick={handleCancel}
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
      )}

      {/* Mobile Dialog */}
      <CommentDialog
        isOpen={showTextArea && isMobile}
        onClose={() => setShowTextArea(false)}
        onPost={handlePost}
        onCancel={handleCancel}
        commentText={commentText}
        setCommentText={setCommentText}
      />

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4 border-t pt-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              author={username ?? ''}
              onDelete={(id) =>
                setComments((prev) => prev.filter((c) => c.id !== id))
              }
              onUpdate={(updated) =>
                setComments((prev) =>
                  prev.map((c) => (c.id === updated.id ? updated : c))
                )
              }
            />
          ))}
        </div>
      )}

      {/* EditPost */}
      <EditPostDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={handleSaveEdit}
        onCancel={() => setShowEditDialog(false)}
        areaPost={editablePost}
        setAreaPost={setEditablePost}
      />
    </div>
  )
}

