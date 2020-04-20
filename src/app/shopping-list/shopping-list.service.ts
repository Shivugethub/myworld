import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChange.next(this.ingredients.slice());
  }
  updateIngredient(index:number,newIngredient:Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChange.next(this.ingredients.slice());
  }
  removeIngredient(index: number) {
    this.ingredients.splice(index,1);
    this.ingredientChange.next(this.ingredients.slice());
  }
}
