import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Feed from '../components/Feed'

const dummyPosts = [
  {
    _id: '1',
    user: {
      name: 'Alice Johnson',
      profilePicture: 'https://randomuser.me/api/portraits/women/10.jpg',
    },
    content: 'Excited to announce a new event happening next week!',
    tags: ['Event'],
    likes: ['u1', 'u2'],
    comments: [
      {
        user: 'u3',
        comment: 'Sounds great!',
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
  },
  {
    _id: '2',
    user: {
      name: 'Rahul Verma',
      profilePicture: 'https://randomuser.me/api/portraits/men/9.jpg',
    },
    content: 'We’re hiring frontend developers! DM for more info.',
    tags: ['Hiring'],
    likes: [],
    comments: [],
    createdAt: new Date(),
  },
]

const FeedPage = ({ isAuthenticated }) => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setPosts(dummyPosts)
  }, [])

  const handleCreatePost = () => {
    navigate(isAuthenticated ? '/createpost' : '/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 transition-colors duration-200 relative">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Recent Posts
        </h1>
        <Feed posts={posts} />
      </div>

      {/* Floating Create Post Button with Icon */}
      <button
        onClick={handleCreatePost}
        className="fixed bottom-6 right-6 cursor-pointer bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
        aria-label="Create Post"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

export default FeedPage
