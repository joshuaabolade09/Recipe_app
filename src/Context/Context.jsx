import { createContext, useEffect, useState } from "react";
import recipes from "../data/recipe.json";

export const ReactContext = createContext();

export function ReactProvider({ children }) {
  const [allRecipes, setAllRecipes] = useState([]);
  
  // Initialize savedRecipes directly from localStorage on load
  const [savedRecipes, setSavedRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem("savedRecipes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load all recipes (Local storage + JSON dataset)
  useEffect(() => {
    if (allRecipes.length === 0) {
      const storedApiRecipes = localStorage.getItem("recipes")
        ? JSON.parse(localStorage.getItem("recipes"))
        : [];
      setAllRecipes([...storedApiRecipes, ...recipes]);
    }
  }, [allRecipes.length]);

  // Toggle favorite function
  function toggleSaved(recipe) {
    setSavedRecipes((prev) => {
      const isSaved = prev.some((saved) => String(saved.id) === String(recipe.id));
      let updatedSavedRecipes;

      if (isSaved) {
        updatedSavedRecipes = prev.filter((saved) => String(saved.id) !== String(recipe.id));
      } else {
        updatedSavedRecipes = [...prev, recipe];
      }

      localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
      return updatedSavedRecipes;
    });
  }

  return (
    <ReactContext.Provider
      value={{
        allRecipes,
        setAllRecipes,
        savedRecipes,
        setSavedRecipes,
        toggleSaved,
      }}
    >
      {children}
    </ReactContext.Provider>
  );
}