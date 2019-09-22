import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A  Fruit Salad', 'this is simply a test', 'https://live.staticflickr.com/5737/30622968353_35e06fcb52_b.jpg'),
    new Recipe('An  Apple Recipe', 'this is simply a test', 'https://www.maxpixel.net/static/photo/1x/Cook-At-Home-Polska-Food-A-Simple-Recipe-4233326.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
