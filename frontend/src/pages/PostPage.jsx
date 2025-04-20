import { useNavigate } from 'react-router-dom'
import Post from '../components/Post'
// import axios from 'axios'

const PostPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (postData) => {
    try {
      // const res = await axios.post('/api/posts', postData)
      console.log('Submitted Post:', postData)
      navigate('/') // Go back to feed
    } catch (err) {
      console.error('Failed to submit post:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Create a New Post
        </h2>
        <Post onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default PostPage
