import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Feed from '../components/Feed'

const FeedPage = ({ isAuthenticated, user }) => {
  const [posts, setPosts] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  const handleCreatePostClick = () => {
    if (isAuthenticated) {
      navigate('/createpost')
    } else {
      navigate('/login', { state: { from: location } })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 transition-colors duration-200 relative">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Recent Posts
        </h1>
        <Feed posts={posts} setPosts={setPosts} user={user} />
      </div>

      {/* Floating Create Post Button with Click Handler */}
      <button
        onClick={handleCreatePostClick}
        className="fixed bottom-6 right-6 cursor-pointer bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
        aria-label="Create Post"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

export default FeedPage
