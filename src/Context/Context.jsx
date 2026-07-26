import { createContext,  useEffect, useState } from "react";
import recipes from "../data/recipe.json"


export const ReactContext= createContext()
  

export function ReactProvider({children}){
     const [allRecipes, setAllRecipes] = useState([])
     const [savedRecipes, setSavedRecipes] = useState([])
     console.log("ReactProvider is rendering")
      
    useEffect(
        ()=>{

            if (allRecipes.length===0){
               
 //function SavedRecipw clicked

  //Get the ApI recipe from localStorage

 

 const combinedRecipes = localStorage.getItem("recipes") ? JSON.parse(localStorage.getItem("recipes")) : []
  const
  bothRecipes= [...combinedRecipes, ...recipes]
   setAllRecipes(bothRecipes)
  
            }
        }, [allRecipes.length]
    )

     
 function toggleSaved(recipe){
    setSavedRecipes((prev) => { 
        const isSaved = prev.some((saved) => saved.id === recipe.id)
        if (isSaved) {
            const updatedSavedRecipes = prev.filter((saved) => saved.id !== recipe.id)
            localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes))
            return updatedSavedRecipes
           
        } else {
            const updatedSavedRecipes = [...prev, recipe]
            localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes))
            return updatedSavedRecipes
        }
    })

 }


const RecipesavedfromlocalStorage = localStorage.getItem("savedRecipes") ? JSON.parse(localStorage.getItem("savedRecipes")) : []
useEffect(() => {
    setSavedRecipes(RecipesavedfromlocalStorage)
}, [])

    return(

        <ReactContext.Provider value={{allRecipes, setAllRecipes, savedRecipes, setSavedRecipes, toggleSaved}}>{children}</ReactContext.Provider>
    )
}

