export function init(initialIngredients) {
  return {
    activeFilter: "All",
    ingredients: initialIngredients
  }
}

export const initialState = {
  activeFilter: "All",
  ingredients: []
}

export function uiReducer(state, action) {
  switch (action.type) {

    case "SET_FILTER":
      return {
        ...state,
        activeFilter: action.payload
      }

    case "ADD_INGREDIENT": {
      const incoming = action.payload
      const merged = [...state.ingredients]
      incoming.forEach(ing => {
        const exists = merged.some(
          i => i.label.toLowerCase() === ing.label.toLowerCase()
        )
        if (!exists) merged.push(ing)
      })
      return {
        ...state,
        ingredients: merged
      }
    }

    case "REMOVE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter(
          i => i.label.toLowerCase() !== action.payload.toLowerCase()
        )
      }

    case "CLEAR_ALL":
      return {
        ...state,
        ingredients: []
      }

    default:
      return state
  }
}