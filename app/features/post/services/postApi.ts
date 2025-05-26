import axios from '@/lib/axios'
import { Post } from '../models/Post'

export async function getPostsApi(): Promise<Post[]> {
  const res = await axios.get<Post[]>('/posts')
  return res.data
}

export async function createPostRequest(postData: Post): Promise<Post> {
  const res = await axios.post<Post>('/posts', postData)
  return res.data
}

export async function updatePostApi({
  id,
  title,
  content,
}: Pick<Post, 'id' | 'title' | 'content'>): Promise<Post> {
  const res = await axios.patch<Post>(`/posts/${id}`, { title, content })
  return res.data
}

export async function deletePostApi(id: string): Promise<void> {
  await axios.delete(`/posts/${id}`)
}
