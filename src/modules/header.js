import { DivComponent } from "../common/div-compoennt";

import logo from '../img/logo.svg'
import searchIcon from '../img/search.svg'
import favoritesIcon from '../img/favorites.svg'

export class Header extends DivComponent {
  constructor(appState) {
    super()
    this.appState = appState
  }

  render() {
    this.el.classList.add('header')
    const wrapper = document.createElement('div')
    wrapper.classList.add('header__wrapper')

    wrapper.innerHTML = `
    <a class="header__logo logo" href="#">
      <img class="logo-img" src="${logo}" alt="Логотип">
    </a>
    <nav class="header__nav nav">
      <ul class="nav__list">
        <li class="nav__item">
          <a class="nav__item-link" href="#search">
            <img src="${searchIcon}" alt="Поиск иконка">
            Поиск фильмов
          </a>
        </li>
        <li class="nav__item">
        <a class="nav__item-link" href="#favorites">
          <img src="${favoritesIcon}" alt="Избранное иконка">
          Избранное
        </a>
      </li>
      </ul>
    </nav>
    `
    this.el.append(wrapper)
    this.observeHeader()
    return this.el
  }

  observeHeader() {
    const wrapper = this.el.querySelector('.header__wrapper')
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // we get the height so that when adding a 
        // class the layout does not “jump”

        const headerHeight = this.el.clientHeight

        if (!entry.isIntersecting) {
          wrapper.classList.add('header--show')
          wrapper.classList.add('header--sticky')
          this.el.style.height = headerHeight + 'px'
        } else {
          wrapper.classList.remove('header--show')
          wrapper.classList.remove('header--sticky')
          this.el.style.height = 'auto'
        }
      })
    }, {
      threshold: 0,
      rootMargin: '100%'
    })

    headerObserver.observe(this.el)
  }
}