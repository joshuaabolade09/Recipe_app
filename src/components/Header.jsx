
import { NavLink } from "react-router-dom"
function Header() {
    return (
       
            
  <header className="bg-cream border-b border-borderSoft">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
    <div className="flex items-center gap-3">
    <img
      src="/src/img/logo.png"
      alt="NaijaCook Logo"
      className="h-12 w-12 rounded-full object-cover"
    />
    <NavLink
      to="/"
      className="rounded-sm text-xl font-poppins font-semibold tracking-tight text-orange-500 md:text-2xl"
      aria-label="NaijaCook home"
    >
      Naija<span className="italic text-amber-900">Cook</span>
    </NavLink>
    </div>

    <nav
      className="flex items-center gap-4 md:gap-6"
      aria-label="Primary navigation"
    >
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `border-b-2 pb-1 text-sm font-poppins font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 md:text-base ${
            isActive
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-amber-800 hover:border-orange-500 hover:text-orange-600"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/favourites"
        className={({ isActive }) =>
          `border-b-2 pb-1 text-sm font-poppins font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 md:text-base ${
            isActive
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-amber-800 hover:border-orange-500 hover:text-orange-600"
          }`
        }
      >
        Favourites
      </NavLink>

      <NavLink
        to="/modal"
        className={({ isActive }) =>
          `border-b-2 pb-1 text-sm font-poppins font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 md:text-base ${
            isActive
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-amber-800 hover:border-orange-500 hover:text-orange-600"
          }`
        }
      >
        Meal Planner
      </NavLink>
    </nav>

    <NavLink
      to="/profile"
      className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-poppins font-semibold text-white transition-colors duration-300 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
      </svg>
      <span className="leading-none">Profile</span>
    </NavLink>
  </div>
</header>
    )
}

export default Header
