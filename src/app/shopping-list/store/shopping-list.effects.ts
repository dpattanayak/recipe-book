import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as fromApp from '../../store/app.reducer';
import * as shoppingListActions from '../store/shopping-list.actions';

@Injectable()
export class ShoppingListEffects {
  private URL: string =
    'https://angular-86654-default-rtdb.firebaseio.com/ingredients.json';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect()
  fetchIngredients = this.actions$.pipe(
    ofType(shoppingListActions.FETCH_INGREDIENTS),
    switchMap(() => {
      return this.http.get<Ingredient[]>(this.URL);
    }),
    map((ingredients) => {
      if (ingredients)
        return new shoppingListActions.SetIngredients(ingredients);
    })
  );

  @Effect({ dispatch: false })
  storeIngredients = this.actions$.pipe(
    ofType(
      shoppingListActions.ADD_INGREDIENT,
      shoppingListActions.ADD_INGREDIENTS,
      shoppingListActions.UPDATE_INGREDIENT,
      shoppingListActions.DELETE_INGREDIENT
    ),
    withLatestFrom(this.store.select('shoppingList')),
    switchMap(([actionData, ingredientsState]) => {
      return this.http.put(this.URL, ingredientsState.ingredients);
    })
  );
}
