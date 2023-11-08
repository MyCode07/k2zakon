const filters = document.querySelectorAll('.filter__btn');

if (filters.length) {
    filters.forEach(item => {
        const btn = item.querySelector('button');
        if (btn) {
            btn.addEventListener('click', () => {
                toggleTarget(item, filters, '_active');
            })

            const ul = btn.nextElementSibling
            if (ul) {
                const options = ul.querySelectorAll('li');
                if (options)
                    options.forEach(opt => {
                        opt.addEventListener('click', (e) => {

                            const label = opt.closest('.filter__btn').querySelector('label')
                            if (label) label.textContent = e.target.textContent

                            toggleTarget(opt, options, '_selected');
                        })
                    })
            }
        }
    });
}

function toggleTarget(target, targets, classname) {
    if (!target.classList.contains(classname)) {
        targets.forEach(item => {
            if (item.classList.contains(classname)) item.classList.remove(classname)
        })

        target.classList.add(classname)
    }
    else {
        target.classList.remove(classname)
    }
}


document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (!targetEl.closest('.filter__btn') && document.querySelector('.filter__btn._active')) {
        const filter = document.querySelector('.filter__btn._active');
        filter.classList.remove('_active')
    }

})