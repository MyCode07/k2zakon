import { lockPadding, unLockPadding } from "../utils/lockPadding.js";


const popupAll = document.querySelectorAll('.popup');
const popupOpenButtons = document.querySelectorAll('[data-open-popup]');
const qrcodeLinks = document.querySelectorAll('#qrcode .qrcode-link');

if (popupOpenButtons.length)
    popupOpenButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const popup = document.querySelector(`.popup#${id}`);
            if (popup) {
                popup.classList.add('_open')
                lockPadding();
            }

            if (id == 'qrcode') {
                const index = [...btn.parentNode.children].indexOf(btn);

                qrcodeLinks.forEach(item => {
                    item.classList.remove('_active')
                });

                qrcodeLinks[index].classList.add('_active')
            }
        })
    })

if (popupAll.length)
    popupAll.forEach(popup => {
        const popupClose = popup.querySelector('.popup__close');

        popupClose.addEventListener('click', function (e) {
            popup.classList.remove('_open');
            unLockPadding();
            if (popup.id == 'qrcode') document.querySelector('body').classList.add('_noscroll');
        })

        popup.addEventListener('click', function (e) {
            if (e.target.classList.contains('popup')) {
                popup.classList.remove('_open')
                unLockPadding();
                if (popup.id == 'qrcode') document.querySelector('body').classList.add('_noscroll');
            }
        })
    })