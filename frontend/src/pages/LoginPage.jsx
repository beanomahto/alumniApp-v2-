import Login from '../components/Login'
// import { useLocation } from 'react-router-dom'

const LoginPage = ({ setIsAuthenticated, setUser }) => {
  // const location = useLocation()
  // const from = location.state?.from?.pathname || '/'
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">
        Log In
      </h1>
      <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
    </div>
  )
}

export default LoginPage
