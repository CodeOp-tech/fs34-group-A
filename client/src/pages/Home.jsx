import React from 'react'

const Home = () => {
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">WordQuest</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div id="app" class="flex flex-col bg-gradient-to-r from-pink-500 to-purple-500 pt-5 pb-5 items-center gap-20">
  <button class="px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white">Play</button>
</div>
        </form>
      </div>
    </div>
  );
};

export default Home;