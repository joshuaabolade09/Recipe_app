import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userBudget, setUserBudget] = useState("")
  const [ingredient, setIngredient] = useState("")
  const navigate = useNavigate()

  function handleBudget(e) {
    if (e) e.preventDefault()
    navigate(`/Search?budget=${userBudget}`)
  }

  function handleSearch(e) {
    if (e) e.preventDefault()
    if (searchQuery) {
      navigate(`/Search?q=${searchQuery}`)
    }
  }

  function handleIngredient(e) {
    if (e) e.preventDefault()
    navigate(`/ingredientResult?ingredientSearch=${encodeURIComponent(ingredient)}`)
  }

  const handleChipClick = (chipName) => {
    navigate(`/Search?q=${chipName}`)
  }

  // Safe fallback handler for missing recipe images
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevents infinite fallback loops if fallback URL fails
    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5EB]">
      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col items-center justify-start px-4 pt-10 pb-28 sm:px-6 lg:px-8">
        
        {/* TITLE */}
        <h2 className="py-6 text-center text-2xl font-poppins font-semibold tracking-tight text-amber-900 md:text-3xl">
          What do you want to cook today?
        </h2>

        {/* PRIMARY BAR */}
        <div className="flex w-full max-w-2xl items-center shadow-sm rounded-xl overflow-hidden">
          <input 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search for recipes..."
            className="w-full border-r-0 border-gray-200 bg-white px-4 py-3 text-sm text-amber-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-l-xl rounded-r-none" 
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e);
            }}
          />
          <button 
            onClick={handleSearch} 
            className="bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-r-xl rounded-l-none shrink-0"
          >
            Search
          </button>
        </div>

        {/* QUICK TAG CHIPS */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {["Rice", "Chicken", "Pasta", "Nigerian"].map((chip) => (
            <p 
              key={chip} 
              onClick={() => handleChipClick(chip)}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-amber-900 shadow-sm cursor-pointer hover:bg-orange-50 transition-colors duration-200"
            >
              {chip}
            </p>
          ))}
        </div>

        {/* WIDGET CARD GRID CONTAINER */}
        <div className="mt-8 flex w-full max-w-5xl flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
          
          {/* COOK WITH INGREDIENTS */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md min-h-[220px]">
            <p className="text-xl font-poppins font-semibold tracking-tight text-amber-900">
              Cook with what you have
            </p>

            <input
              type="text" 
              value={ingredient} 
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Rice, Chicken, Pasta..."
              className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-amber-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleIngredient(e);
              }}
            />

            <div className="mt-4 flex items-center justify-start">
              <button onClick={handleIngredient} className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 z-10">
                Find Recipes
              </button>
            </div>

            <img
              src="/src/img/img1.png"
              alt=""
              className="absolute -bottom-3 -right-3 w-24 object-contain opacity-40 pointer-events-none md:w-28"
            />
          </div>

          {/* COOK ON BUDGET */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md min-h-[220px]">
            <p className="text-xl font-poppins font-semibold tracking-tight text-amber-900">
              Cook Within Your Budget
            </p>

            <input 
              type="text" 
              value={userBudget} 
              onChange={(e) => setUserBudget(e.target.value)}
              placeholder="₦ | Enter total budget..."
              className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-amber-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBudget(e);
              }}
            />

            <div className="mt-4 flex items-center justify-start">
              <button onClick={handleBudget} className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 z-10">
                Find Recipes
              </button>
            </div>

            <img
              src="/src/img/img2.png"
              alt=""
              className="absolute -bottom-3 -right-3 w-24 object-contain opacity-40 pointer-events-none md:w-28"
            />
          </div>
        </div>

        {/* TRENDING SECTION */}
        <p className="mt-14 text-center text-2xl font-poppins font-semibold tracking-tight text-amber-900">
          Trending Recipes
        </p>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "jollof", name: "Classic Jollof Rice", img: "/src/img/jollof_rice.png", time: "45 mins", difficulty: "Medium", rating: "4.9" },
            { id: "pasta", name: "Creamy Pasta Alfredo", img: "/src/img/pasta_alfredo.png", time: "30 mins", difficulty: "Easy", rating: "4.7" },
            { id: "egusi", name: "Authentic Egusi Soup", img: "/src/img/egusi_soup.png", time: "60 mins", difficulty: "Hard", rating: "5.0" },
            { id: "curry", name: "Spicy Chicken Curry", img: "/src/img/chicken_curry.png", time: "40 mins", difficulty: "Easy", rating: "4.8" },
          ].map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/recipe/${item.id}`)}
              className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative overflow-hidden h-44 w-full bg-orange-50">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={handleImageError}
                />
                <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-full text-white ${
                  item.difficulty === 'Easy' ? 'bg-emerald-600' : item.difficulty === 'Medium' ? 'bg-amber-600' : 'bg-rose-700'
                }`}>
                  {item.difficulty}
                </span>
              </div>
              
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-amber-900 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-amber-900">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/Search')} 
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600 shadow-sm"
        >
          View More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* INTERACTIVE MEAL PLANNER SECTION */}
        <div className="w-full max-w-6xl mt-16 border-t border-orange-100 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-poppins font-semibold tracking-tight text-amber-900 md:text-2xl">
                Plan Your Meals
              </h2>
              <p className="mt-1 text-sm text-amber-900/70">
                Organize your kitchen routines and sync ingredients smoothly.
              </p>
            </div>
            <Link 
              to="/planner" 
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-orange-500/20 bg-orange-50 px-5 py-2.5 text-xs font-bold text-orange-600 hover:bg-orange-100 transition-colors"
            >
              Open Full Scheduler
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { period: "Breakfast", meal: "Yam & Egg Sauce", time: "8:30 AM", accent: "border-l-amber-500" },
              { period: "Lunch", meal: "Jollof Rice & Plantain", time: "1:40 PM", accent: "border-l-orange-500" },
              { period: "Dinner", meal: "Light Pepper Soup", time: "7:15 PM", accent: "border-l-amber-950" }
            ].map((slot, idx) => (
              <div key={idx} className={`bg-white p-4 rounded-xl border border-orange-100/70 border-l-4 ${slot.accent} shadow-sm`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">{slot.period}</span>
                <strong className="text-sm font-bold text-amber-900 block mt-1">{slot.meal}</strong>
                <span className="text-xs text-gray-500 mt-2 block font-medium">{slot.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}