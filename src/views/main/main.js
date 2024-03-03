import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../modules/header";

export class MainView extends AbstractView {

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
  }

  stateHook(path) {
    if (path === 'list') {
      console.log(path);
    }
  }

  render() {
    const main = document.createElement('div')
    this.renderHeader()
    this.app.append(main)
  }

  renderHeader() {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }
}