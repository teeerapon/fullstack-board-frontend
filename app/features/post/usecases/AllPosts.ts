import { getPostsApi, createPostRequest, updatePostApi, deletePostApi } from '../services/postApi'
import { Post } from '../models/Post'

export async function getAllPosts(): Promise<Post[]> {
  return await getPostsApi()
}

export async function getPostId(username: string): Promise<Post[]> {
  const posts = await getPostsApi()
  return posts.filter((post) => post.author === username)
}

export async function createPost(postData: Post): Promise<Post> {
  return await createPostRequest(postData)
}

export async function updatePost(postData: Post): Promise<Post> {
  return await updatePostApi(postData)
}

export async function deletePost(Id: string): Promise<void> {
  await deletePostApi(Id)
}
