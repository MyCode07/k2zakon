// table mobile scrollbar 
const table = document.querySelector('.table-container');

export const tabelScroll = () => {
    if (!table) return;

    const scrollbar = document.querySelector('.table-scrollbar');
    const scrollbarThumb = scrollbar.querySelector('span');
    const tableElem = table.querySelector('table');

    const tableWidth = tableElem.getBoundingClientRect().width;
    const containerWidth = table.getBoundingClientRect().width; console.log(containerWidth);

    let scrollLeft = table.scrollLeft
    let scrollPercent = scrollLeft / (tableWidth - containerWidth)

    let tableVisibleWidth = containerWidth / tableWidth * 100
    let tableHiddenWidth = 100 - tableVisibleWidth
    let scrollBarScroll = tableHiddenWidth * scrollPercent

    scrollbarThumb.style.maxWidth = tableVisibleWidth + '%';
    scrollbarThumb.style.left = 0

    if (window.innerWidth <= 992) {
        table.addEventListener('scroll', () => {
            scrollLeft = table.scrollLeft
            scrollPercent = scrollLeft / (tableWidth - containerWidth)
            scrollBarScroll = tableHiddenWidth * scrollPercent
            scrollbarThumb.style.left = scrollBarScroll + '%';
        })
    }
}