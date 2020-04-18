import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('A  Fruit Salad', 'this is simply a test',
    'https://live.staticflickr.com/5737/30622968353_35e06fcb52_b.jpg',[
    new Ingredient('Fruits',1),
    new Ingredient('French Fries',20),
  ]),
    new Recipe('An  Apple Recipe', 'this is simply a test', 'assets/img/apple-recipe.jpg',[
      new Ingredient('Apple',1),
      new Ingredient('Milk',1),
    ])
  ];
  constructor(private sLService:ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngShoppingList(ingredient:Ingredient[]) {
    this.sLService.addIngredients(ingredient);
  }
}
