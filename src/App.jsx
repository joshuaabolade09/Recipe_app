import { useReducer, lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ReactProvider } from "./Context/Context"

import HeaderLayout from "./components/HeaderLayout"
import Dashboard from "./pages/Dashboard"
import Favourite from "./pages/Favourite"
import PageLoader from "./pages/PageLoader"
import NoResultFound from "./pages/noResultFound"
import Loading from "./components/Loading"
import RecipeDetails from "./pages/RecipeDetails";
// If Profile is lazy-loaded (like Planner or Search):
const Profile = lazy(() => import("./pages/Profile"))

// OR if it's a standard import:
// import Profile from "./pages/Profile"

const SavedRecipe = lazy(() => import("./pages/SavedRecipe"))
const Planner = lazy(() => import("./pages/Planner"))
const Search = lazy(() => import("./pages/Search"))
const IngredientResult = lazy(() => import("./pages/IngredientResult"))
const Details = lazy(() => import("./pages/Details"))

function App() {
  const initialState = []
  
  // eslint-disable-next-line no-unused-vars
  function uiReducer(state, action) {
    return state
  }

  const [state, dispatch] = useReducer(uiReducer, initialState)

  return (
    <div>
      <ReactProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Parent Route with layout */}
              <Route path="/" element={<HeaderLayout state={state} dispatch={dispatch} />}>
                {/* Nested Routes */}
                <Route index element={<Dashboard state={state} dispatch={dispatch} />} />
                <Route path="recipe/:id" element={<RecipeDetails state={state} dispatch={dispatch} />} />
                <Route path="favourites" element={<Favourite state={state} dispatch={dispatch} />} />
                <Route path="loading" element={<Loading state={state} dispatch={dispatch} />} />
                <Route path="profile" element={<Profile state={state} dispatch={dispatch} />} />
                <Route path="noResultFound" element={<NoResultFound state={state} dispatch={dispatch} />} />
                <Route path="SavedRecipe" element={<SavedRecipe state={state} dispatch={dispatch} />} />
                <Route path="planner" element={<Planner state={state} dispatch={dispatch} />} />
                <Route path="search" element={<Search state={state} dispatch={dispatch} />} />
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