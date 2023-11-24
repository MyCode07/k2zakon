import Swiper from 'swiper';
import { Autoplay, Navigation, EffectCards } from 'swiper/modules';

const slideName = document.querySelector('.about-slider__name');
const slidePos = document.querySelector('.about-slider__pos');
const slideParam1Name = document.querySelector('.about-slider .param-1 span');
const slideParam1Text = document.querySelector('.about-slider .param-1 label');
const slideParam2Name = document.querySelector('.about-slider .param-2 span');
const slideParam2Text = document.querySelector('.about-slider .param-2 label');

const sliders = document.querySelectorAll('.swiper');

export const createSliders = () => {
    if (!sliders.length) return;

    sliders.forEach(slider => {

        if (!slider.closest('.about-slider'))
            new Swiper(slider, {
                modules: [
                    Autoplay,
                ],
                loop: true,
                slidesPerView: 1,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            })

        else
            new Swiper(slider, {
                modules: [
                    Navigation, EffectCards
                ],
                navigation: {
                    prevEl: '.about-slider__prev',
                    nextEl: '.about-slider__next',
                },
                effect: "cards",
                grabCursor: true,
                cardsEffect: {
                    perSlideOffset: 75,
                    perSlideRotate: 0,
                    rotate: false,
                    slideShadows: false,
                },
                slidesPerView: 1,
                on: {
                    slideChange: (swiper) => {
                        const slide = swiper.slides[swiper.activeIndex];

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
                }
            })
    })
}