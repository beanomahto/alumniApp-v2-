import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DirectoryPage from './pages/DirectoryPage'
import ProfilePage from './pages/ProfilePage'
import FeedPage from './pages/FeedPage'
import Home from './components/Home'

const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const storedUserRaw = localStorage.getItem('user')

    if (
      token &&
      storedUserRaw &&
      storedUserRaw !== 'undefined' &&
      storedUserRaw !== 'null'
    ) {
      try {
        const storedUser = JSON.parse(storedUserRaw)
        setIsAuthenticated(true)
        setUser(storedUser)
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e)
        setIsAuthenticated(false)
        setUser(null)
      }
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev
      if (newMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return newMode
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  return (
    <>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <LoginPage
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUpPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/profile/:id" element={<ProfilePage user={user} />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </>
  )
}

export default App
