import './index.html';
import './index.scss';
import { MainView } from './views/main/main';
import { SearchView } from './views/search/search';

class App {
  routes = [
    { path: "", view: MainView },
    { path: "#search", view: SearchView },
  ]

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this))
    this.route()
  }

  appState = {
    favorites: []
  }

  route() {
    if (this.currentView) this.currentView.destroy()
    const view = this.routes.find(r => r.path === location.hash).view
    this.currentView = new view(this.appState)
    this.currentView.render()
  }
}

new App()