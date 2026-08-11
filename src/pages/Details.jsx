import "../index.css"
import recipes from "../data/recipe.json"

import {useNavigate, useSearchParams } from "react-router-dom";







function Details() {
  const planning ="weekly"
  const navigate= useNavigate()
  const [searchParams] = useSearchParams();

  const recipeId= searchParams.get("q")
  const savedRecipe= "recipe";

  //Get the ApI recipe from localStorage

 const apiRecipes = localStorage.getItem("recipes") ? JSON.parse(localStorage.getItem("recipes")) : []
  const
  allRecipes= [...apiRecipes, ...recipes]

  const recipe= allRecipes.find((recipe)=> recipe.id===recipeId || recipe.id === Number(recipeId))

  function openPlanner(e){
     
    navigate('/Planner')

  }

  function openSavedRecipe(e){
    navigate(`/SavedRecipe?saved=${savedRecipe}`)

  }
  

  
  return (
 <div className="min-h-screen text-ink antialiased">
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(215,96,0,.18),transparent_32%),linear-gradient(135deg,#fff6eb_0%,#f2e1cf_48%,#fffaf3_100%)] ">
      <section className="mx-auto min-h-screen w-full overflow-hidden bg-cream shadow-recipe  sm:border sm:border-white/70">
        <header className="relative z-20 flex h-[61px] items-center justify-between border-b border-[#eee0d2] bg-[#fffaf3]/95 px-7 backdrop-blur">
          <button className="group inline-flex items-center gap-3 rounded-full text-[15px] font-extrabold text-[#30231f] outline-none transition hover:text-ember focus-visible:ring-4 focus-visible:ring-orange-200" aria-label="Go back" onClick={()=>navigate(-1)}>
            <svg className="h-6 w-6 text-clay transition duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
              <path d="m12 5-7 7 7 7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-6 text-clay">
            <button onClick={(e)=> openSavedRecipe()} className="group grid h-10 w-10 place-items-center rounded-full outline-none transition hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200" aria-label="Favorite recipe">
              <svg className="h-8 w-8 transition duration-300 group-hover:scale-110 group-hover:text-ember" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={(e)=> openPlanner()} className="group grid h-10 w-10 place-items-center rounded-full outline-none transition hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200" aria-label="Add to calendar">
              <svg className="h-8 w-8 transition duration-300 group-hover:scale-110 group-hover:text-ember" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3.5" y="4.5" width="17" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 2.75v4M16 2.75v4M3.5 9h17M12 12.2v5.1M9.45 14.75h5.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <figure className="hero-crop relative overflow-hidden bg-[#6d3b14]">
          <img
            className="origin-center"
            src={recipe.img || recipe.image}
            alt="A bowl of Nigerian jollof rice with chicken, peas, and parsley"
          />
          <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-black/12 to-transparent"></div>
        </figure>

        <article className="relative -mt-0 rounded-t-[10px] bg-cream px-9 pb-5 pt-5 animate-sheetIn sm:rounded-t-[12px]">
          <section className="border-b border-[#efe3d7] pb-5">
            <h1 className="animate-rise text-[40px] font-extrabold leading-[1.04] tracking-normal text-[#241a17] sm:text-[42px]">{recipe.name}</h1>

            <div className="mt-3 grid grid-cols-2 gap-y-3 text-[15px] font-semibold text-[#4b403d] min-[560px]:flex min-[560px]:items-center min-[560px]:gap-0">
              <div className="flex items-center gap-2 min-[560px]:pr-7">
                <svg className="h-5 w-5 text-ember" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="m12 2.2 2.98 6.04 6.66.97-4.82 4.7 1.14 6.64L12 17.42l-5.96 3.13 1.14-6.64-4.82-4.7 6.66-.97L12 2.2Z" />
                </svg>
                <span>{recipe.rating} <span className="font-medium text-[#9a8276]">({recipe.reviewCount})</span></span>
              </div>
              <div className="flex items-center gap-2 border-[#efe3d7] min-[560px]:border-l min-[560px]:px-7">
                <svg className="h-5 w-5 text-clay" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{recipe.cookTime} mins</span>
              </div>
              <div className="flex items-center gap-2 border-[#efe3d7] min-[560px]:border-l min-[560px]:px-7">
                <svg className="h-5 w-5 text-clay" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M16 11.5a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2ZM7.6 12.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z" fill="currentColor" />
                  <path d="M2.9 20c.42-3.16 2.2-5.05 4.7-5.05 1.23 0 2.27.45 3.06 1.25M11.1 20.05c.43-3.86 2.3-6.1 4.9-6.1s4.47 2.24 4.9 6.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2 border-[#efe3d7] min-[560px]:border-l min-[560px]:pl-7">
                <svg className="h-5 w-5 text-clay" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.25 12 12 20.25 3.75 12 12 3.75 20.25 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="1.65" fill="currentColor" />
                </svg>
       <span className="font-extrabold text-[#2b201d]">
  {typeof recipe.id === "number" 
    ? `₦${recipe.costEstimate.toLocaleString()} est.` 
    : `₦${recipe.costEstimate.toLocaleString()}`}
</span>
              </div>
            </div>

            <p className="mt-5 max-w-[855px] text-[16px] font-medium leading-7 text-[#352b27] line-clamp-4">
            {recipe.description}
            </p>

            <div className="mt-5 grid gap-5 min-[560px]:grid-cols-2">
              <button className="group inline-flex h-12 items-center justify-center gap-3 rounded-[8px] border-2 border-clay bg-transparent px-5 text-[16px] font-extrabold text-clay outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-soft focus-visible:ring-4 focus-visible:ring-orange-200">
                <svg className="h-7 w-7 transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Save Recipe
              </button>
              <button className="group inline-flex h-12 items-center justify-center gap-3 rounded-[8px] bg-ember px-5 text-[16px] font-extrabold text-white shadow-soft outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-emberDark focus-visible:ring-4 focus-visible:ring-orange-200">
                <svg onClick={(e)=>openPlanner()}className="h-6 w-6 transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="4.5" width="17" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 2.75v4M16 2.75v4M3.5 9h17M12 12.2v5.1M9.45 14.75h5.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Add to Planner
              </button>
            </div>
          </section>

          <section className="grid gap-8 border-b border-[#efe3d7] py-5 md:grid-cols-[.84fr_1.16fr] md:gap-8">
            <div className="animate-rise [animation-delay:.12s]">
              <h2 className="text-[21px] font-extrabold leading-none text-[#241a17]">Ingredients</h2>
              <div className="mt-2 h-0.5 w-9 rounded-full bg-clay"></div>
              <ul className="mt-4 space-y-2.5 text-[13.5px] font-semibold leading-5 text-[#3a2d29] sm:text-[14px]">
             {recipe.ingredients?.map((ingredient)=>(
                              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay"></span>{ingredient.quantity} {ingredient.name}</li>

             ))

             } 
               
              </ul>
            </div>

            <div className="border-[#efe3d7] animate-rise md:border-l md:pl-8 [animation-delay:.18s]">
              <h2 className="text-[21px] font-extrabold leading-none text-[#241a17]">Instructions</h2>
              <div className="mt-2 h-0.5 w-9 rounded-full bg-clay"></div>
              <ol className="mt-4 space-y-2.5 text-[13.5px] font-semibold leading-5 text-[#3a2d29] sm:text-[14px]">
                {Array.isArray(recipe.instructions)?recipe.instructions.map((instructions, index)=>(
                  <li className="grid grid-cols-[22px_1fr] gap-3  "><span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-orange-50 text-[11px] font-extrabold text-clay">{index + 1}</span>{instructions}</li>

                )): <a>{recipe.instructions}</a>}
                
              </ol>
            </div>
          </section>

          <section className="animate-rise py-4 [animation-delay:.24s]">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-[8px] border border-[#efe3d7] bg-cream px-7 py-3 shadow-[0_1px_0_rgba(255,255,255,.8)_inset] ">
              <div className="mr-2 flex items-center gap-3 text-[15px] font-extrabold text-[#2c211e]  ">
                <svg className="h-7 w-7 text-clay" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.25 12 12 20.25 3.75 12 12 3.75 20.25 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="1.65" fill="currentColor" />
                </svg>
                Tags
              </div>
              {recipe.tags.map((tag)=>(
                <span className="rounded-full bg-[#fff0dd] px-5 py-2 text-[13px] font-bold text-clay">{tag}</span>
              ))}
             
            </div>
          </section>

          <section className="grid grid-cols-2 overflow-hidden rounded-[8px] border border-[#efe3d7] bg-cream shadow-[0_1px_0_rgba(255,255,255,.8)_inset] sm:grid-cols-4">
            <div className="flex min-h-[64px] items-center gap-3 border-b border-r border-[#efe3d7] px-7 py-3 sm:border-b-0">
              <svg className="h-8 w-8 shrink-0 text-ember animate-pulseSoft rounded-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8.6 14.4c0-2.63 2.83-3.6 2.1-7.9 3.22 1.88 5.5 4.38 5.13 8.04.84-.78 1.3-1.78 1.43-2.97 1.12 1.34 1.72 2.78 1.72 4.19 0 3.2-2.8 5.74-6.47 5.74-3.73 0-6.5-2.34-6.5-5.64 0-1.68.8-3.1 2.02-4.36.02 1.1.2 2.05.57 2.9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <p className="text-[13px] font-bold leading-4 text-[#2d211d]">Calories<br /><span className="font-extrabold text-clay">{recipe.calories} kcal</span></p>
            </div>
            <div className="flex min-h-[64px] items-center gap-3 border-b border-[#efe3d7] px-7 py-3 sm:border-b-0 sm:border-r">
              <svg className="h-8 w-8 shrink-0 text-ember" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 19V11M10 19V7M15 19v-4M20 19V3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
              <p className="text-[13px] font-bold leading-4 text-[#2d211d]">Difficulty<br /><span className="font-extrabold text-clay">{recipe.difficulty}</span></p>
            </div>
            <div className="flex min-h-[64px] items-center gap-3 border-r border-[#efe3d7] px-7 py-3">
              <svg className="h-8 w-8 shrink-0 text-ember" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[13px] font-bold leading-4 text-[#2d211d]">Prep Time<br /><span className="font-extrabold text-clay">{recipe.prepTime} mins</span></p>
            </div>
            <div className="flex min-h-[64px] items-center gap-3 px-7 py-3">
              <svg className="h-8 w-8 shrink-0 text-ember" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7.5 20.5h9M8 16.5h8v4H8v-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.1 16.5a4.8 4.8 0 0 1-1.57-9.34 5.75 5.75 0 0 1 10.94 0A4.8 4.8 0 0 1 15.9 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[13px] font-bold leading-4 text-[#2d211d]">Cook Time<br /><span className="font-extrabold text-clay">{recipe.cookTime} mins</span></p>
            </div>
          </section>
        </article>
      </section>
    </main>
  </div>
  )
}
export default Details;