import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { Recipe } from 'src/app/recipe/recipe.model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm:FormGroup;
  constructor
  (
    private actRoute:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe(
    (params:Params) => {
     this.id = +params['id'];
     this.editMode = params['id'] != null;
     this.initForm();
    })
  }
 private initForm() {
   let recipeName = '';
   let recipeImagePath = '';
   let recipeDescription = '';
   let recipeIngredients = new FormArray([]);
   if(this.editMode) {
     const recipe = this.recipeService.getRecipe(this.id);
     recipeName = recipe.name;
     recipeImagePath = recipe.imagePath;
     recipeDescription = recipe.description;
     if(recipe['ingredients']) {
       for(let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            'name':  new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        );
       }
     }
   }
  this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName,Validators.required),
    'imagePath': new FormControl(recipeImagePath,Validators.required),
    'description': new FormControl(recipeDescription,Validators.required),
    'ingredients': recipeIngredients
  })
 }
 get getControls() {
   return (this.recipeForm.get('ingredients') as FormArray).controls;
 }
 addIngredient() {
   (this.recipeForm.get('ingredients') as FormArray).push(
     new FormGroup({
      'name':  new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
     })
   )
 }
 onCancel() {
   this.router.navigate(['../'],{relativeTo:this.actRoute});
 }
 onDeleteIng(index: number) {
   (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
 }
 submitRecipe() {
   const newRecipe = new Recipe(this.recipeForm.value['name'],
   this.recipeForm.value['description'],
   this.recipeForm.value['imagePath'],
   this.recipeForm.value['ingredients'])
   if(this.editMode) {
    this.recipeService.updateRecipe(this.id, newRecipe);
   } else {
    this.recipeService.insertRecipe(newRecipe);
   }
   this.onCancel();
 }
}
