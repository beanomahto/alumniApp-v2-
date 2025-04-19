import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../contexts/userContext'

const Directory = ({ users = [] }) => {
  const navigate = useNavigate()
  const { setSelectedUser } = useUser()

  const handleUserClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/profile/${id}`
      )
      setSelectedUser(response.data)
      navigate(`/profile/${id}`)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => handleUserClick(user._id)}
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition"
        >
          <img
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-semibold text-gray-800 dark:text-white">
            {user.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Directory
