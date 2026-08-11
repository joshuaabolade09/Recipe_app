import { useSearchParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ReactContext } from "../Context/Context";

export default function RecipeDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { allRecipes = [], toggleSaved, savedRecipes = [] } = useContext(ReactContext);

  // Extract 'q' query parameter (e.g., "rec_002")
  const id = searchParams.get("q");

  // Match recipe by ID
  const recipe = allRecipes?.find((item) => String(item.id) === String(id));
  const isSaved = savedRecipes?.some((saved) => String(saved.id) === String(id));

  if (!recipe) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center p-6 text-center bg-[#fffaf5]">
        <h2 className="text-2xl font-black text-[#33211b]">Recipe Not Found</h2>
        <p className="mt-2 text-sm text-[#8a5c45]">No recipe found matching query: {id}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-[#ff7417] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#e85f08]"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  const recipeImg = recipe.image || recipe.imageUrl || recipe.img || recipe.photo;
  const ingredients = recipe.ingredients || recipe.ingredientList || recipe.ingredientsList || [];
  const instructions = recipe.instructions || recipe.steps || recipe.method || [];

  return (
    <div className="min-h-dvh bg-[#fffaf5] text-[#33211b] antialiased">
      <main className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-[#8a5c45] hover:text-[#ff7417]"
          >
            ← Back
          </button>

          {toggleSaved && (
            <button
              onClick={() => toggleSaved(recipe)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold transition ${
                isSaved
                  ? "bg-red-50 text-red-500 border border-red-200"
                  : "bg-orange-50 text-[#ff7417] border border-orange-200"
              }`}
            >
              <svg className={`size-4 ${isSaved ? "fill-current" : ""}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
              </svg>
              {isSaved ? "Saved" : "Save Recipe"}
            </button>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-[#33211b] sm:text-4xl">{recipe.name || recipe.title}</h1>

        {/* Image */}
        {recipeImg && (
          <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-orange-100 shadow-sm">
            <img src={recipeImg} alt={recipe.name} className="size-full object-cover" />
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm text-center">
          <div>
            <p className="text-xs font-bold uppercase text-[#8a5c45]">Est. Cost</p>
            <p className="text-xl font-black text-[#ff7417]">
              ₦{Math.round(recipe.costEstimate || recipe.cost || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-[#8a5c45]">Cook Time</p>
            <p className="text-xl font-black text-[#33211b]">{recipe.cookTime || "--"} mins</p>
          </div>
        </div>

        {/* Ingredients & Steps */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#ff7417] border-b border-orange-100 pb-2">
              Ingredients ({ingredients.length})
            </h2>
            <ul className="mt-4 space-y-2">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center gap-3 rounded-xl bg-[#fffaf5] p-3 text-sm font-semibold text-[#33211b]">
                  <span className="size-2 rounded-full bg-[#ff7417]" />
                  <span>{typeof item === "string" ? item : `${item.amount || ""} ${item.name || ""}`}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#ff7417] border-b border-orange-100 pb-2">
              Instructions
            </h2>
            <ol className="mt-4 space-y-3">
              {instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-sm font-medium leading-relaxed">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-xs font-bold text-[#ff7417]">
                    {index + 1}
                  </span>
                  <p className="mt-0.5 text-[#33211b]">{typeof step === "string" ? step : step.text}</p>
                </li>
              ))}
            </ol>
          </div>

        </div>

      </main>
    </div>
  );
}