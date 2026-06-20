import { createContext, useContext, useState } from "react";


export const ReactContext= createContext()

export function ReactProvider({children}){

    const [allRecipes, setAllRecipes] = useState([])

    return(

        <ReactContext.Provider value={{allRecipes, setAllRecipes}}>{children}</ReactContext.Provider>
    )
}

