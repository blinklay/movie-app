import { DivComponent } from "../common/div-compoennt";

export class Pagination extends DivComponent {
  constructor(state) {
    super()
    this.state = state
  }

  changeNumToArr(num) {
    let res = []
    let subRes = []

    for (let i = 1; i <= num; i++) {
      subRes.push(i)
      if (subRes.length === 5 || i === num) {
        let copy = [...subRes]
        res.push(copy)
        subRes = []
      }
    }

    return res
  }

  render() {
    this.el.classList.add('pagination')

    let pageOffsets = Math.round(this.state.filmFound / 20)
    if (pageOffsets > 20) pageOffsets = 20

    const paginationArr = this.changeNumToArr(Math.round(pageOffsets))

    for (let i = 0; i < paginationArr.length; i++) {
      const wrapper = document.createElement('div')
      wrapper.classList.add('pagination__wrapper')

      for (const num of paginationArr[i]) {
        const bullet = document.createElement('button')
        bullet.classList.add('pagination__bullet')
        bullet.dataset.pagesOffset = num
        bullet.textContent = num
        wrapper.append(bullet)
      }
      this.el.append(wrapper)

      if (wrapper.querySelector(`[data-pages-offset="${this.state.offset}"]`)) {
        wrapper.querySelector(`[data-pages-offset="${this.state.offset}"]`).parentElement.classList.add('pagination__wrapper--show')
        wrapper.querySelector(`[data-pages-offset="${this.state.offset}"]`).classList.add('pagination__bullet--active')
      }
    }

    const prevBtn = document.createElement('button')
    prevBtn.classList.add('pagination__btn')
    prevBtn.classList.add('pagination__btn--prev')
    prevBtn.innerHTML = `
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999998 14.7321C-0.333336 13.9623 -0.333334 12.0378 1 11.268L19 0.875645C20.3333 0.105845 22 1.0681 22 2.6077L22 23.3923C22 24.9319 20.3333 25.8942 19 25.1244L0.999998 14.7321Z" fill="#F89A09"/>
     </svg>`

    const nextBtn = document.createElement('button')
    nextBtn.classList.add('pagination__btn')
    nextBtn.classList.add('pagination__btn--next')
    nextBtn.innerHTML = `
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 11.2679C22.3333 12.0377 22.3333 13.9622 21 14.732L3 25.1244C1.66666 25.8942 -1.22094e-06 24.9319 -1.15364e-06 23.3923L-2.4512e-07 2.60769C-1.77822e-07 1.06809 1.66667 0.105843 3 0.875644L21 11.2679Z" fill="#F89A09"/>
    </svg>`

    nextBtn.addEventListener('click', () => {
      const active = document.querySelector('.pagination__wrapper--show')
      if (active.nextElementSibling && active.nextElementSibling !== nextBtn) {
        active.classList.remove('pagination__wrapper--show')
        active.nextElementSibling.classList.add('pagination__wrapper--show')
      }
    })

    prevBtn.addEventListener('click', () => {
      const active = document.querySelector('.pagination__wrapper--show')
      if (active.previousElementSibling && active.previousElementSibling !== prevBtn) {
        active.classList.remove('pagination__wrapper--show')
        active.previousElementSibling.classList.add('pagination__wrapper--show')
      }
    })

    this.el.append(nextBtn)
    this.el.prepend(prevBtn)

    this.el.addEventListener('click', (e) => {
      if (e.target.classList.contains('pagination__bullet')) {
        const offset = e.target.dataset.pagesOffset
        this.state.offset = offset
      }
    })

    return this.el
  }
}