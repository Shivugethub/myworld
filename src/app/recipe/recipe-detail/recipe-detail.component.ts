import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;
 id: number;
  constructor(private recipeService:RecipeService,private actRoute:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.actRoute.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
        console.log(this.recipe)
      }
    )
  }
  addToShoppingList() {
    this.recipeService.addIngShoppingList(this.recipe.ingredients);
  }
  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.actRoute});
    // this.router.navigate(['../',this.id, 'edit'], {relativeTo: this.actRoute})
  }
  deleteRecipeItem() {
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
