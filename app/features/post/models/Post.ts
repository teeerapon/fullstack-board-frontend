export interface Post {
  id: string
  title: string
  content: string
  category?: string
  avatar?: string
  comments?: Comment[]
  author: string
  createdAt: string
  commentCount?: number
}
