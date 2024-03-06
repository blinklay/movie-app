import { DivComponent } from "../common/div-compoennt";

import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Slide } from "./slide";

export class Slider extends DivComponent {
  constructor(state) {
    super()
    this.state = state
    this.swiper = null
  }

  render() {
    this.el.classList.add('slider')

    const swiperWrapper = document.createElement('div')
    swiperWrapper.classList.add('swiper-wrapper')

    for (const card of this.state.sliderList) {
      swiperWrapper.append(new Slide(card).render())
    }

    this.el.innerHTML = `
    <h2 class="slider__title title-second">Рекомендации</h2>
    <div id="swiper" class="swiper">
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev">
                <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999998 14.7321C-0.333336 13.9623 -0.333334 12.0378 1 11.268L19 0.875645C20.3333 0.105845 22 1.0681 22 2.6077L22 23.3923C22 24.9319 20.3333 25.8942 19 25.1244L0.999998 14.7321Z" fill="#F89A09"/>
                </svg>
                </div>
                <div class="swiper-button-next">
                <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.2679C22.3333 12.0377 22.3333 13.9622 21 14.732L3 25.1244C1.66666 25.8942 -1.22094e-06 24.9319 -1.15364e-06 23.3923L-2.4512e-07 2.60769C-1.77822e-07 1.06809 1.66667 0.105843 3 0.875644L21 11.2679Z" fill="#F89A09"/>
                </svg>
                
                </div>
            </div>
  `

    this.el.querySelector('.swiper').insertAdjacentElement('afterbegin', swiperWrapper)
    return this.el
  }

  initSwiper() {
    this.swiper = new Swiper(`#swiper`, {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}