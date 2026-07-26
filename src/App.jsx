import { useReducer } from "react"
import HeaderLayout from "./components/HeaderLayout"
import {ReactProvider} from "./Context/Context"

import Favourite from "./pages/Favourite"


import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import PageLoader from "./pages/PageLoader"

import NoResultFound from "./pages/noResultFound"
import Loading from "./components/Loading"
import { lazy, Suspense } from "react"
import ModalPlanner from "./pages/ModalPlanner"
const SavedRecipe= lazy(()=> import("./pages/SavedRecipe"))
const Planner = lazy(()=> import ("./pages/Planner"))
const Search= lazy(()=> import("./pages/Search"))
const IngredientResult = lazy(()=> import ("./pages/IngredientResult"))
const Details= lazy(()=> import("./pages/Details"))






function App(){
     const initialState=[]
    // eslint-disable-next-line no-unused-vars
    function uiReducer(state,action){
        return state

    }
 
   
const [state, dispatch]= useReducer(uiReducer,initialState)
    return (

        <div>
<ReactProvider>
            <BrowserRouter>
            <Suspense fallback={<PageLoader/>}>
        
          

   <Routes>
    {/* Parent Route with layout */}
    <Route path="/" element={<HeaderLayout state={state} dispatch={dispatch} />}>
      {/* Nested Routes */}
      <Route index element={<Dashboard state={state} dispatch={dispatch} />} /> {/* Default route when path is "/" */}
      <Route path="favourites" element={<Favourite state={state} dispatch={dispatch} />} />
      <Route path="loading" element={<Loading state={state} dispatch={dispatch}/>}/>
      <Route path="noResultFound" element={<NoResultFound state={state} dispatch={dispatch}/>}/>
      <Route path="SavedRecipe" element={<SavedRecipe state={state} dispatch={dispatch}/>}/>
      <Route path="planner" element={<Planner state={state} dispatch={dispatch} />} />
      <Route path="search" element={<Search state={state} dispatch={dispatch} />} />
       <Route path="modal" element={<ModalPlanner state={state} dispatch={dispatch} />} />
      <Route path="ingredientResult" element={<IngredientResult state={state} dispatch={dispatch} />} />

    </Route>
    <Route path="details" element={<Details state={state} dispatch={dispatch} />} />
  </Routes>
            </Suspense>
            </BrowserRouter>
            </ReactProvider>


        </div>
    )
  



}

export default App