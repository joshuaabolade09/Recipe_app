import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactContext } from "../Context/Context";

export default function Favourite() {
  const { savedRecipes, toggleSaved } = useContext(ReactContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,116,23,.15),transparent_30%),linear-gradient(135deg,#fff7ed_0%,#ffe9d1_46%,#fffaf5_100%)] text-[#33211b] antialiased selection:bg-orange-200 selection:text-[#33211b]">
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        
        {/* Header Block */}
        <header className="flex items-center gap-4 border-b border-orange-100 pb-5">
          <button 
            onClick={() => navigate(-1)} 
            className="group grid size-11 shrink-0 place-items-center rounded-xl border border-orange-100 bg-white text-[#8a5c45] shadow-[0_8px_24px_rgba(88,54,28,.08)] outline-none transition duration-300 hover:-translate-x-0.5 hover:border-orange-200 hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200" 
            aria-label="Go back"
          >
            <svg className="size-5 transition duration-300 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#33211b] sm:text-3xl">Saved Recipes</h1>
            <p className="mt-1 text-sm font-medium text-[#8a5c45]">Your personal collection of culinary masterpieces</p>
          </div>
        </header>

        {/* Empty State vs. Recipe Grid */}
        <section className="mt-8">
          {!savedRecipes || savedRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-orange-200 bg-[#fffaf5]/50 px-6 py-16 text-center shadow-sm">
              <div className="grid size-16 place-items-center rounded-full bg-orange-50 text-[#ff7417] shadow-inner">
                <svg className="size-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-black text-[#33211b]">No favorites yet</h3>
              <p className="mt-2 max-w-xs text-sm font-semibold text-[#8a5c45]">
                Tap the heart icon on any recipe while browsing to save it here for quick access.
              </p>
              <button 
                onClick={() => navigate("/")} 
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#ff7417] px-6 text-sm font-extrabold text-white shadow-md transition hover:bg-[#e85f08] active:scale-95"
              >
                Explore Recipes
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedRecipes.map((recipe) => {
                const recipeImg = recipe.image || recipe.imageUrl || recipe.img || recipe.photo;

                return (
                  <article 
                    key={recipe.id} 
                    className="group flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_8px_24px_rgba(88,54,28,.05)] transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_55px_rgba(112,66,31,.1)]"
                  >
                    {/* Image Header */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#f7d794] via-[#fff7ed] to-[#d6a35d]">
                      {recipeImg ? (
                        <img 
                          src={recipeImg} 
                          alt={recipe.name || "Recipe image"} 
                          className="size-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <svg className="size-full p-12 opacity-80 transition duration-500 group-hover:scale-105" viewBox="0 0 120 90" fill="none" aria-hidden="true">
                          <ellipse cx="60" cy="62" rx="46" ry="17" fill="#c77c32" opacity=".18" />
                          <ellipse cx="60" cy="51" rx="42" ry="25" fill="#fff7ed" stroke="#d6a35d" strokeWidth="4" />
                          <path d="M35 56c12 5 34 8 52-4" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                      )}
                      
                      {/* Remove Favorite Button */}
                      <button
                        onClick={() => toggleSaved(recipe)}
                        className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/80 text-red-500 backdrop-blur-sm transition hover:bg-white hover:scale-110"
                        title="Remove from saved"
                      >
                        <svg className="size-5 fill-current" viewBox="0 0 24 24">
                          <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
                        </svg>
                      </button>

                      {/* Category Badge */}
                      {recipe.category && (
                        <span className="absolute top-3 left-3 rounded-lg bg-[#33211b]/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                          {recipe.category}
                        </span>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-black tracking-tight text-[#33211b] line-clamp-1 group-hover:text-[#ff7417] transition">
                        {recipe.name || recipe.title}
                      </h3>
                      
                      <div className="mt-2 flex items-center gap-3 text-xs font-bold text-[#8a5c45]">
                        <span className="flex items-center gap-1">
                          <svg className="size-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          Saved
                        </span>
                        {recipe.cookTime && (
                          <>
                            <span>·</span>
                            <span>{recipe.cookTime} mins</span>
                          </>
                        )}
                      </div>

                      <div className="mt-auto pt-5 flex items-center justify-between border-t border-orange-50">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#9a674d]">Est. Cost</p>
                          <p className="text-base font-black text-[#ff7417]">
                            ₦{Math.round(recipe.costEstimate || recipe.cost || 0).toLocaleString()}
                          </p>
                        </div>
                        
                        {/* View Details Button */}
                        <button 
                        onClick={() => navigate(`/details?q=${recipe.id}`)}
                         
                          className="inline-flex h-9 items-center justify-center rounded-lg bg-orange-50 px-4 text-xs font-extrabold text-[#ff7417] transition hover:bg-[#ff7417] hover:text-white"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}