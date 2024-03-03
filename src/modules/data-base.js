export class DataBase {
  #apiKey = "1f172595-aa30-4be3-b2af-24a3ded801e4"
  async getData(url) {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': this.#apiKey,
        'Content-Type': 'application/json',
      },
    })

    return res.json()
  }
}