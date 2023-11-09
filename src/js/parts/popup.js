import { lockPadding, unLockPadding } from "../utils/lockPadding.js";


const popupAll = document.querySelectorAll('.popup');
const popupOpenButtons = document.querySelectorAll('[data-open-popup]');
const body = document.body;

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
        })
    })

if (popupAll.length)
    popupAll.forEach(popup => {
        const popupClose = popup.querySelector('.popup__close');

        popupClose.addEventListener('click', function (e) {
            popup.classList.remove('_open');
            unLockPadding();
        })

        popup.addEventListener('click', function (e) {
            if (e.target.classList.contains('popup')) {
                popup.classList.remove('_open')
                unLockPadding();
            }
        })
    })