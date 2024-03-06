import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../modules/header";
import { CardList } from "../../modules/card-list";
import { DataBase } from "../../modules/data-base";
import { Slider } from "../../modules/slider";

export class MainView extends AbstractView {
  #apiUrl = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=JANUARY&page="
  #apiUrlSlider = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1"

  state = {
    loading: false,
    list: [],
    offset: 1,
    sliderList: []
  }

  constructor(appState) {
    super()
    this.appState = appState
    this.state = onChange(this.state, this.stateHook.bind(this))
    this.setTitle('Главная')
    this.loadlist()
    this.loadSliderList()
  }

  stateHook(path) {
    if (path === 'list' || path === 'loading' || path === 'sliderList') {
      this.render()
    }
  }

  async loadlist() {
    this.state.loading = true

    const data = await new DataBase().getData(this.#apiUrl + this.state.offset)
    this.state.list = data.releases

    this.state.loading = false
  }

  async loadSliderList() {
    this.state.loading = true
    const data = await new DataBase().getData(this.#apiUrlSlider)
    this.state.sliderList = data.items
    this.state.loading = false
  }

  render() {
    this.app.innerHTML = ""
    const main = document.createElement('div')
    const slider = new Slider(this.state)
    main.append(slider.render())

    main.append(new CardList(this.appState, this.state).render())
    this.renderHeader()
    this.app.append(main)

    slider.initSwiper()
  }

  renderHeader() {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }
}