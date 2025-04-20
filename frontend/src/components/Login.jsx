import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const baseURL = import.meta.env.VITE_API_BASE_URL

const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${baseURL}/auth/signin`, formData)
      console.log(response.data)
      // localStorage.setItem('test', JSON.stringify({ hello: 'world' }))
      // console.log(localStorage.getItem('test'))

      try {
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('authToken', JSON.stringify(response.data.token))
        console.log('Saved to localStorage successfully')
        console.log(JSON.parse(localStorage.getItem('user')))
        console.log(JSON.parse(localStorage.getItem('authToken')))

        setIsAuthenticated(true)
        setUser(response.data)
        navigate('/')
      } catch (err) {
        console.error('Error saving to localStorage:', err)
      }

      alert('Login successful!')
      // After successful login
      // const location = useLocation()
      // const from = location.state?.from || '/'
      // navigate(from)
    } catch (err) {
      alert('Login failed. Please check your credentials.')
      console.error('Login error:', err)
    }
  }

  const inputClasses =
    'w-full px-5 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400'

  return (
    <div className="w-full max-w-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl p-8 rounded-2xl border dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-base text-gray-700 dark:text-gray-200">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ex: john@example.com"
            className={inputClasses}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-base text-gray-700 dark:text-gray-200">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="ex: secret123"
            className={inputClasses}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold transition duration-200"
        >
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login
