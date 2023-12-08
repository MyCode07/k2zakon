export const checkCookies = () => {
    let cookieDate = localStorage.getItem('cookieDate');
    let cookieNotification = document.querySelector('.cookie-notification');
    let cookieBtns = cookieNotification.querySelectorAll('.cookie-accept');

    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {
        cookieNotification.classList.add('_active');
    }

    if (cookieBtns.length) {
        // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX

        cookieBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                localStorage.setItem('cookieDate', Date.now());
                cookieNotification.classList.remove('_active');
            });
        })
    }
}