import './index.html';
import './index.scss';
import { MainView } from './views/main/main';

class App {
  routes = [
    { path: "", view: MainView }
  ]

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this))
    this.route()
  }

  appState = {
    favorites: []
  }

  route() {
    const view = this.routes.find(r => r.path === location.hash).view
    this.currentView = new view(this.appState)
    this.currentView.render()
  }
}

new App()