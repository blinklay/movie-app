import { DivComponent } from "../common/div-compoennt";
import { LocalStorageFilm } from "./local-storage-film";

export class FilmContent extends DivComponent {
  #localKey = "films"
  constructor(state) {
    super()
    this.state = state
    this.localStorageFilm = new LocalStorageFilm()
    this.activeText = ""
    this.activeClass = ""
  }

  render() {
    if (this.state.loading) {
      this.el.innerHTML = "Загрузка"
      return this.el
    }
    this.el.classList.add('film')
    const { posterUrl, nameRu, nameOriginal, genres, year, description, countries, ratingImdb, filmLength, hasImax, has3D, type, kinopoiskId } = this.state.currentFilm

    let genresComponent = ""
    for (let { genre } of genres) {
      genresComponent += `
      <div class="film__genre">${genre}</div>
      `
    }

    let countryComponent = ""
    for (let { country } of countries) {
      countryComponent += " " + country
    }

    const movieType = {
      "TV_SERIES": "ТВ Сериал",
      "FILM": "Фильм",
      "MINI_SERIES": 'Мини сериал'
    }
    this.checkFavoritesState(kinopoiskId)
    this.el.innerHTML = `
        <div div class="film__poster" >
      <img class="film__poster-img" src="${posterUrl}" alt="Постер фильма">
    </div>
    <div class="film__info">
      <div class="film__header">
        <h2 class="film__title">${nameRu ? nameRu : nameOriginal}</h2>
        <span class="film__year">${year ? year : "Год выпуска неизвестен"}</span>
      </div>
      <div class="film__genres">
        ${genresComponent}
      </div>
      <div class="film__descr">
        ${description ? description : "Описание отсутствует"}
      </div>
      <table class="film__table">
        <tr>
          <td class="film__table-name">Страна</td>
          <td>${countryComponent}</td>
        </tr>
        <tr>
          <td class="film__table-name">Рейтинг</td>
          <td>${ratingImdb ? ratingImdb : "Без рейтинга"}</td>
        </tr>
        <tr>
          <td class="film__table-name">Длинна(мин)</td>
          <td>${filmLength ? filmLength : "Неизвестно"}</td>
        </tr>
        <tr>
          <td class="film__table-name">3D</td>
          <td>${has3D ? "Да" : "Нет"}</td>
        </tr>
        <tr>
          <td class="film__table-name">Imax</td>
          <td>${hasImax ? "Да" : "Нет"}</td>
        </tr>
        <tr>
          <td class="film__table-name">Тип</td>
          <td>${movieType[type]}</td>
        </tr>
      </table>
      <button class="film__favorites-btn ${this.activeClass}">
        ${this.activeText}
      </button>
    </div>
      `

    this.el.querySelector('.film__favorites-btn').addEventListener('click', (e) => {
      const currentId = String(kinopoiskId)
      this.activeClass = ""
      this.activeText = ""

      if (this.localStorageFilm.getData(this.#localKey).includes(currentId)) {
        this.localStorageFilm.removeItem(this.#localKey, currentId)
        e.target.classList.remove('film__favorites-btn--active')
        this.activeText = "Добавить в избранное"
      } else {
        this.localStorageFilm.addItem(this.#localKey, currentId)
        e.target.classList.add('film__favorites-btn--active')
        this.activeText = "Удалить из избранного"
      }

      e.target.textContent = this.activeText
      this.activeText = ""
    })
    return this.el
  }

  checkFavoritesState(kinopoiskId) {
    const currentId = String(kinopoiskId)

    if (this.localStorageFilm.getData(this.#localKey).includes(currentId)) {
      this.activeClass = "film__favorites-btn--active"
      this.activeText = "Удалить из избранного"
    } else {
      this.activeClass = ""
      this.activeText = "Добавить в избранное"
    }
  }

}