import React, { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const dummyPosts = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    content: 'Excited to share that I started a new position at Google!',
    tags: ['Hiring'],
    likes: [],
    comments: [],
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    content: 'Looking forward to the upcoming alumni meetup event in Delhi!',
    tags: ['Event'],
    likes: [],
    comments: [],
  },
]

const Feed = () => {
  const [posts, setPosts] = useState(dummyPosts)

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.length === 0 ? ['dummyUser'] : [],
            }
          : post
      )
    )
  }

  const addComment = (postId, comment) => {
    if (!comment) return
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  user: 'dummyUser',
                  comment,
                  createdAt: new Date(),
                },
              ],
            }
          : post
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 shadow-lg rounded-lg p-4 space-y-4 border border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <img
                src={post.user.profilePicture}
                alt={post.user.name}
                className="w-10 h-10 rounded-full border-2 border-gray-600"
              />
              <div className="font-semibold text-gray-100">
                {post.user.name}
              </div>
            </div>

            <p className="text-gray-300">{post.content}</p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4 pt-2">
              <motion.button
                whileTap={{ scale: 1.2 }}
                onClick={() => toggleLike(post.id)}
                className="flex items-center space-x-1 text-gray-400 hover:text-red-400"
              >
                {post.likes.length > 0 ? (
                  <Heart fill="#f87171" stroke="#f87171" size={20} />
                ) : (
                  <Heart size={20} />
                )}
                <span>{post.likes.length}</span>
              </motion.button>

              <div className="flex items-center space-x-1 text-gray-400">
                <MessageCircle size={20} />
                <span>{post.comments.length}</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const comment = e.target.comment.value
                addComment(post.id, comment)
                e.target.reset()
              }}
              className="mt-2"
            >
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
              />
            </form>

            <div className="space-y-1 mt-3">
              {post.comments.map((c, idx) => (
                <div key={idx} className="text-sm text-gray-400">
                  <span className="font-medium text-gray-300">Anonymous</span>:{' '}
                  {c.comment}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
