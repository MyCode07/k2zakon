document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('read-more')) {
        const content = targetEl.closest('section').querySelector('.read-more__text');
        content.classList.toggle('_active')

        if (content.classList.contains('_active')) targetEl.textContent = 'Скрыть'
        else targetEl.textContent = 'Читать подробнее...'
    }

    if (targetEl.classList.contains('view-more') && targetEl.classList.contains('view-more-img')) {
        const hiddenItems = targetEl.closest('section').querySelectorAll('[hidden]');

        if (hiddenItems.length)
            hiddenItems.forEach(item => {
                const img = item.querySelector('img')
                img.src = img.dataset.src

                item.removeAttribute('hidden')

                targetEl.remove();
            })
    }
})