export class LocalStorageFilm {
  getData(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
  }

  setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  addItem(key, item) {
    const data = this.getData(key)
    if (data.includes(item)) return
    data.push(item)
    this.setData(key, data)
  }

  removeItem(key, item) {
    let data = this.getData(key)
    data = data.filter(card => card !== item)
    this.setData(key, data)
  }
}