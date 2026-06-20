import recipes from "../data/recipe.json";
import { useContext, useEffect } from "react";
import NoResultFound from "./noResultFound";
import { useState } from "react";
import { ReactContext } from "../Context/Context"

import { useNavigate, useSearchParams } from "react-router-dom";
import { useReducer } from "react";
import { uiReducer, initialState } from "../Reducer/Reducer";;

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

function Search() {

  const {setAllRecipes} = useContext(ReactContext)

const [state,dispatch]= useReducer(uiReducer, initialState)

  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1)
  //For hold the recipes data fetched from the API and stored in local storage. The state will be used to display the search results on the search results page and to filter the results based on the user's search query and budget query parameters.
  const [apiRecipes, setApiRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState("")


function searchQueryhandler(){
  navigate(`/search?q=${searchQuery}`)


}




  

  //Async function  to fetch data from the ApI stored in a local storage and filter the data based on the search query and budget query parameters. The function will return the filtered data to be displayed on the search results page. The function will also handle any errors that may occur during the fetch process and display an appropriate message to the user.
 
 function convertedRecipe(recipe){
return {
id:recipe.id,
img: recipe.image,
name:recipe.title,
image:recipe.image,
cookTime:recipe.readyInMinutes,
servings:recipe.servings,
difficulty:recipe.readyInMinutes< 20 ? "Easy": recipe.readyInMinutes <= 40? "Medium": "Hard",
costEstimate:Math.round(recipe.pricePerServing/100 *25) * 100,
calories:(recipe.nutrition.nutrients.find((item)=> item.name ==="Calories")?.amount).toFixed(0),
tags: recipe.diets,
description: recipe.summary.replace(/<[^>]*>/g, ""),
category: recipe.cuisines[0] || "International",
reviewCount: recipe.aggregateLikes,
rating: (recipe.spoonacularScore / 100 * 5).toFixed(1),
instructions: [recipe.sourceUrl],
prepTime:recipe.preparationMinutes,
ingredients: recipe.nutrition.ingredients.map((ing) => ({
  name: ing.name,
  quantity: ing.amount + " " + ing.unit
})),
}
}


async function loadRecipes(){
const response = await fetch (`https://api.spoonacular.com/recipes/complexSearch?number=50&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${API_KEY}`)
const res= await response.json()
const transformed = res.results.map((recipe) => convertedRecipe(recipe))
const existingRecipes = JSON.parse(localStorage.getItem("recipes") || "[]")

//Check the existing recipe if there is no repetition
const filteredExistingRecipes = existingRecipes.filter((existingRecipe) => {
  return !transformed.some((newRecipe) => newRecipe.id === existingRecipe.id)
})


 const combinedArray= [...transformed, ...filteredExistingRecipes]
localStorage.setItem("recipes", JSON.stringify(combinedArray))
localStorage.setItem("date", new Date().getTime() )
localStorage.setItem("offset", 50)

setApiRecipes(combinedArray)
}

useEffect(() => {
  
 const storedRecipes= localStorage.getItem("recipes")
  const storedRecipe= JSON.parse(storedRecipes || "[]")
  
   const storedRecipeData = storedRecipes ? JSON.parse(storedRecipes) : []
  const storedDate = localStorage.getItem("date")
  const isExpired = Date.now() - storedDate > 24 * 60 * 60 * 1000

  if (storedRecipeData.length>0 && !isExpired){
    setApiRecipes(storedRecipeData)

  }

else{
  loadRecipes()
}
}, [])

//Set the Load More button just to fetch 9 matches per page
///Combined the localStorage data and also the recipe data into one array to be used for filtering and displaying the search results on the search results page. The combined data will be stored in the allRecipes variable and will be used to filter the results based on the user's search query and budget query parameters. The allRecipes variable will also be used to display the search results on the search results page.
const allRecipes =[...recipes, ...apiRecipes]


const query= searchParams.get("q") || ""
const budgetTitle = searchParams.get("budget") || ""
const formattedQuery= (query) ? query[0].toUpperCase()+ query.slice(1): ""


//Description for searchHeader
let description =''
let filteredExpense =[];
if (query){
  // eslint-disable-next-line no-unused-vars
  filteredExpense= allRecipes.filter((recipe)=> recipe.name.toLowerCase().includes(query.toLowerCase())).slice(0,14)
  description= `Showing results for ${query}`
}
else{
  filteredExpense= allRecipes.filter((recipe)=> recipe.costEstimate <= budgetTitle)
  description= `Budget friendly meals under #${budgetTitle.toLocaleString()}`
}


const filteredExpenses = filteredExpense.filter((item)=> {
  if (state.activeFilter === "All") {
    return true;
  }
  if (state.activeFilter === "Nigerian") {
    return item.category.includes("Nigerian")

 
}
if (state.activeFilter==="Quick Meals"){
  return item.cookTime< 40

}
if (state.activeFilter==="Budget friendly"){
  return item.costEstimate < 4000

}
if (state.activeFilter === "Vegetarian"){
  return item.tags?.includes("vegetarian")
}
return true
}

);
useEffect(() => {
  setAllRecipes(allRecipes)
}, [apiRecipes])


//Set the number of recipes in a page
  const recipesPerPage = 9
  const startIndex =  (currentPage - 1) * recipesPerPage
  const endIndex = startIndex + recipesPerPage
 const paginatedRecipes = filteredExpenses.slice(startIndex, endIndex)

//Function for handling the pagination of the search results on the search results page. The function will update the current page state variable and will be used to display the correct set of search results based on the user's navigation through the pages. The function will also handle any edge cases such as navigating to a page that does not exist or navigating back to the first page.
function nextPage(){
  if(endIndex < filteredExpenses.length){
    setCurrentPage(currentPage + 1)
  }
}

function prevPage(){
  if(currentPage > 1){
    setCurrentPage(currentPage - 1)
  }
}


const formattedRecipes= filteredExpenses.length=== 1  ? "recipe" : "recipes"

const navigate= useNavigate()

const hasResults= filteredExpense.length> 0


function handleClick(recipeId){
  navigate(`/details?q=${recipeId}`)
  //navigate(`/details/${recipe.id}`)


  
  // when user clicks on a recipe, navigate to the recipe details page with the recipe id as a parameter  
  
}
return (
  <>
    {hasResults ? (
      <div>
        <div className="min-h-screen bg-[#FFF5EB] flex flex-col items-center justify-start px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex w-full max-w-2xl items-center mx-auto mt-10">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="w-full rounded-l-xl rounded-r-none border border-gray-200 bg-white px-4 py-3 text-sm text-amber-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
           />

            <button className="rounded-r-xl rounded-l-none bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={searchQueryhandler}>
              Search
            </button> 
          </div>

          <p className="w-full max-w-2xl text-left text-base mt-6 font-poppins font-semibold tracking-tight text-amber-900 md:text-xl">
            {description}
          </p>

          <p className="w-full max-w-2xl text-sm font-normal text-amber-900 mt-2 tracking-tight">
            {filteredExpenses.length} {formattedRecipes} found
          </p>

          <ul className="w-full max-w-6xl mt-6 flex flex-col flex-nowrap overflow-x-auto items-center justify-center gap-4 md:flex-row md:gap-6 mx-auto">
            <li>
              <button
                onClick={() => dispatch({  type: "SET_FILTER", payload: "All" })}
                className="text-xs md:text-sm text-amber-900 font-poppins tracking-tight border-2 border-amber-500 rounded-lg px-4 py-2 hover:bg-orange-700 hover:text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                All
              </button>
            </li>

            <li>
              <button
                onClick={() => dispatch({  type: "SET_FILTER", payload: "Nigerian" })}
                className="text-xs md:text-sm text-amber-900 font-poppins tracking-tight border-2 border-amber-500 rounded-lg px-4 py-2 hover:bg-orange-700 hover:text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Nigerian
              </button>
            </li>

            <li>
              <button
                onClick={() => dispatch({  type: "SET_FILTER", payload: "Quick Meals" })}
                className="text-xs md:text-sm text-amber-900 font-poppins tracking-tight border-2 border-amber-500 rounded-lg px-4 py-2 hover:bg-orange-700 hover:text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Quick Meals
              </button>
            </li>

            <li>
              <button
                onClick={() =>
                  dispatch({ type: "SET_FILTER", payload: "Budget Friendly" })
                }
                className="text-xs md:text-sm text-amber-900 font-poppins tracking-tight border-2 border-amber-500 rounded-lg px-4 py-2 hover:bg-orange-700 hover:text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Budget Friendly
              </button>
            </li>

            <li>
              <button
                onClick={() => dispatch({  type: "SET_FILTER", payload: "Vegetarian" })}
                className="text-xs md:text-sm text-amber-900 font-poppins tracking-tight border-2 border-amber-500 rounded-lg px-4 py-2 hover:bg-orange-700 hover:text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Vegetarian
              </button>
            </li>

            <li>
              <button
                onClick={() => dispatch({  type: "SET_FILTER", payload: "Popular" })}
                className="text-xs md:text-sm text-amber-900 font-poppins tracking-tight border-2 border-amber-500 rounded-lg px-4 py-2 hover:bg-orange-700 hover:text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Popular
              </button>
            </li>
          </ul>

          <div className="w-full max-w-5xl mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
            {paginatedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleClick(recipe.id)}
                className="bg-white max-w-sm rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={recipe.img|| recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />

                <h3 className="text-left mt-4 text-base text-amber-900 mx-2 tracking-tight font-semibold">
                  {recipe.name}
                </h3>

                <div className="flex justify-start items-center mt-2 gap-4 mx-2">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.286 3.956c.3.921-.755 1.688-1.538 1.118l-3.36-2.442a1 1 0 00-1.176 0l-3.36 2.442c-.783.57-1.838-.197-1.538-1.118l1.286-3.956a1 1 0 00-.364-1.118L2.025 9.383c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.956z" />
                    </svg>

                    <p className="text-amber-900 text-sm">{recipe.rating}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    <p className="text-amber-900 text-sm">
                      {recipe.cookTime} mins
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.286 3.956c.3.921-.755 1.688-1.538 1.118l-3.36-2.442a1 1 0 00-1.176 0l-3.36 2.442c-.783.57-1.838-.197-1.538-1.118l1.286-3.956a1 1 0 00-.364-1.118L2.025 9.383c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.956z" />
                    </svg>

                    <p className="text-amber-900 text-sm">{recipe.servings}</p>
                  </div>
                </div>

                <p className="text-amber-900 text-sm mx-2 mt-2 mb-4 font-semibold leading-relaxed">
                  #{recipe.costEstimate.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-evenly items-center gap-4 mt-8">
        {currentPage >1 ? <button className="mt-8 px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600..." onClick={prevPage}>Previous Page</button> : null}
                { currentPage < Math.ceil(filteredExpenses.length / recipesPerPage) ? <button className="mt-8 px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600..." onClick={nextPage}>Next Page</button> : null }
        
        </div>
       <p className="text-sm text-amber-900 font-medium tracking-tight mt-2">
  Page {currentPage} of {Math.ceil(filteredExpenses.length / recipesPerPage)}
</p>
        
        </div>
      </div>
    ) : (
      <NoResultFound />
    )}
  </>
);

}
export default Search
