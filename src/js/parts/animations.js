import { gsap } from 'gsap'

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry.target);
            animateLogo(entry.target)
        }
    })
});

const animateElems = document.querySelectorAll('[data-animate]');
if (animateElems.length) {
    animateElems.forEach(elem => {
        observer.observe(elem);
    })
}

function animate(elem) {
    if (elem) {
        if (elem.hasAttribute('data-opacity-only')) {
            gsap.to(elem, {
                opacity: 1,
                duration: 1,
                delay: +elem.dataset.delay ? +elem.dataset.delay : 0,
                ease: 'ease'
            });
        }
        else {
            gsap.to(elem, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.6,
                delay: +elem.dataset.delay ? +elem.dataset.delay : 0,
                ease: 'ease'
            });
        }
    }
}


function animateLogo(logo) {
    const paths = logo.querySelectorAll('path');
    if (!paths.length) return;

    gsap.to(paths, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'ease'
    });
}

const footerLogo = document.querySelector('.footer__logo svg');
observer.observe(footerLogo);


