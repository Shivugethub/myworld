import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path:'recipes', loadChildren: () => import ('./recipe/recipes.module').then(lm => lm.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import ('./shopping-list/shopping.list.module').then(lm => lm.ShoppingListModule)}
]
@NgModule({
imports: [RouterModule.forRoot(appRoutes,{useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule {}
