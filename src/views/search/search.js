import { AbstractView } from "../../common/view";
import { CardList } from "../../modules/card-list";
import { DataBase } from "../../modules/data-base";
import { Header } from "../../modules/header";
import { Search } from "../../modules/search";
import onChange from "on-change";
export class SearchView extends AbstractView {
  #apiUrl = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

  state = {
    loading: false,
    list: [],
    searchQuery: undefined,
    offset: 1,
    filmFound: 0,
  }

  constructor(appState) {
    super()
    this.appState = appState
    this.state = onChange(this.state, this.stateHook.bind(this))
    this.setTitle('Поиск фильмов')
  }

  stateHook(path) {
    if (path === 'searchQuery') {
      this.loadList(this.state.searchQuery)
    }
    if (path === 'list' || path === 'loading') {
      this.render()
    }
  }

  async loadList(q) {
    this.state.loading = true

    const data = await new DataBase().getData(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${q}&page=${this.state.offset}`)
    console.log(data.films);
    this.state.filmFound = data.searchFilmsCountResult
    this.state.list = data.films

    this.state.loading = false
  }

  render() {
    this.app.innerHTML = ""
    const main = document.createElement('div')
    main.innerHTML = `<h1 class="search__title title-first">Поиск фильмов</h1>`
    this.renderHeader()
    main.append(new Search(this.state).render())
    main.append(new CardList(this.appState, this.state).render())

    if (this.state.list.length !== 0) {
      main.querySelector('.card-list') ? main.querySelector('.card-list').insertAdjacentHTML('afterBegin', `<h2 class="title-second">Найдено фильмов: ${this.state.filmFound}</h2>`) : ""
    }

    this.app.append(main)
  }

  renderHeader() {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }
}