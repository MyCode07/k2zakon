import { toolTipAction } from "./tooltip.js";
import { victoryCardsHover } from "./victory-hover.js";


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
                const options = ul.querySelectorAll('a');
                if (options)
                    options.forEach(opt => {
                        opt.addEventListener('click', (e) => {
                            e.preventDefault();

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
    targets.forEach(item => {
        if (item.classList.contains(classname)) item.classList.remove(classname)
    })
    target.classList.add(classname)
}


document.addEventListener('click', function (e) {
    let targetEl = e.target;

    const filter = document.querySelector('.filter__btn._active');

    if (targetEl.closest('.filter__btn ul li') || targetEl.classList.contains('filter__btn')) {
        filter.classList.remove('_active')

        setTimeout(() => {
            toolTipAction();
            victoryCardsHover();
        }, 1000);
    }

    if (targetEl.classList.contains('view-more')) {
        setTimeout(() => {
            toolTipAction();
            victoryCardsHover();
        }, 1000);
    }
})