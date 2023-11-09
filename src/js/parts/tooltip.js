import { isMobile } from "../utils/isMobile.js";

function updateTooltipPosition(e, tooltip) {
    const xOffset = 10;
    const yOffset = 10;

    // Учитываем смещение прокрутки страницы
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Вычисляем позицию подсказки
    const tooltipX = e.clientX + xOffset + scrollX;
    const tooltipY = e.clientY + yOffset + scrollY;

    tooltip.style.top = tooltipY + 'px';

    if (!isMobile.any()) tooltip.style.left = tooltipX + 'px';
    else tooltip.style.left = '50%';
}


function moveToolTip(e, tooltipText, promptText) {
    toolTipElem.innerHTML = tooltipText;
    if (promptText) toolTipElem.innerHTML += `<br>${promptText}`;

    toolTipElem.style.display = 'block';
    updateTooltipPosition(e, toolTipElem);
}

const tooltips = document.querySelectorAll('[data-tooltip]');
const toolTipElem = document.querySelector('.tooltip');

export const toolTipAction = () => {
    if (!tooltips.length) return;

    tooltips.forEach(item => {
        const tooltipText = item.dataset.tooltip;
        const promptText = item.dataset.prompt;

        if (!isMobile.any()) {
            item.addEventListener('mouseenter', (e) => moveToolTip(e, tooltipText, promptText));

            item.addEventListener('mousemove', (e) => updateTooltipPosition(e, toolTipElem));

            item.addEventListener('mouseleave', () => toolTipElem.style.display = 'none');
        }
        else {
            item.addEventListener('click', (e) => {
                if (item.hasAttribute('href')) {
                    e.preventDefault();
                    toolTipElem.addEventListener('click', () => { window.location.href = item.getAttribute('href') })
                }

                moveToolTip(e, tooltipText, promptText)
            });
        }
    })
}

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (!targetEl.classList.contains('tooltip') && !targetEl.hasAttribute('data-tooltip') && !targetEl.parentNode.hasAttribute('data-tooltip')) {
        toolTipElem.style.display = 'none'
    }


    if (!targetEl.classList.contains('victory__card-text') && !targetEl.closest('.victory__card-text')
        && document.querySelector('.victory__card._active') && !targetEl.classList.contains('victory__card-descr') && !targetEl.closest('.victory__card-descr')) {
        document.querySelector('.victory__card._active').classList.remove('_active')
    }
})