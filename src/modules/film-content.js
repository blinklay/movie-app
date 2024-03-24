import { DivComponent } from "../common/div-compoennt";

export class FilmContent extends DivComponent {
  constructor(state) {
    super()
    this.state = state
  }

  render() {
    if (this.state.loading) {
      this.el.innerHTML = "Загрузка"
      return this.el
    }
    this.el.classList.add('film')
    const { posterUrl, nameRu, nameOriginal, genres, year, description, countries, ratingImdb, filmLength, hasImax, has3D, type } = this.state.currentFilm
    console.log(genres);

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
      "TV_SERIES": "Сериал",
      "FILM": "Фильм"
    }

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
      <button class="film__favorites-btn">
        Добавить в избранное
      </button>
    </div>
      `
    return this.el
  }


}