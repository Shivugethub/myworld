// export class Ingredient {
//   public name: string;
//   public amount: number;

//   constructor(name: string , amount: number) {
//     this.name = name;
//     this.amount = amount;
//   }
// }


// or
// In TypeScript you can implement like this
export class Ingredient {
  constructor(
    public name: string,
    public amount: number
  ) {}
}
