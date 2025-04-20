import React, { useState } from 'react'
import Directory from '../components/Directory'
import axios from 'axios'
import dotenv from 'dotenv'

// dotenv.config()


const baseURL = import.meta.env.VITE_API_BASE_URL;//replaced the actual base URL with this variable
// const baseURL = "http://localhost:8000/api" // Uncomment this line if you want to use the actual base URL
const DirectoryPage = () => {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    batch: '',
    branch: '',
    company: '',
    location: '',
    jobTitle: '',
    tags: '',
  })
  const [sortBy, setSortBy] = useState('')

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/users/search`,
        {
          params: {
            name: searchQuery,
            ...filters,
            sortBy,
          },
        }
      )
      console.log('Fetched data:', response.data)
      setUsers(response.data.users)
    } catch (error) {
      console.error('Search failed', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Directory
        </h1>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['batch', 'branch', 'company', 'location', 'jobTitle', 'tags'].map(
            (field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={filters[field]}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
              />
            )
          )}
        </div>

        {/* Sorting */}
        <div className="flex justify-between items-center mt-2">
          <label className="font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
          >
            <option value="">None</option>
            <option value="batch">Batch</option>
            <option value="branch">Branch</option>
            <option value="company">Company</option>
            <option value="location">Location</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>

        <Directory users={users} />
      </div>
    </div>
  )
}

export default DirectoryPage
