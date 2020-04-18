import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes',component: RecipeComponent,children:[
    {path: '', component: RecipesStartComponent},
    {path: 'new',component:RecipesEditComponent},
    {path: ':id',component: RecipeDetailComponent},
    {path: ':id/edit',component: RecipesEditComponent},
  ]},
  {path: 'shopping-list',component: ShoppingListComponent}
]
@NgModule({
imports: [RouterModule.forRoot(appRoutes,{useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule {}
