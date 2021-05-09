import CatsApi from "./api.js";

export default class Categories extends CatsApi {
  constructor(onCategoriesUpdate) {
    super()
    //Inner Lexical Environment
    this.categories = [];
    this.container = document.querySelector('.categories');
    // Outer Lexical Environment (Callback)
    this.onCategoriesUpdate = onCategoriesUpdate;
  }

  async getCategories() {
    //Outer Lexical Environment (call parent class)
    this.categories = await this.get('categories');
  }

  attachListener() {
    //Inner Lexical Environment
    this.container.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      const target = event.target;
      if (target.tagName !== 'BUTTON') return;
      this.onCategoriesUpdate(target.id);
    });
  }

  async drawCategories() {
    //Outer Lexical Environment (call parent class)
    await this.getCategories();
    //Inner Lexical Environment
    this.categories.map((category) => {
      const {id, name} = category;
      let htmlString = '';
      if (name) {
        htmlString += `<button id="${id}" class="category">${name}</button>`;
      }
      this.container.innerHTML += htmlString;
    })
    this.attachListener();
  }
}
