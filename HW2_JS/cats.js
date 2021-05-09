import CatsApi from "./api.js";

export default class Cats extends CatsApi {
  constructor() {
    super();
    //Inner Lexical Environment
    this.cats = []
    this.container = document.querySelector('.cats');
  }

  async getCatsByBreed() {
    //Outer Lexical Environment (call parent class)
    this.cats = await this.get('breeds');
  }

  async getCatsByCategory(id) {
    //Outer Lexical Environment (call parent class)
    this.cats = await this.get(`images/search?page=0&limit=50&order=Desc&category_ids=${id}`);
  }

  drawCards(firstLoad = false) {
    //Inner Lexical Environment
    this.container.innerHTML = '';
    if (firstLoad) {
      const heading = document.createElement('h2');
      heading.innerHTML = 'Random cats';
      this.container.insertAdjacentElement('beforebegin', heading);
    } else {
      document.querySelector('h2').innerHTML = 'Cat Images by category';
    }
    this.cats.map((cat, index) => {
      const divImg = document.createElement('div');
      const {image, description, name, origin, temperament, country_code, url} = cat;

      let htmlString = '';
      // Image by category
      if (url) {
        htmlString += `<img loading="lazy" class="cat-img" src="${url}" alt="cat">`;
      }
      // Image by breed
      if (image) {
        const img = image.url ? image.url : 'https://i.pinimg.com/236x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg';
        htmlString += `<img loading="lazy" class="cat-img" src="${img}" alt="cat">`;
      }
      if (name) {
        htmlString += `<div class="name">${name}</div>`;
      }
      if (description) {
        htmlString += `<div class="description">${description}</div>`;
      }
      if (origin) {
        const country_flag_url = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${country_code.toLowerCase()}.svg`;
        htmlString += `<div class="origin"><img class="flag-img" alt="${country_code}" src="${country_flag_url}" />${origin}</div>`;
      }
      if (temperament) {
        htmlString += `<div class="temperament">${temperament}</div>`;
      }
      divImg.innerHTML = htmlString;
      divImg.classList.add('card', `cat-${index}`);
      this.container.appendChild(divImg);
    })
  }

  async drawCardsByBreed() {
    //Inner Lexical Environment
    await this.getCatsByBreed();
    this.drawCards(true);
  }

  async drawCardsByCategory(id) {
    //Inner Lexical Environment
    await this.getCatsByCategory(id);
    this.drawCards(false);
  }
}
