import Swiper from 'swiper';
import { Autoplay, Navigation, EffectCards } from 'swiper/modules';

const slideName = document.querySelector('.about-slider__name');
const slidePos = document.querySelector('.about-slider__pos');
const slideExpNum = document.querySelector('.about-slider .exp span');
const slideExpText = document.querySelector('.about-slider .exp label');
const slideParamName = document.querySelector('.about-slider .param span');
const slideParamText = document.querySelector('.about-slider .param label');

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
                lazy: true,
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
                lazy: true,
                slidesPerView: 1,
                on: {
                    slideChange: (swiper) => {
                        const slide = swiper.slides[swiper.activeIndex];

                        const name = slide.dataset.name
                        const pos1 = slide.dataset.pos1
                        const pos2 = slide.dataset.pos2
                        const expNum = slide.dataset.expNum
                        const expText = slide.dataset.expText
                        const paramNum = slide.dataset.paramNum
                        const paramText = slide.dataset.paramText

                        slideName.textContent = name
                        slidePos.innerHTML = pos1 + '<br>' + pos2
                        slideExpNum.textContent = expNum
                        slideExpText.textContent = expText
                        slideParamName.textContent = paramNum
                        slideParamText.textContent = paramText
                    }
                }
            })
    })
}