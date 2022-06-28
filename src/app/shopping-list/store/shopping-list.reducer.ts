import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return  {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [...state.ingredients, ...action.payload]
      };
      case ShoppingListActions.UPDATE_INGREDIENT:
        const Ingredient = state.ingredients[action.payload.index];
        const updatedIngredient = {
          ...Ingredient,
          ...action.payload.ingredient
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.payload.index] = updatedIngredient;

        return {
          ...state,
          ingredients: updatedIngredients
      };
      case ShoppingListActions.DELETE_INGREDIENT:


        return {
          ...state,
          ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
            return ingredientIndex !== action.payload;
          })
      };
      default:
      return state;
  }
}
