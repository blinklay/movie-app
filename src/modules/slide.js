import { DivComponent } from "../common/div-compoennt";

export class Slide extends DivComponent {
  constructor(card) {
    super()
    this.card = card
  }

  render() {
    this.el = document.createElement('a')
    this.el.href = "#film" + this.card.kinopoiskId
    this.el.classList.add('swiper-slide')
    console.log(this.card);
    this.el.innerHTML = `
    <div class="slide__poster">
      <img class="slide__poster-img" src="${this.card.posterUrlPreview}">
    </div>
    <div class="slide__top">
      <div class="slide__rating">${this.card.ratingImdb ? this.card.ratingImdb : 'Без рейтинга'}</div>
      <div class="slide__year">${this.card.year}</div>
    </div>
    <div class="slide__bottom">
      <h2 class="slide__title">${this.card.nameRu ? this.card.nameRu : this.card.nameOriginal}</h2>
      <ul class="slide__bottom-coutries">
      </ul>
    </div>
    `

    let items = ""
    for (const cardCountry of this.card.countries) {
      items += `<li class="slide__bottom-coutry">${cardCountry.country}</li>`
    }
    this.el.querySelector('.slide__bottom-coutries').innerHTML = items

    return this.el
  }
}