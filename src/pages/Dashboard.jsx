import {  useNavigate } from 'react-router-dom'
import  { useState } from 'react'
function Dashboard() {


  const [searchQuery, setSearchQuery]= useState("")

  //filter by User Budget
  const [userBudget, setUserBudget]= useState("")
  const [ingredient, setIngredient]= useState("")
  const navigate= useNavigate()

  function handleBudget(e){
    e.preventDefault()
     navigate(`/Search?budget=${userBudget}`)
       

  }

 function handleSearch(e){
e.preventDefault()
if(searchQuery){
  navigate(`/Search?q=${searchQuery}`)


}

 }
function handleIngredient(){
  navigate(`/ingredientResult?ingredientSearch=${encodeURIComponent(ingredient)}`)
}


  return (
    <div>
      <div className="min-h-screen bg-[#FFF5EB] flex flex-col items-center justify-start px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <h2 className="py-6 text-center text-2xl font-poppins font-semibold tracking-tight text-amber-900 md:text-3xl">
          What do you want to cook today?
        </h2>

        <div className="flex w-full max-w-2xl items-center">
          <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search for recipes..."
            className="w-full rounded-l-xl rounded-r-none border border-gray-200 bg-white px-4 py-3 text-sm text-amber-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button onClick={handleSearch} className="rounded-r-xl rounded-l-none bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
            Search
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <p className="rounded-full bg-white px-4 py-2 text-sm font-medium text-amber-900 shadow-sm">
            Rice
          </p>
          <p className="rounded-full bg-white px-4 py-2 text-sm font-medium text-amber-900 shadow-sm">
            Chicken
          </p>
          <p className="rounded-full bg-white px-4 py-2 text-sm font-medium text-amber-900 shadow-sm">
            Pasta
          </p>
          <p className="rounded-full bg-white px-4 py-2 text-sm font-medium text-amber-900 shadow-sm">
            Nigerian
          </p>
        </div>

        <div className="mt-6 flex w-full max-w-5xl flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <p className="text-center text-xl font-poppins font-semibold tracking-tight text-amber-900">
              Cook with what you have
            </p>

            <input
              type="text" value={ingredient} onChange={(e)=>setIngredient(e.target.value)}
              placeholder="Rice, Chicken, Pasta..."
              className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-amber-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleIngredient();
                }
              }}
            />

            <div className="mt-4 flex items-center justify-center " onClick={()=> handleIngredient()}>
              <button className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                Find Recipes
              </button>
            </div>

            <img
              src="/src/img/img1.png"
              alt="Ingredients"
              className="absolute -bottom-3 -right-3 w-24 object-contain opacity-90 md:w-28"
              
            />
          </div>

          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <p className="text-center text-xl font-poppins font-semibold tracking-tight text-amber-900">
              Cook Within Your Budget
            </p>

            <input 
              type="text" value={userBudget.toLocaleString()}
              onChange={(e)=>setUserBudget(e.target.value)}
              placeholder="#| Enter total budget..."
              className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-amber-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleBudget();
                }
              }}
            />

            <div className="mt-4 flex items-center justify-center">
              <button onClick={handleBudget} className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                Find Recipes
              </button>
            </div>

            <img
              src="/src/img/img2.png"
              alt="Ingredients"
              className="absolute -bottom-3 -right-3 w-24 object-contain opacity-90 md:w-28"
            />
          </div>
        </div>

        <p className="mt-12 text-center text-2xl font-poppins font-semibold tracking-tight text-amber-900">
          Trending Species
        </p>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
            <img
              src="/src/img/jollof_rice.png"
              alt="Jollof Rice"
              className="h-40 w-full object-cover transition-transform duration-300 ease-out hover:scale-105"
            />

            <div className="p-5">
              <h3 className="text-base font-semibold text-amber-900">
                Jollof Rice
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                <span>45 mins</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
            <img
              src="/src/img/pasta_alfredo.png"
              alt="Pasta Alfredo"
              className="h-40 w-full object-cover transition-transform duration-300 ease-out hover:scale-105"
            />

            <div className="p-5">
              <h3 className="text-base font-semibold text-amber-900">
                Pasta Alfredo
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                <span>45 mins</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
            <img
              src="/src/img/egusi_soup.png"
              alt="Egusi Soup"
              className="h-40 w-full object-cover transition-transform duration-300 ease-out hover:scale-105"
            />

            <div className="p-5">
              <h3 className="text-base font-semibold text-amber-900">
                Egusi Soup
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                <span>45 mins</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
            <img
              src="/src/img/chicken_curry.png"
              alt="Chicken Curry"
              className="h-40 w-full object-cover transition-transform duration-300 ease-out hover:scale-105"
            />

            <div className="p-5">
              <h3 className="text-base font-semibold text-amber-900">
                Chicken Curry
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                <span>45 mins</span>
              </div>
            </div>
          </div>
        </div>

        <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600">
          View More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <h2 className="mt-14 w-full max-w-6xl text-left text-xl font-poppins font-semibold tracking-tight text-amber-900 md:text-2xl">
          Plan Your Meals
        </h2>
        <p className="mt-2 w-full max-w-6xl text-left text-sm text-amber-900/70 md:text-base">
          Organize your weekly meals with our easy-to-use meal planner.
        </p>
      </div>
    </div>
  )
}

export default Dashboard