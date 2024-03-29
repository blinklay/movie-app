import { AbstractView } from "../../common/view";
import { CardList } from "../../modules/card-list";
import { DataBase } from "../../modules/data-base";
import { Header } from "../../modules/header";
import { LocalStorageFilm } from "../../modules/local-storage-film";
import onChange from "on-change";

export class FavoritesView extends AbstractView {
  #localKey = "films"
  #apiUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"

  state = {
    loading: false,
    list: [],
  }

  constructor(appState) {
    super()
    this.setTitle('Избранное')
    this.appState = appState
    this.state = onChange(this.state, this.stateHook.bind(this))
    this.localStorageFilm = new LocalStorageFilm()
    this.loadList()
  }

  async loadList() {
    this.state.loading = true

    for (const queryId of this.localStorageFilm.getData(this.#localKey)) {
      const data = await new DataBase().getData(`${this.#apiUrl}${queryId}`)
      this.state.list.push(data)
    }

    this.state.loading = false
  }

  stateHook(path) {
    if (path === 'loading') {
      this.render()
    }
  }

  render() {
    this.app.innerHTML = ""
    const main = document.createElement('div')
    main.classList.add('favorites')
    main.innerHTML = `<h1 class="title-first">Избранное</h1>`
    if (this.state.list.length === 0) {
      const item = document.createElement('div')
      item.classList.add('favorites__nothing')
      item.innerHTML = "Список избранного пуст..."
      main.append(item)
    }
    this.renderHeader()
    main.append(new CardList(this.appState, this.state).render())
    this.app.append(main)
  }

  renderHeader() {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }
}