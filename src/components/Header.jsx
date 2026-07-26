import { useState } from "react"
import { NavLink } from "react-router-dom"

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Centralized link styling to clean up duplicate code
  const navLinkStyle = ({ isActive }) =>
    `border-b-2 pb-1 text-sm font-poppins font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 md:text-base ${
      isActive
        ? "border-orange-500 text-orange-600"
        : "border-transparent text-amber-800 hover:border-orange-500 hover:text-orange-600"
    }`

  return (
    <header className="bg-cream border-b border-borderSoft relative z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* LOGO AREA */}
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

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={toggleMenu}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-amber-200 text-amber-900 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l18 18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        {/* DESKTOP NAVIGATION (Hidden on Mobile) */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Primary navigation"
        >
          <NavLink to="/home" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/favourites" className={navLinkStyle}>Favourites</NavLink>
          <NavLink to="/modal" className={navLinkStyle}>Meal Planner</NavLink>
        </nav>

        {/* DESKTOP PROFILE BUTTON (Hidden on Mobile) */}
        <div className="hidden md:block">
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
      </div>

      {/* MOBILE DROPDOWN PANEL */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-cream border-b border-borderSoft px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            <NavLink to="/home" className={navLinkStyle} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/favourites" className={navLinkStyle} onClick={() => setIsOpen(false)}>Favourites</NavLink>
            <NavLink to="/modal" className={navLinkStyle} onClick={() => setIsOpen(false)}>Meal Planner</NavLink>
            
            <hr className="border-amber-100 my-1" />
            
            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-poppins font-semibold text-white transition-colors duration-300 hover:bg-orange-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
              <span>Profile</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header