import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const featureVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
}

const HomePage = () => {
  const features = [
    {
      title: 'Discover Alumni',
      desc: 'Browse profiles, read bios, and learn from those who walked the same path.',
    },
    {
      title: 'Build Your Network',
      desc: 'Connect with alumni across industries and grow your professional circle.',
    },
    {
      title: 'Share Your Journey',
      desc: 'Let others know where you are now and inspire the next generation.',
    },
    {
      title: 'Search by Skills or Batch',
      desc: 'Find people based on skills, batch, company, or location.',
    },
    {
      title: 'Stay Updated',
      desc: 'Get notified about alumni meetups, college events, and more.',
    },
    {
      title: 'Contribute Back',
      desc: 'Mentor students, share resources, and give back to your community.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Reunite
        </h1>
        <p className="text-xl sm:text-2xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Bridging the gap between alumni and students. Connect. Collaborate.
          Grow.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={featureVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Ready to Reunite?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Join Now
          </Link>
          <Link
            to="/directory"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          >
            Explore Alumni
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage
