import recipes from "../data/recipe.json";
import { useContext, useEffect, useState, useReducer, useMemo } from "react";
import NoResultFound from "./noResultFound";
import { ReactContext } from "../Context/Context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { uiReducer, initialState } from "../Reducer/Reducer";

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

function Search() {
  const navigate = useNavigate();
  
  // Destructure savedRecipes from context (assumes an array fallback)
  const { setAllRecipes, toggleSaved, savedRecipes = [] } = useContext(ReactContext);
  
  const [state, dispatch] = useReducer(uiReducer, initialState);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [apiRecipes, setApiRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function searchQueryhandler() {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  }

  function convertedRecipe(recipe) {
    return {
      id: recipe.id,
      img: recipe.image,
      name: recipe.title,
      image: recipe.image,
      cookTime: recipe.readyInMinutes,
      servings: recipe.servings,
      difficulty: recipe.readyInMinutes < 20 ? "Easy" : recipe.readyInMinutes <= 40 ? "Medium" : "Hard",
      costEstimate: Math.round((recipe.pricePerServing / 100) * 25) * 100,
      calories: recipe.nutrition?.nutrients?.find((item) => item.name === "Calories")?.amount?.toFixed(0) || "0",
      tags: recipe.diets || [],
      description: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, "") : "",
      category: recipe.cuisines?.[0] || "International",
      reviewCount: recipe.aggregateLikes || 0,
      rating: recipe.spoonacularScore ? ((recipe.spoonacularScore / 100) * 5).toFixed(1) : "4.0",
      instructions: [recipe.sourceUrl],
      prepTime: recipe.preparationMinutes || 0,
      ingredients: recipe.nutrition?.ingredients?.map((ing) => ({
        name: ing.name,
        quantity: ing.amount + " " + ing.unit,
      })) || [],
    };
  }

  async function loadRecipes() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?number=50&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${API_KEY}`
      );
      const res = await response.json();
      if (res.results) {
        const transformed = res.results.map((recipe) => convertedRecipe(recipe));
        const existingRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");

        const filteredExistingRecipes = existingRecipes.filter((existingRecipe) => {
          return !transformed.some((newRecipe) => newRecipe.id === existingRecipe.id);
        });

        const combinedArray = [...transformed, ...filteredExistingRecipes];
        localStorage.setItem("recipes", JSON.stringify(combinedArray));
        localStorage.setItem("date", new Date().getTime().toString());
        localStorage.setItem("offset", "50");

        setApiRecipes(combinedArray);
      }
    } catch (error) {
      console.error("Error loading recipes:", error);
    }
  }

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    const storedRecipeData = storedRecipes ? JSON.parse(storedRecipes) : [];
    const storedDate = localStorage.getItem("date");
    const isExpired = storedDate ? Date.now() - parseInt(storedDate) > 24 * 60 * 60 * 1000 : true;

    if (storedRecipeData.length > 0 && !isExpired) {
      setApiRecipes(storedRecipeData);
    } else {
      loadRecipes();
    }
  }, []);

  const allRecipes = useMemo(() => [...recipes, ...apiRecipes], [apiRecipes]);
  const query = searchParams.get("q") || "";
  const budgetTitle = searchParams.get("budget") || "";

  useEffect(() => {
    if (allRecipes.length > 0) {
      setAllRecipes(allRecipes);
    }
  }, [allRecipes, setAllRecipes]);

  let description = "";
  let filteredExpense = [];

  if (query) {
    filteredExpense = allRecipes.filter((recipe) => {
      const recipeName = recipe?.name || recipe?.title || "";
      return recipeName.toLowerCase().includes(query.toLowerCase());
    });
    description = `Showing results for "${query}"`;
  } else if (budgetTitle) {
    filteredExpense = allRecipes.filter((recipe) => (recipe.costEstimate || 0) <= parseFloat(budgetTitle));
    description = `Budget friendly meals under ₦${parseFloat(budgetTitle).toLocaleString()}`;
  } else {
    filteredExpense = allRecipes;
  }

  const filteredExpenses = filteredExpense.filter((item) => {
    if (!item) return false;
    if (state.activeFilter === "All") return true;

    if (state.activeFilter === "Nigerian") {
      const categoryMatch = item?.category?.toLowerCase().includes("nigerian");
      const tagMatch = item?.tags?.some((tag) => tag.toLowerCase().includes("nigerian"));
      return categoryMatch || tagMatch;
    }
    if (state.activeFilter === "Quick Meals") {
      return (item.cookTime || item.readyInMinutes || 0) < 40;
    }
    if (state.activeFilter === "Budget Friendly" || state.activeFilter === "Budget friendly") {
      return (item.costEstimate || 0) < 4000;
    }
    if (state.activeFilter === "Vegetarian") {
      return (item.tags || []).some((tag) => tag.toLowerCase() === "vegetarian");
    }
    if (state.activeFilter === "Popular") {
      return (item.reviewCount || item.aggregateLikes || 0) > 50;
    }
    return true;
  });

  const recipesPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredExpenses.length / recipesPerPage));
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const paginatedRecipes = filteredExpenses.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [state.activeFilter, query, budgetTitle]);

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const formattedRecipes = filteredExpenses.length === 1 ? "recipe" : "recipes";
  const hasResults = filteredExpenses.length > 0;

  return (
    <>
      {hasResults ? (
        <div className="min-h-screen bg-[#FFF5EB] flex flex-col items-center justify-start px-4 pb-16 sm:px-6 lg:px-8">
          
          {/* Search Bar */}
          <div className="flex w-full max-w-2xl items-center mx-auto mt-10 shadow-sm rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition-all duration-200">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="w-full bg-white px-4 py-3 text-sm md:text-base text-amber-900 placeholder:text-gray-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchQueryhandler()}
            />
            <button
              className="bg-orange-50 px-6 py-3 text-sm md:text-base font-semibold text-orange-600 transition-colors duration-300 hover:bg-orange-600 hover:text-white focus:outline-none"
              onClick={searchQueryhandler}
            >
              Search
            </button>
          </div>

          {/* Heading Section */}
          <div className="w-full max-w-6xl text-left mt-8 px-2">
            <h2 className="text-xl font-poppins font-bold tracking-tight text-amber-900 sm:text-2xl md:text-3xl">
              {description || "Explore Dynamic Flavors"}
            </h2>
            <p className="text-xs md:text-sm font-medium text-amber-700 mt-1.5 uppercase tracking-wider">
              {filteredExpenses.length} {formattedRecipes} available
            </p>
          </div>

          {/* Pill Filters Layout */}
          <div className="w-full max-w-6xl mt-6 overflow-x-auto no-scrollbar scroll-smooth px-2">
            <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-2.5 pb-2">
              {["All", "Nigerian", "Quick Meals", "Budget Friendly", "Vegetarian", "Popular"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => dispatch({ type: "SET_FILTER", payload: filter })}
                  className={`whitespace-nowrap text-xs md:text-sm font-medium font-poppins tracking-tight rounded-full px-4 py-2 border transition-all duration-200 cursor-pointer ${
                    state.activeFilter === filter
                      ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-white border-amber-200 text-amber-900 hover:border-orange-400 hover:bg-orange-50/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Container */}
          <div className="w-full max-w-6xl mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
            {paginatedRecipes.map((recipe) => {
              // High contrast live condition checking
              const isSaved = savedRecipes.some((saved) => saved.id === recipe.id);

              return (
                <div
                  key={recipe.id}
                  onClick={() => navigate(`/details?q=${recipe.id}`)}
                  className="group relative bg-white rounded-2xl shadow-sm border border-amber-100/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/5 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden w-full h-48 md:h-52">
                     <img
  src={recipe.img || recipe.image || "https://placehold.co/600x400/fff3e0/d97706?text=Tasty+Dish"}
  alt={recipe.name || recipe.title}
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop if fallback fails
    e.target.src = "https://placehold.co/600x400/fff3e0/d97706?text=Tasty+Dish";
  }}
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
                      
                      {/* Dynamic, High-Contrast Bookmark Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaved(recipe);
                        }}
                        className={`absolute top-3 right-3 backdrop-blur-sm rounded-full p-2 transition-all duration-300 shadow-md z-10 active:scale-90 ${
                          isSaved 
                            ? "bg-orange-500 hover:bg-orange-600 scale-105" 
                            : "bg-white/90 hover:bg-white"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4.5 w-4.5 transition-colors duration-300 ${
                            isSaved ? "text-white" : "text-orange-500"
                          }`}
                          viewBox="0 0 24 24"
                          fill={isSaved ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth={isSaved ? "0" : "2.5"}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>

                    <h3 className="text-left mt-4 text-base md:text-lg text-amber-900 px-4 tracking-tight font-bold line-clamp-1">
                      {recipe.name || recipe.title}
                    </h3>

                    <div className="flex items-center justify-start mt-3 gap-4 px-4 pb-2 border-b border-amber-50/80">
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
                        <span className="text-amber-600 text-[10px] md:text-xs">⭐</span>
                        <p className="text-amber-900 text-xs font-semibold">{recipe.rating || "4.2"}</p>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
                        <span className="text-amber-600 text-[10px] md:text-xs">⏱️</span>
                        <p className="text-amber-900 text-xs font-semibold">
                          {recipe.cookTime || recipe.readyInMinutes || "25"}m
                        </p>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
                        <span className="text-amber-600 text-[10px] md:text-xs">👥</span>
                        <p className="text-amber-900 text-xs font-semibold">{recipe.servings || "2"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-4 bg-gradient-to-t from-amber-50/20 to-transparent flex items-center justify-between mt-2">
                    <span className="text-xs text-amber-700 font-medium">Estimated Cost</span>
                    <p className="text-orange-600 text-base font-bold">
                      ₦{(recipe.costEstimate || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="w-full max-w-6xl mt-12 px-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-200/60 pt-6">
            
            <div className="text-sm font-medium text-amber-800 font-poppins">
              Showing page <span className="font-bold text-orange-600">{currentPage}</span> of{" "}
              <span className="font-bold text-amber-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <button
                disabled={currentPage === 1}
                onClick={prevPage}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold tracking-tight transition-all duration-200 w-full sm:w-auto ${
                  currentPage === 1
                    ? "bg-amber-100/40 border-amber-200/50 text-amber-400 cursor-not-allowed opacity-60"
                    : "bg-white border-amber-200 text-amber-900 hover:border-orange-500 hover:text-orange-600 active:scale-95 shadow-sm"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Previous
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={nextPage}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold tracking-tight transition-all duration-200 w-full sm:w-auto ${
                  currentPage === totalPages
                    ? "bg-amber-100/40 border-amber-200/50 text-amber-400 cursor-not-allowed opacity-60"
                    : "bg-orange-500 border-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
                }`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      ) : (
        <NoResultFound />
      )}
    </>
  );
}

export default Search;