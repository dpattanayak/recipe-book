import { Ingredient } from 'src/app/shared/ingredient.model';
import * as SLActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [], // [new Ingredient('Egg', 12)]
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: SLActions.shoppingListActions
) {
  switch (action.type) {
    case SLActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, <Ingredient>action.payload],
      };

    case SLActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...(<Ingredient[]>action.payload)],
      };

    case SLActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...(<Ingredient>action.payload),
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case SLActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case SLActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: <number>action.payload,
        editedIngredient: { ...state.ingredients[<number>action.payload] },
      };

    case SLActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    default:
      return state;
  }
}
