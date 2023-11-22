const openMoreDiploms = document.querySelector('.education .view-more');
const galleryhiddenItems = document.querySelectorAll('.education__gallery .education__gallery-item[hidden]'); 

if (openMoreDiploms && galleryhiddenItems.length) {
    openMoreDiploms.addEventListener('click', () => {
        galleryhiddenItems.forEach(item => {
            const img = item.querySelector('img')
            img.src = img.dataset.src

            item.removeAttribute('hidden')

            openMoreDiploms.remove();
        })
    })
} 