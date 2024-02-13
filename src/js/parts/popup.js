import { lockPadding, unLockPadding } from "../utils/lockPadding.js";

const qrcodeLinks = document.querySelectorAll('#qrcode .qrcode-link');


const getSentFormCookie = () => {
    const cookieString = document.cookie; // получить все куки
    const cookies = cookieString.split(';'); // разделить куки по точке с запятой
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('sent_mail=')) return true;
    }

    return false;
}

const sendEmail = getSentFormCookie();
console.log('sendEmail ' + sendEmail);

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

        if (targetEl.closest('.qrcode-link')) {
            const popup = targetEl.closest('.popup');
            popup.classList.remove('_open');
        }

        if (id == 'chat') {
            if (targetEl.classList.contains('_active')) {
                targetEl.classList.remove('_active')
                document.querySelector('body').classList.remove('_noscroll');
                popup.classList.remove('_open');
                unLockPadding();
            }
            else {
                targetEl.classList.add('_active')
            }
        }
        else {
            const chatBtn = document.querySelector('[data-id="chat"]');
            const chatPopup = document.querySelector('.popup#chat._open');

            if (chatBtn) {
                chatBtn.style.display = 'none'
                chatBtn.classList.remove('_active')

                if (chatPopup) {
                    chatPopup.classList.remove('_open')
                }
            }
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

        const chatBtn = document.querySelector('[data-id="chat"]');
        if (chatBtn) {
            chatBtn.style.display = 'block'
            chatBtn.classList.remove('_active')
            document.querySelector('body').classList.remove('_noscroll');
            targetEl.classList.remove('_open');
        }
    }

    if (targetEl.classList.contains('popup__close') || targetEl.hasAttribute('data-close-popup')) {
        const popup = targetEl.closest('.popup');
        popup.classList.remove('_open');

        if (targetEl.hasAttribute('data-close-popup') && popup.classList.contains('_chack')) {
            document.querySelector('body').classList.add('_noscroll');
            document.querySelector('.popup#contacts').classList.add('_open');
        }
        else if (popup.id == 'chack') {
            document.querySelector('body').classList.add('_noscroll');
            document.querySelector('.popup#chack-second').classList.add('_open');

            if (chatBtn) {
                document.querySelector('body').classList.add('_noscroll');
                chatBtn.style.display = 'none'
            }
        }
        else if (popup.id == 'contacts' && sendEmail == false) {
            document.querySelector('body').classList.add('_noscroll');
            document.querySelector('.popup#chack').classList.add('_open');
        }
        else {
            if (
                (popup.id == 'qrcode' && document.querySelector('.popup#contacts._open')) ||
                (popup.id == 'contacts' && document.querySelector('.popup._service._open'))
            ) {
                document.querySelector('body').classList.add('_noscroll');

                if (chatBtn) {
                    chatBtn.style.display = 'none'
                }
            }
            else {
                unLockPadding();
            }
        }

        if (popup.id == 'contacts') {
            if (chatBtn) {
                document.querySelector('body').classList.add('_noscroll');
                chatBtn.style.display = 'none'
            }
        }

        const chatBtn = document.querySelector('[data-id="chat"]');
        if (chatBtn) {
            chatBtn.style.display = 'block'
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

