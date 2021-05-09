import Cats from "./cats.js";
import Categories from "./categories.js";

class App {

  constructor() {
    //Outer Lexical Environment
    this.cats = new Cats();
    this.categories = new Categories(this.onCategoriesClick.bind(this));
  }

  async onCategoriesClick(id) {
    //Inner Lexical Environment
    await this.cats.drawCardsByCategory(id);
  }

  async init() {
    //Inner Lexical Environment
    await Promise.all([this.cats.drawCardsByBreed(), this.categories.drawCategories()]);
  }
}
//Global Lexical Environment
const app = new App();
app.init();
