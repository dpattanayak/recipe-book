import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

import * as shoppingListActions from './store/shopping-list.actions';
import * as fromRoot from '../store/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    this.store.dispatch(new shoppingListActions.FetchIngredients());
  }

  onEditItem(index: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }
}
