import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../modules/header";
import { CardList } from "../../modules/card-list";
import { DataBase } from "../../modules/data-base";

export class MainView extends AbstractView {
  #apiUrl = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=JANUARY&page="

  state = {
    loading: false,
    list: [],
    offset: 1
  }

  constructor(appState) {
    super()
    this.appState = appState
    this.state = onChange(this.state, this.stateHook.bind(this))
    this.setTitle('Главная')
    this.loadlist()
  }

  stateHook(path) {
    if (path === 'list' || path === 'loading') {
      this.render()
    }
  }

  async loadlist() {
    this.state.loading = true

    const data = await new DataBase().getData(this.#apiUrl + this.state.offset)
    this.state.list = data.releases

    this.state.loading = false
  }

  render() {
    this.app.innerHTML = ""
    const main = document.createElement('div')
    main.append(new CardList(this.appState, this.state).render())
    this.renderHeader()
    this.app.append(main)
  }

  renderHeader() {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }
}