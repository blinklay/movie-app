import { DivComponent } from "../common/div-compoennt";

import noImage from '../img/no-image.png'

export class Card extends DivComponent {
  constructor(appState, state, card) {
    super()
    this.appState = appState
    this.state = state
    this.card = card
  }

  render() {
    this.el = document.createElement('a')
    this.el.href = this.card.filmId
    this.el.classList.add('card')
    this.el.innerHTML = `
    <div class="card__poster">  
      <img src="${this.card.posterUrlPreview ? this.card.posterUrlPreview : noImage}" alt="Постер фильма">
    </div>
    <div class="card__rating">${this.card.rating ? this.card.rating.toFixed(1) : "Без рейтинга"}</div>
    <h3 class="card__title">
      <span>${this.card.nameRu ? this.card.nameRu : this.card.nameEn}</span>
    </h3>
    `
    return this.el
  }
}