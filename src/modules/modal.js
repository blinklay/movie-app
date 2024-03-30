import { DivComponent } from "../common/div-compoennt";

export class Modal extends DivComponent {
  constructor(descr) {
    super()
    this.descr = descr
  }

  render() {
    if (document.querySelector('.modal')) {
      this.destroy(document.querySelector('.modal'))
    }
    this.el.classList.add('modal')
    this.el.innerHTML = `
    <div class="modal__body">
      <p class="modal__descr">
        ${this.descr}
      </p>
      <button class="modal__close-btn">&#x2715;</button>
    </div>
    <div class="modal__indicator-line"></div>
    `

    setTimeout(() => {
      this.el.classList.add('modal--show')
    }, 0)

    setTimeout(() => {
      this.destroy(this.el)
    }, 2500);
    this.el.querySelector('.modal__close-btn').addEventListener('click', () => {
      this.destroy(this.el)
    })
    return this.el
  }

  destroy(modal) {
    modal.classList.remove('modal--show')
    setTimeout(() => {
      modal.remove()
    }, 300)
  }
}