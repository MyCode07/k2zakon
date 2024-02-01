const input = document.querySelector('.services-search__input');
const servicesGrid = document.querySelector('.services-grid');
const links = document.querySelectorAll('.services-grid a');
const emptySearch = document.querySelector('.empty-search');

if (input) {

    if (window.innerWidth <= 768) {
        input.placeholder = input.dataset.placeholderMobile
    }


    input.addEventListener('input', () => {
        const filterValue = input.value.toLowerCase();

        if (filterValue === '') {
            servicesGrid.classList.remove('_active')

            links.forEach(link => link.closest('li').classList.remove('none'));
            emptySearch.classList.remove('_active');
        }
        else {
            servicesGrid.classList.add('_active')

            links.forEach(link => {
                const listItemText = link.textContent.toLowerCase();

                if (listItemText.includes(filterValue)) link.closest('li').classList.remove('none');
                else link.closest('li').classList.add('none');
            });

            let onEmpty = [...links].every(link => {
                return link.closest('li').classList.contains('none'); 
            });

            if (onEmpty) emptySearch.classList.add('_active');
            else emptySearch.classList.remove('_active');
        }
    })
}
