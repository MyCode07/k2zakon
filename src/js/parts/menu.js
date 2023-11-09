import { isMobile } from '../utils/isMobile.js';

const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
const menuLinks = document.querySelectorAll('.menu nav li a');

if (burger) {
    burger.addEventListener('click', (е) => {
        burger.classList.toggle('_active');
        menu.classList.toggle('_open');
    })
}

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.tagName == 'NAV' && targetEl.closest('header') && window.innerWidth <= 768 && targetEl.classList.contains('_open')) {
        burger.classList.remove('_active');
        menu.classList.remove('_open');
    }
})

if (menuLinks.length) {
    menuLinks.forEach(link => {
        link.addEventListener('click', (е) => {

            if (menu.classList.contains('_open')) {
                menu.classList.remove('_open');
                burger.classList.remove('_active');
            }
        })
    })
}


const arrow = `<button><svg width="6" height="10" viewBox="0 0 6 10" fill="none">
<path d="M1 0.757324L5.24264 4.99996L1 9.24261"  stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>`;

const submenuList = document.querySelectorAll('nav ul li');
if (submenuList.length) {
    submenuList.forEach(li => {
        const submenu = li.querySelector('ul');

        if (submenu) {
            const link = submenu.previousElementSibling;
            link.insertAdjacentHTML('afterend', arrow);

            const btn = li.querySelector('button');

            if (btn && isMobile.any()) {
                btn.addEventListener('click', function () {
                    toggleMenu(li)
                })
            }
        }
    })


    function toggleMenu(item) {
        const menu = item.closest('ul');
        const menuItems = menu.querySelectorAll('li');

        if (!item.hasAttribute('data-open')) {
            const openitem = menu.querySelector('li[data-open]');
            if (openitem) {
                openitem.removeAttribute('data-open')
            }

            menuItems.forEach(item => {
                item.removeAttribute('data-open')
            })

            item.setAttribute('data-open', 'open')
        }
        else {
            item.removeAttribute('data-open')
        }
    }

}