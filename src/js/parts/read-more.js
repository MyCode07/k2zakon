document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('read-more')) {
        const content = targetEl.closest('section').querySelector('.read-more__text');
        content.classList.toggle('_active')

        if (content.classList.contains('_active')) targetEl.textContent = 'Скрыть'
        else targetEl.textContent = 'Читать подробнее...'
    }

    if (targetEl.classList.contains('view-more') && targetEl.classList.contains('view-more-img')) {
        const hiddenItems = targetEl.closest('section').querySelectorAll('.education__gallery-item[hidden]');

        targetEl.classList.toggle('_active');
        const textOutput = targetEl.querySelector('span')
        const text = textOutput.dataset.text;

        if (targetEl.classList.contains('_active')) {
            if (hiddenItems.length)
                hiddenItems.forEach(item => {
                    item.classList.add('_active');
                    const img = item.querySelector('img')
                    const sources = item.querySelectorAll('source')

                    img.src = img.dataset.src
                    if (sources.length) sources.forEach(source => source.srcset = img.dataset.src)

                    item.removeAttribute('hidden')
                })

            textOutput.textContent = 'Скрыть';
        }
        else {
            const hideElems = targetEl.closest('section').querySelectorAll('.education__gallery-item._active');
            if (hideElems.length)
                hideElems.forEach(item => {
                    item.setAttribute('hidden', true)
                    item.classList.remove('_active');
                })

            textOutput.textContent = text;
        }
    }
})