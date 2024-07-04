import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { isMobile } from '../utils/isMobile.js';
import { getSwipeDirection } from '../static/swipeDirection.js';



const slideName = document.querySelector('[data-slider-change] [data-slider-name]');
const slidePos = document.querySelector('[data-slider-change] [data-slider-pos]');
const slideParam1Name = document.querySelector('[data-slider-change] [data-slider-param1] span');
const slideParam1Text = document.querySelector('[data-slider-change] [data-slider-param1] label');
const slideParam2Name = document.querySelector('[data-slider-change] [data-slider-param2] span');
const slideParam2Text = document.querySelector('[data-slider-change] [data-slider-param2] label');
const slideCity = document.querySelector('[data-slider-change] [data-slider-city]');
const slideLink = document.querySelector('[data-slider-change] [data-slider-link]');
const slideCityName = document.querySelector('[data-slider-change] [data-slider-city-name]');

const sliders = document.querySelectorAll('.swiper');

export const createSliders = () => {
    if (!sliders.length) return;

    sliders.forEach(slider => {
        const paginationElem = slider.querySelector('.swiper-pagination')
        let pagination = false;

        if (paginationElem) pagination = { el: paginationElem, clickable: true }

        let delay = 3000;
        if (slider.closest('.whatsapp-slider')) {
            delay = 30000
        }

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
    const cityName = slide.dataset.cityName
    const link = slide.querySelector('a.about-slider__slide-img');

    slideName.innerHTML = name
    slidePos.innerHTML = pos
    slideParam1Name.innerHTML = param1Num
    slideParam1Text.innerHTML = param1Text
    slideParam2Name.innerHTML = param2Num
    slideParam2Text.innerHTML = param2Text

    if (slideCityName && cityName) {
        slideCityName.textContent = cityName
    }

    if (slideCity && cityLogoUrl) {
        slideCity.querySelector('img').src = cityLogoUrl
        const sources = slideCity.querySelectorAll('source');
        if (sources.length) sources.forEach(img => img.srcset = cityLogoUrl)
    }

    if (slideLink && link) {
        slideLink.href = link.href
    }
}

const slides = document.querySelectorAll('[data-slider-change] .about-slider__slide');
const sldierBtnPrev = document.querySelector('.about-slider__prev');
const sldierBtnNext = document.querySelector('.about-slider__next');
const aboutSlider = document.querySelector('.about-slider__slider');
const allSlides = document.querySelectorAll('.about-slider__slide');

if (allSlides.length) {
    const firstSlide = allSlides[0];
    firstSlide.nextElementSibling.classList.add('_next')

    sldierBtnNext.addEventListener('click', () => {
        changeSlides(1);
    })
    sldierBtnPrev.addEventListener('click', () => {
        changeSlides(-1);
    })
}

function changeSlides(direction) {
    let currSlide = document.querySelector('.about-slider__slide._active');
    let nextSlide = document.querySelector('.about-slider__slide._next');
    let nextSlideNext = null;

    const firstSlide = allSlides[0];
    const lastSlide = allSlides[allSlides.length - 1];

    nextSlide.classList.remove('_next')

    if (direction == 1) {
        nextSlide = currSlide.nextElementSibling;

        if (!nextSlide) {
            nextSlide = firstSlide
        }

        nextSlideNext = nextSlide.nextElementSibling;

        if (!nextSlideNext) {
            nextSlideNext = firstSlide
        }
    }
    else {
        nextSlide = currSlide.previousElementSibling;

        if (!nextSlide) {
            nextSlide = lastSlide
        }

        nextSlideNext = nextSlide.previousElementSibling;
        if (!nextSlideNext) {
            nextSlideNext = lastSlide
        }
    }


    currSlide.classList.remove('_active')
    nextSlide.classList.add('_active')

    nextSlideNext.classList.add('_next')

    slideChange(nextSlide)
}

if (aboutSlider && isMobile.any() && window.innerWidth <= 992) {
    let move = 0;

    aboutSlider.addEventListener('touchstart', (event) => {
        const touch = event.targetTouches[0];
        move = touch.pageX;
    })

    aboutSlider.addEventListener('touchend', (event) => {
        const touch = event.changedTouches[0];

        const dir = getSwipeDirection(event);

        if (dir == 'right') {
            changeSlides(1);
        }
        else if (dir == 'left') {
            changeSlides(-1);
        }
    })
}