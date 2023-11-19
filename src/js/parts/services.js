const input = document.querySelector('.services-search');
const servicesGrid = document.querySelector('.services-grid');
const links = document.querySelectorAll('.services-grid a');
const emptySearch = document.querySelector('.empty-search');

if (input) {
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

            [...links].every(link => {
                const listItemText = link.textContent.toLowerCase();

                if (!listItemText.includes(filterValue)) emptySearch.classList.add('_active');
                else emptySearch.classList.remove('_active');
            });
        }
    })
}
