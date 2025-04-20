import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Directory = ({ users = [] }) => {
  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_API_BASE_URL //actual base URL was replaced with this variable
  // const baseURL = "http://localhost:8000/api" // Uncomment this line if you want to use the actual base URL

  const handleUserClick = async (id) => {
    // window.location.href = http://localhost:8000/api/users/profile/${id};
    // navigate(/profile/${id}); // Uncomment this line if you want to use react-router for navigation
    // console.log(e);
    const res = await axios.get(`${baseURL}/users/profile/${id}`)
    navigate(`/profile/${id}`) // Uncomment this line if you want to use react-router for navigation
    console.log(res.data)
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => handleUserClick(user._id)}
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
        >
          <img
            src={user.profilePicture || null}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-semibold">{user.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Directory
