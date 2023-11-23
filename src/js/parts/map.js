const footerMapOen = document.querySelector('.footer__top-open');
const footerMapBolck = document.querySelector('.footer__center');
const footerTop = document.querySelector('.footer__top');

if (footerMapOen) {
    footerMapOen.addEventListener('click', () => {
        footerMapBolck.classList.add('_open')
        footerTop.remove();
    })
}