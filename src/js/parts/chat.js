const chatIcon = document.querySelector('.chat-icon');
export const chatScroll = () => {
    if (!chatIcon) return

    const height = 300;

    const scroll = () => {
        if (window.scrollY > height) {
            chatIcon.classList.add('_visible')
        }
        else {
            chatIcon.classList.remove('_visible')
        }
    }

    scroll();
    window.addEventListener('scroll', scroll);
}