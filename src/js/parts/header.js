const header = document.querySelector('header');

export const stickyHeader = () => {
    if (!header) return

    const headerheigth = header.getBoundingClientRect().height;

    const sticky = () => {
        if (window.scrollY > headerheigth) {
            header.classList.add('_sticky')
            header.classList.add('_scrolled')
        }
        else {
            header.classList.remove('_sticky')
            header.classList.remove('_scrolled')
        }
    }

    sticky();
    window.addEventListener('scroll', sticky);
}