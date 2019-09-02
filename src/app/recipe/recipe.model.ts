// export class Recipe {
//   public name: string;
//   public description: string;
//   public imagePath: string;

//   constructor(name: string, desc: string, imagePath: string) {
//     this.name = name;
//     this.imagePath = imagePath;
//     this.description = desc;
//   }
// }


// or
// // In TypeScript you can implement like this

export class Recipe {
  constructor(
    public name= '',
    public description: string,
    public imagePath: string
  ) {}
}
