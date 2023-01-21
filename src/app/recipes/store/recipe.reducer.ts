import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...(action.payload as Recipe[])],
      };

    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload as Recipe],
      };

    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[(action.payload as RecipesActions.UpdateRecipe).index],
        ...(action.payload as RecipesActions.UpdateRecipe).newRecipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[(action.payload as RecipesActions.UpdateRecipe).index] =
        updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== (action.payload as number);
        }),
      };

    default:
      return state;
  }
}
