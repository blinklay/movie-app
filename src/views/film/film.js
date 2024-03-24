import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { DataBase } from "../../modules/data-base";
import { FilmContent } from "../../modules/film-content";
import { Header } from "../../modules/header";

export class FilmView extends AbstractView {
  #apiUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"
  state = {
    loading: false,
    currentFilm: null
  }

  constructor() {
    super()
    this.setTitle('Фильм')
    this.state = onChange(this.state, this.stateHook.bind(this))
    this.loadFilmContent(this.query)
  }

  get query() {
    const arr = location.hash.split("")
    arr.splice(0, 5)
    return arr.join("")
  }

  stateHook(path) {
    if (path === 'loading' || path === "currentFilm") {
      this.render()
    }
  }

  async loadFilmContent(q) {
    this.state.loading = true
    const data = await new DataBase().getData(`${this.#apiUrl}${q}`)
    this.state.currentFilm = data
    console.log(data);
    this.state.loading = false
  }

  render() {
    this.app.innerHTML = ""
    const main = document.createElement('div')

    if (this.state.currentFilm) {
      const activeTitle = this.state.currentFilm.nameRu ? this.state.currentFilm.nameRu : this.state.currentFilm.nameOriginal
      this.setTitle(activeTitle)
    } else {
      this.setTitle("Фильм")
    }

    main.innerHTML = `<h1 class="search__title title-first">Информация о фильме</h1>`
    this.renderHeader()
    main.append(new FilmContent(this.state).render())
    this.app.append(main)
  }

  renderHeader() {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }

}