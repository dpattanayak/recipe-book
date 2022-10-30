import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../services/auth.service';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private URL: string =
    'https://angular-86654-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.URL, recipes).subscribe((response) => {
      console.log('storeRecipes :', response);
    });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(this.URL).pipe(
          map((recipes) => {
            return recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }),
          tap((recipes) => {
            this.recipeService.setRecipes(recipes);
          })
        );
      })
    );
  }
}
