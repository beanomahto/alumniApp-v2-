const Profile = ({ user }) => {
  if (!user) return null

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-100">
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={user.profilePicture || '/default-profile.png'}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {user.jobTitle} at {user.company}
          </p>
        </div>
        {/* {profileUser?._id === user?._id && ( */}
          
        {/* )} */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold">Email</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="font-semibold">Batch</p>
          <p>{user.batch || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Branch</p>
          <p>{user.branch || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Location</p>
          <p>{user.location || 'N/A'}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="font-semibold">Bio</p>
          <p className="text-gray-600 dark:text-gray-300">
            {user.bio || 'No bio available.'}
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="font-semibold">Tags</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.tags && user.tags.length > 0 ? (
              user.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                No tags added.
              </span>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <p className="font-semibold">Social Links</p>
          <div className="flex space-x-4 mt-2">
            {user.socialLinks?.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-300 underline"
              >
                LinkedIn
              </a>
            )}
            {user.socialLinks?.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-800 dark:text-gray-200 underline"
              >
                GitHub
              </a>
            )}
            {user.socialLinks?.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 dark:text-blue-200 underline"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
