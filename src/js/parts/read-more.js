document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('read-more')) {
        const content = targetEl.closest('section').querySelector('.read-more__text-content');
        content.classList.toggle('_active')

        if (content.classList.contains('_active')) targetEl.textContent = 'Скрыть'
        else targetEl.textContent = 'Читать подробнее...'
    }
})