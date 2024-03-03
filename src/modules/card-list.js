import { DivComponent } from "../common/div-compoennt";
import { Card } from "./card";

export class CardList extends DivComponent {
  constructor(appState, state) {
    super()
    this.appState = appState
    this.state = state
  }

  render() {
    this.el.innerHTML = `<h1 class="card-list__title">Последние релизы</h1>`

    if (this.state.loading) {
      this.el.classList.add('card-list__loader')
      const cards = document.createElement('div')
      cards.classList.add('card-list__wrapper')

      for (let i = 0; i < 4; i++) {
        cards.append(new Card(this.appState, this.state, { nameRu: null, filmId: null, posterUrlPreview: null, rating: null }).render())
      }

      this.el.append(cards)
      return this.el
    }
    this.el.classList.add('card-list')

    const cards = document.createElement('div')
    cards.classList.add('card-list__wrapper')

    for (const card of this.state.list) {
      cards.append(new Card(this.appState, this.state, card).render())
    }

    this.el.append(cards)
    return this.el
  }
}