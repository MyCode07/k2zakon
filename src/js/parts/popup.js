import { isMobile } from "./isMobile.js";

const popupAll = document.querySelectorAll('.popup');
const popupOpenButtons = document.querySelectorAll('[data-open-popup]');


if (popupOpenButtons.length)
    popupOpenButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const id = btn.getAttribute('id');
            const popup = document.querySelector(`.popup[data-id="${id}"]`);

            if (popup) {
                popup.classList.add('_open');
                document.body.classList.add('_noscroll');

                if (!isMobile.any()) {
                    lockPadding()
                }
            }
        })
    }) 

if (popupAll.length)
    popupAll.forEach(popup => {
        const popupClose = popup.querySelector('.popup__close');

        popupClose.addEventListener('click', function () {
            popup.classList.remove('_open');
            document.body.classList.remove('_noscroll');

            if (!isMobile.any()) {
                unLockPadding()
            }
        })

        popup.addEventListener('click', function (e) {
            if (e.target.classList.contains('popup')) {
                popup.classList.remove('_open')
                document.body.classList.remove('_noscroll');
                unLockPadding()
            }
        })
    })