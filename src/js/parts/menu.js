import { isMobile } from '../utils/isMobile.js';

const menu = document.querySelector('.menu');
const burgers = document.querySelectorAll('.burger');
const menuLinks = document.querySelectorAll('.menu nav li a');
const container = document.querySelector('.header__container');

let left = container.getBoundingClientRect().left;
menu.style.left = left + 'px';

window.addEventListener('resize', () => {
    left = container.getBoundingClientRect().left
    menu.style.left = left + 'px';
})

if (burgers.length) {
    burgers.forEach(burger => {
        burger.addEventListener('click', (е) => {
            burgers.forEach(burger => {
                burger.classList.toggle('_active');
            })

            menu.classList.toggle('_open');
        })
    })
}



if (menuLinks.length) {
    menuLinks.forEach(link => {
        const li = link.closest('li');

        link.addEventListener('click', (е) => {

            if (menu.classList.contains('_open') && li.getAttribute('id') != 'menu-item-350') {
                menu.classList.remove('_open');

                burgers.forEach(burger => {
                    burger.classList.toggle('_active');
                })
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

            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 992 && li.getAttribute('id') == 'menu-item-350') {
                    e.preventDefault();
                    toggleMenu(li)
                }
            })
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

document.addEventListener('click', function (e) {
    let targetEl = e.target;
    if (!targetEl.classList.contains('menu') && !targetEl.closest('.menu') && !targetEl.classList.contains('burger') && menu.classList.contains('_open')) {
        menu.classList.remove('_open')
        burgers.forEach(burger => {
            burger.classList.toggle('_active');
        })
    }
})