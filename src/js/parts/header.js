

export const stickyHeader = () => {
    const header = document.querySelector('header');
    const offer = document.querySelector('.offer');

    if (!header) return

    const headerheigth = 141;


    const sticky = () => {
        if (window.scrollY > headerheigth) {
            header.classList.add('_sticky')
            header.classList.add('_scrolled')
            offer.classList.add('_close');
        }
        else {
            header.classList.remove('_sticky')
            header.classList.remove('_scrolled')
            offer.classList.remove('_close');
        }
    }

    sticky();
    window.addEventListener('scroll', sticky);
}