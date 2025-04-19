import { useUser } from '../contexts/userContext'
import Profile from '../components/Profile'

const ProfilePage = () => {
  const { selectedUser } = useUser()

  if (!selectedUser) {
    return (
      <div className="text-center mt-10 text-red-500">No user selected</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <Profile user={selectedUser} />
      </div>
    </div>
  )
}

export default ProfilePage
