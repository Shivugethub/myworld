import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesStartComponent } from '../recipes/recipes-start/recipes-start.component';
import { RecipesEditComponent } from '../recipes/recipes-edit/recipes-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';

const routes: Routes = [
  {path: '',component: RecipeComponent, canActivate:[AuthGuard],
    children:[
    {path: '', component: RecipesStartComponent},
    {path: 'new',component:RecipesEditComponent},
    {path: ':id',component: RecipeDetailComponent, resolve: [RecipeResolverService]},
    {path: ':id/edit',component: RecipesEditComponent, resolve: [RecipeResolverService]},
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
