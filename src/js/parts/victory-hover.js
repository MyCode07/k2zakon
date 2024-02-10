import { isMobile } from "../utils/isMobile.js";

export const victoryCardsHover = () => {
    var victoryCards = document.querySelectorAll('.victory__card');

    if (!victoryCards) return;

    if (!isMobile.any()) {
        document.addEventListener('mouseenter', ({ target: t }) => {
            if (t.className === 'victory__card-text') {
                t.closest('.victory__card').classList.add('_active')
            }
        }, true);

        document.addEventListener('mouseleave', e => {
            if (e.target.className === 'victory__card-text') {
                e.target.closest('.victory__card').classList.remove('_active')
            }
        }, true);
    }
    else {
        document.addEventListener('click', function (e) {
            let targetEl = e.target;
            if (targetEl.classList.contains('victory__card-text') || targetEl.closest('.victory__card-text')) {
                victoryCards = document.querySelectorAll('.victory__card');
                victoryCards.forEach(card => card.classList.remove('_active'))
                targetEl.closest('.victory__card').classList.toggle('_active')
            }
        })
    }
}