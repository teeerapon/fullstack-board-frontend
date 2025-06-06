'use client'

import { useEffect, useState } from 'react'
import { getAllPosts, createPost } from '@/features/post/usecases/AllPosts'
import { GetAllCategory } from '@/features/post/usecases/AllCommunication'
import { Post } from '@/features/post/models/Post'
import { PostCard } from '@/features/post/components/PostCard'
import { Category } from '@/features/post/models/Category'
import { CreatPostDialog } from '@/features/post/components/CreatPostDialog'
import Swal from 'sweetalert2'
import { useAuth } from './context/AuthContext'

export default function HomePage() {
  const { signOut, username } = useAuth()
  const isLoggedIn = !!username;
  const [posts, setPosts] = useState<Post[]>([])
  const [category, setCategory] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>('')
  const [showTextAreaPost, setShowTextAreaPost] = useState(false)
  const [areaPost, setAreaPost] = useState<Post>({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getAllPosts()
        const sorted = [...postsData].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setPosts(sorted)
        const categoryData = await GetAllCategory()
        setCategory(categoryData)
      } catch (err: unknown) {
        console.error(err)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาดในการโหลดข้อมูล',
          showConfirmButton: false,
          timer: 1000,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPosts = posts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      !selectedCategoryTitle || post.category === selectedCategoryTitle
    return matchSearch && matchCategory
  })

  const handleToggleCreatePost = () => {
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
    setAreaPost({
      id: (posts.length + 1).toString(),
      title: '',
      content: '',
      category: '',
      avatar: '',
      comments: [],
      author: username,
      createdAt: '',
      commentCount: 0,
    })
    setShowTextAreaPost((prev) => !prev)
  }

  const handlePostMain = async () => {
    try {
      const newPost = await createPost(areaPost)
      Swal.fire({
        icon: 'success',
        title: 'โพสต์สำเร็จ',
        showConfirmButton: false,
        timer: 1500,
      })
      setPosts((prevPosts) => [newPost, ...prevPosts])
    } catch (err: unknown) {
      interface ErrorResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const errorObj = err as ErrorResponse;
      console.log(errorObj);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }


  const handleCancelPostMain = () => {
    setShowTextAreaPost(false)
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
        <input
          type="text"
          placeholder="Search"
          className="border px-4 py-2 rounded w-full text-sm md:text-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 md:gap-4">
          <select
            className="border px-3 py-2 rounded w-full md:w-auto text-sm md:text-md"
            value={selectedCategoryTitle}
            onChange={(e) => setSelectedCategoryTitle(e.target.value)}
          >
            <option value="">All Categories</option>
            {category.map((com) => (
              <option key={com.id} value={com.title}>
                {com.title}
              </option>
            ))}
          </select>
          <button
            className="bg-[#5C8374] text-white px-4 py-2 rounded text-sm md:text-md"
            onClick={handleToggleCreatePost}
          >
            Create
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={username ?? undefined}
              setPosts={setPosts}
              posts={posts}
            />
          ))}
        </div>
      )}


      {/* CreatPostDialog */}
      <CreatPostDialog
        isOpen={showTextAreaPost}
        onClose={() => setShowTextAreaPost(false)}
        onPost={handlePostMain}
        onCancel={handleCancelPostMain}
        areaPost={areaPost}
        setAreaPost={setAreaPost}
      />
    </div>
  )
}
