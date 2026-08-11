import { NavLink } from "react-router-dom"

export default function Profile() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-12 text-center">
      
      {/* Profile Icon Header */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-600 shadow-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10"
        >
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
        </svg>
      </div>

      {/* Main Content */}
      <h1 className="text-2xl font-poppins font-bold text-amber-900 md:text-3xl">
        User Profile
      </h1>
      
      <p className="mt-3 max-w-md text-sm text-amber-800/80 md:text-base">
        Welcome to your NaijaCook workspace! Profile customization, saved meal plans, and personal account settings are currently under development.
      </p>

      {/* Primary Action Button */}
      <NavLink
        to="/"
        className="mt-8 rounded-md bg-orange-500 px-6 py-2.5 text-sm font-poppins font-semibold text-white transition-colors duration-300 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
      >
        Back to Recipes
      </NavLink>
      
    </div>
  )
}