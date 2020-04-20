import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map,tap} from 'rxjs/operators';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http:HttpClient, private recipeService:RecipeService) {}
  URL: string = 'https://my-recipe-db.firebaseio.com/recipes.json';
  getAllData() {
    return this.http.get<Recipe[]>(this.URL).pipe(map(recipes =>{
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
      })
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    );
  }
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.URL,recipes).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
