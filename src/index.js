import './index.html';
import './index.scss';
import { FavoritesView } from './views/favorites/favorites';
import { FilmView } from './views/film/film';
import { MainView } from './views/main/main';
import { SearchView } from './views/search/search';

class App {
  routes = [
    { path: "", view: MainView },
    { path: "#search", view: SearchView },
    { path: "#film", view: FilmView },
    { path: "#favorites", view: FavoritesView },
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

    const activeHash = location.hash.includes('film') ? '#film' : location.hash

    const view = this.routes.find(r => r.path === activeHash).view
    this.currentView = new view(this.appState)
    this.currentView.render()

  }
}

new App()