// export class Recipe {
//   public name: string;
//   public description: string;
//   public imagePath: string;
// public ingredients: Ingredient[]
import { Ingredient } from '../shared/ingredient.model';

//   constructor(name: string, desc: string, imagePath: string) {
//     this.name = name;
//     this.description = desc;
//     this.imagePath = imagePath;
//     this.ingredients = ingredients;
//   }
// }


// or
// // In TypeScript you can implement like this

export class Recipe {
  constructor(
    public name= '',
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}
}
