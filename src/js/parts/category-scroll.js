import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { isMobile } from '../utils/isMobile.js';


gsap.registerPlugin(ScrollTrigger);
const processSlider = document.querySelector('.category__flex');
let margin = 3;

if (processSlider) {
    const slides = gsap.utils.toArray('.category__article');
    if (slides.length) {
        if (window.innerWidth >= 768 && !isMobile.any()) {
            let x = (slides[0].getBoundingClientRect().width + margin) * (slides.length - 3) - margin
            gsap.to(slides, {
                x: -x,
                ease: "none",
                scrollTrigger: {
                    trigger: processSlider,
                    pin: true,
                    start: "center center",
                    scrub: 1,
                    invalidateOnRefresh: true,

                    end: () => "+=" + processSlider.offsetWidth,
                }
            });
        }
    }
}

gsap.to(".image", {
    scale: 1,
    scrollTrigger: {
        trigger: ".image",
        start: "top center",
        end: "bottom top",
        scrub: 1
    }
});





// "--p": (0, S.CD)(1, -.8, e.progress)

const triggerElem = document.querySelector('[data-transform]');
const triggerElemNext = document.querySelector('[data-transform-next]');
ScrollTrigger.create({
    trigger: triggerElem,
    start: "top bottom",
    end: "bottom top",
    markers: true,

    onUpdate: (self) => {
        let progress = self.progress + (1 - self.progress * 2)
        self.trigger.setAttribute('style', `--tr: ${progress}`)
    },
});

ScrollTrigger.create({
    trigger: triggerElemNext,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
        let progress = self.progress
        if (progress >= 0.8) progress = 0.8
        triggerElem.setAttribute('style', `--tr: ${-progress}`)
    },
});