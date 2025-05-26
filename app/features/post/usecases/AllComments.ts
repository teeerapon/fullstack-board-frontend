import { getCommentApi as fetchComments, createCommentRequest, updateCommentApi, deleteCommentApi } from '../services/commentApi'
import { Comment } from '../models/Comment'

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  return await fetchComments(postId)
}

export async function createComment(commentData: Comment): Promise<Comment> {
  return await createCommentRequest(commentData)
}

export async function updateComment(commentData: Comment): Promise<Comment> {
  return await updateCommentApi(commentData)
}

export async function deleteComment(commentId: string): Promise<void> {
  await deleteCommentApi(commentId)
}
