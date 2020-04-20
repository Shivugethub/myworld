import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subScription: Subscription;
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
    this.subScription = this.recipeService.recipeChange.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }
  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.actRoute});
  }
  ngOnDestroy() {
    this.subScription.unsubscribe();
  }
}
