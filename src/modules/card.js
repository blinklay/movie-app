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
    let currentFilmName = ""
    if (this.card.nameRu) {
      currentFilmName = this.card.nameRu
    } else if (this.card.nameEn) {
      currentFilmName = this.card.nameEn
    } else {
      currentFilmName = this.card.nameOriginal
    }
    this.el = document.createElement('a')
    this.el.href = `#film${this.card.filmId ? this.card.filmId : this.card.kinopoiskId}`
    this.el.classList.add('card')
    this.el.innerHTML = `
    <div class="card__poster">  
      <img src="${this.card.posterUrlPreview ? this.card.posterUrlPreview : noImage}" alt="Постер фильма">
    </div>
    <div class="card__rating">${parseFloat(this.card.rating) ? parseFloat(this.card.rating).toFixed(1) : "Без рейтинга"}</div>
    <h3 class="card__title">
      <span>${currentFilmName}</span>
    </h3>
    `
    return this.el
  }
}