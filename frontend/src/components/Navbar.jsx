import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = ({
  toggleDarkMode,
  darkMode,
  isAuthenticated,
  user,
  handleLogout,
}) => {
  return (
    <nav className="p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Reunite
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode}>
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              className={`text-xl cursor-pointer ${
                darkMode ? 'text-yellow-400' : 'text-yellow-800'
              }`}
            />
          </button>

          {/* Navigation Tabs */}
          <div className="space-x-4">
            <Link
              to="/feed"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              Feed
            </Link>
            <Link
              to="/directory"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              Directory
            </Link>

            {/* Conditional Rendering for Auth */}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/signup"
                  className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  className="flex items-center text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {/* Profile Image Icon */}
                  <img
                    src={user?.profileImage || '/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
