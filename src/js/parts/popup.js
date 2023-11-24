import { lockPadding, unLockPadding } from "../utils/lockPadding.js";

const qrcodeLinks = document.querySelectorAll('#qrcode .qrcode-link');

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.hasAttribute('data-open-popup')) {
        e.preventDefault();
        const id = targetEl.getAttribute('data-id');
        const popup = document.querySelector(`.popup#${id}`);
        if (popup) {
            popup.classList.add('_open')
            lockPadding();
        }

        if (id == 'qrcode') {
            const type = targetEl.dataset.type;
            qrcodeLinks.forEach(item => {
                if (item.dataset.type != type) item.classList.remove('_active')
                else item.classList.add('_active')
            });

        }
    }

    if (targetEl.classList.contains('popup')) {
        targetEl.classList.remove('_open')
        if (
            (targetEl.id == 'qrcode' && document.querySelector('.popup#contacts._open')) ||
            (targetEl.id == 'contacts' && document.querySelector('.popup._service._open'))
        ) {
            document.querySelector('body').classList.add('_noscroll');
        }
        else {
            unLockPadding();
        }
    }

    if (targetEl.classList.contains('popup__close')) {
        const popup = targetEl.closest('.popup');
        popup.classList.remove('_open');

        if (
            (popup.id == 'qrcode' && document.querySelector('.popup#contacts._open')) ||
            (popup.id == 'contacts' && document.querySelector('.popup._service._open'))
        ) {
            document.querySelector('body').classList.add('_noscroll');
        }
        else {
            unLockPadding();
        }
    }
})


const socials = document.querySelectorAll('._socials');
if (socials.length && window.innerWidth <= 768) {
    socials.forEach(item => {
        const links = item.querySelectorAll('a');
        links.forEach(link => {
            if (link.hasAttribute('data-open-popup')) link.removeAttribute('data-open-popup')
        })
    })
}