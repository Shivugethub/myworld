import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  constructor(
    private recipeService: RecipeService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllRecipes();
  }
  getAllRecipes() {
    this.recipes = this.recipeService.getRecipes();
  }
  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.actRoute});
  }
}
