import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../components/Profile'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL
// const dummyUser = {
//   name: "John Doe",
//   email: "john@example.com",
//   batch: 2020,
//   branch: "Computer Science",
//   jobTitle: "Software Engineer",
//   company: "Google",
//   location: "California",
//   bio: "Passionate about building scalable systems.",
//   profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
//   tags: ["React", "Node.js", "MongoDB"],
//   socialLinks: {
//     linkedin: "https://linkedin.com/in/johndoe",
//     github: "https://github.com/johndoe",
//     twitter: "https://twitter.com/johndoe",
//   },
// };

const ProfilePage = ({ loggedUser, handleLogout }) => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${baseURL}/users/profile/${id}`)
        setUser(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [id, setUser])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <Profile user={user} loggedUser={loggedUser} handleLogout={handleLogout} />
    </div>
  )
}

export default ProfilePage
