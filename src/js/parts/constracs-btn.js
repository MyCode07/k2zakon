import { isMobile } from "../utils/isMobile.js";

const constractBtns = document.querySelectorAll('._button-construct');
export const constractBtnAction = () => {
    if (!constractBtns.length) return

    const changeAttrs = () => {
        constractBtns.forEach(item => {
            if (isMobile.any()) {
                item.setAttribute('data-open-popup', true)
                item.setAttribute('data-id', 'contacts')
            }
            else {
                item.removeAttribute('data-open-popup')
                item.removeAttribute('data-id')
            }
        })
    }

    changeAttrs();
    window.addEventListener('resize', changeAttrs);
}