import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-6"
        >
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">Extraordinary</span> Stories
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10"
        >
          A premium platform for writers and readers. Explore trending topics, requested articles, and deep-dives into technology and design.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button className="btn-primary text-lg px-8 py-3">Start Reading</button>
        </motion.div>
      </section>

      {/* Placeholder for trending posts slider */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Trending Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-48 bg-slate-200 dark:bg-slate-800"></div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-full">Technology</span>
                <h3 className="text-xl font-bold mt-3 mb-2 line-clamp-2">How to build a modern web application in 2026</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                  A comprehensive guide to using the latest tools like Vite, React 19, and Tailwind CSS to build stunning, fast applications.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                  <div className="text-sm">
                    <p className="font-medium">John Doe</p>
                    <p className="text-slate-500 text-xs">May 9, 2026 · 5 min read</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
