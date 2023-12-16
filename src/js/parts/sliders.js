import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { isMobile } from '../utils/isMobile.js';

const slideName = document.querySelector('[data-slider-change] [data-slider-name]');
const slidePos = document.querySelector('[data-slider-change] [data-slider-pos]');
const slideParam1Name = document.querySelector('[data-slider-change] [data-slider-param1] span');
const slideParam1Text = document.querySelector('[data-slider-change] [data-slider-param1] label');
const slideParam2Name = document.querySelector('[data-slider-change] [data-slider-param2] span');
const slideParam2Text = document.querySelector('[data-slider-change] [data-slider-param2] label');
const slideCity = document.querySelector('[data-slider-change] [data-slider-city]');

const sliders = document.querySelectorAll('.swiper');

export const createSliders = () => {
    if (!sliders.length) return;

    sliders.forEach(slider => {
        const paginationElem = slider.querySelector('.swiper-pagination')
        let pagination = false;

        if (paginationElem) pagination = { el: paginationElem, clickable: true }

        let delay = 3000;
        if (slider.closest('.whatsapp-slider')) delay = 30000

        new Swiper(slider, {
            modules: [
                Autoplay, Pagination
            ],
            loop: true,
            slidesPerView: 1,
            spaceBetween: 40,
            autoplay: {
                delay: delay,
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
    const cityLogoUrl = slide.dataset.cityLogo

    slideName.innerHTML = name
    slidePos.innerHTML = pos
    slideParam1Name.innerHTML = param1Num
    slideParam1Text.innerHTML = param1Text
    slideParam2Name.innerHTML = param2Num
    slideParam2Text.innerHTML = param2Text

    if (slideCity) {
        slideCity.querySelector('img').src = cityLogoUrl
        const sources = slideCity.querySelectorAll('source');
        if (sources.length) sources.forEach(img => img.srcset = cityLogoUrl)
    }
}

const slides = document.querySelectorAll('[data-slider-change] .about-slider__slide');
const sldierBtns = document.querySelectorAll('[data-slider-change-btn]');
const aboutSlider = document.querySelector('.about-slider__slider');
if (sldierBtns.length) {
    sldierBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            slides.forEach(slide => {
                if (slide.classList.contains('_active')) {
                    slide.classList.remove('_active')
                }
                else {
                    slide.classList.add('_active')
                    slideChange(slide)
                }
            })
        })
    })
}

if (aboutSlider && isMobile.any() && window.innerWidth <= 992) {
    let move = 0;
    
    aboutSlider.addEventListener('touchstart', (event) => {
        const touch = event.targetTouches[0];
        const midpoint = Math.floor(screen.width / 2);
        const px = touch.pageX;
        move = px;
    })

    aboutSlider.addEventListener('touchend', (event) => {
        const touch = event.changedTouches[0];
        const midpoint = Math.floor(screen.width / 2);
        const px = touch.pageX;

        const deltamove = Math.abs(move - px)
        if (deltamove >= 50) {
            slides.forEach(slide => {
                if (slide.classList.contains('_active')) {
                    slide.classList.remove('_active')
                }
                else {
                    slide.classList.add('_active')
                    slideChange(slide)
                }
            })
        }
    })
}