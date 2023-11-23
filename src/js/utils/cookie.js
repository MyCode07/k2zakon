export const checkCookies = () => {
    let cookieDate = localStorage.getItem('cookieDate');
    let cookieNotification = document.querySelector('.cookie-notification');
    let cookieBtn = cookieNotification.querySelector('.cookie-accept');

    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {
        cookieNotification.classList.add('_active');
    }

    if (cookieBtn) {
        // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX
        cookieBtn.addEventListener('click', function () {
            localStorage.setItem('cookieDate', Date.now());
            cookieNotification.classList.remove('_active');
        });
    }
}