const toolBarBtns = document.querySelectorAll('.mobile__controll button');
const toolbarMenus = document.querySelectorAll('.menu-mobile');
const body = document.body;


if (toolBarBtns) {
    toolBarBtns.forEach(btn => {
        const type = btn.dataset.toolbarId
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('_active')) {
                let activeBtn = document.querySelector('.mobile__controll button._active');
                if (activeBtn) activeBtn.classList.remove('_active')

                btn.classList.add('_active')
            }
            else btn.classList.remove('_active')


            toolbarMenus.forEach(menu => {
                if (menu.dataset.toolbar == type) {
                    if (btn.classList.contains('_active')) {
                        menu.classList.add('_open')
                        body.classList.add('_noscroll');
                    }
                    else {
                        menu.classList.remove('_open')
                        body.classList.remove('_noscroll');
                    }
                }
                else {
                    menu.classList.remove('_open')
                }
            })
        })
    })
}
