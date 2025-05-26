import { Comment } from '../models/Comment';
import axios from '@/lib/axios';

export async function getCommentApi(postId: string): Promise<Comment[]> {
  const res = await axios.get<Comment[]>(`/comment_posts/${postId}/comments`);
  return res.data;
}

export async function createCommentRequest(commentData: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
  const res = await axios.post<Comment>('/comment_posts', commentData)
  return res.data
}

export async function updateCommentApi({
  id,
  content,
}: Pick<Comment, 'id' | 'content'>): Promise<Comment> {
  const res = await axios.patch<Comment>(`/comment_posts/${id}`, { content })
  return res.data
}

export async function deleteCommentApi(id: string): Promise<void> {
  await axios.delete(`/comment_posts/${id}`)
}
