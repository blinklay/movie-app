import { DivComponent } from "../common/div-compoennt";

export class Search extends DivComponent {
  constructor(state) {
    super()
    this.state = state
  }

  search() {
    const value = this.el.querySelector('.search__input').value

    if (value) {
      this.state.searchQuery = value
    }

  }

  render() {
    this.el.classList.add('search')
    this.el.innerHTML = `
      <input class="search__input" placeholder="Введите название фильма...">
    <button class="search__btn">Поиск</button>
    `

    this.el.querySelector('.search__input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.search()
      }
    })

    this.el.querySelector('.search__btn').addEventListener('click', () => {
      this.search()
    })

    return this.el
  }
}