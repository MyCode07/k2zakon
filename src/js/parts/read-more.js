const readbox = document.querySelector('.why__text-content');
const viewButton = document.querySelector('.view-btn');

if (readbox) {
    viewButton.addEventListener('click', () => {
        readbox.classList.toggle('_active')

        if (document.querySelector('.why__text-content._active')) {
            viewButton.textContent = 'Скрыт'
        } else {
            viewButton.textContent = 'Читать подробнее...'
        }
    })
}