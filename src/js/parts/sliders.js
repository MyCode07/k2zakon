import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const slideName = document.querySelector('[data-slider-change] [data-slider-name]');
const slidePos = document.querySelector('[data-slider-change] [data-slider-pos]');
const slideParam1Name = document.querySelector('[data-slider-change] [data-slider-param1] span');
const slideParam1Text = document.querySelector('[data-slider-change] [data-slider-param1] label');
const slideParam2Name = document.querySelector('[data-slider-change] [data-slider-param2] span');
const slideParam2Text = document.querySelector('[data-slider-change] [data-slider-param2] label');

const sliders = document.querySelectorAll('.swiper');

export const createSliders = () => {
    if (!sliders.length) return;

    sliders.forEach(slider => {
        const paginationElem = slider.querySelector('.swiper-pagination')
        let pagination = false;

        if (paginationElem) pagination = { el: paginationElem, clickable: true }

        new Swiper(slider, {
            modules: [
                Autoplay, Pagination
            ],
            loop: true,
            slidesPerView: 1,
            spaceBetween: 40,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: pagination
        })
    })
}

const slideChange = (slide) => {
    const name = slide.dataset.name
    const pos = slide.dataset.pos
    const param1Num = slide.dataset.param1Num
    const param1Text = slide.dataset.param1Text
    const param2Num = slide.dataset.param2Num
    const param2Text = slide.dataset.param2Text

    slideName.textContent = name
    slidePos.innerHTML = pos
    slideParam1Name.textContent = param1Num
    slideParam1Text.textContent = param1Text
    slideParam2Name.textContent = param2Num
    slideParam2Text.textContent = param2Text
}

const slides = document.querySelectorAll('[data-slider-change] .about-slider__slide');
const sldierBtns = document.querySelectorAll('[data-slider-change-btn]');
if (sldierBtns.length) {
    sldierBtns.forEach(btn => {
        const type = btn.dataset.sliderChange

        btn.addEventListener('click', () => {
            slides.forEach(slide => {
                if (slide.dataset.slideType == type) {
                    slide.classList.add('_active')
                    slideChange(slide)
                }
                else slide.classList.remove('_active')
            })

            sldierBtns.forEach(item => {
                if (item.dataset.sliderChange == type) item.classList.add('_disabled')
                else item.classList.remove('_disabled')
            })
        })
    })
}

