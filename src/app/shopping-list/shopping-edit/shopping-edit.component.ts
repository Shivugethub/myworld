import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm;
  subScription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subScription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({name:this.editedItem.name,amount:this.editedItem.amount});
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.resetForm();
  }
  resetForm() {
    this.slForm.reset();
    this.editMode = false;
  }
  onRemoveItem(index?:number) {
    this.slService.removeIngredient(index);
    this.resetForm();
  }
 ngOnDestroy() {
   this.subScription.unsubscribe();
 }
}
