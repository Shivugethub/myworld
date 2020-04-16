import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  constructor(private sLService:ShoppingListService) { }

  ngOnInit() {
    this.getAllIngredients();
  }

  getAllIngredients() {
    this.ingredients = this.sLService.getIngredients();
    this.sLService.ingredientChange.subscribe(
      (changedIngredient:Ingredient[]) => {
        this.ingredients = changedIngredient;
      }
    )
  }

}
