import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

const sliders = document.querySelectorAll('.swiper');
if (sliders.length) {
    sliders.forEach(slider => {

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
    })
}
