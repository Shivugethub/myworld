import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  constructor(private dataStoredService:DataStorageService) { }

  ngOnInit() {
    this.dataStoredService.getAllData().subscribe();
  }
}
