import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
      const res = await axios.post(
        'http://localhost:8000/api/auth/signin',
        formData
      )

      const token = res.data.token
      const user = res.data.user

      if (token && user && typeof user === 'object') {
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user))
        setIsAuthenticated(true)
        setUser(user)
        alert('Login successful!')
        navigate('/feed')
      } else {
        throw new Error('Invalid login response: missing token or user.')
      }
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
