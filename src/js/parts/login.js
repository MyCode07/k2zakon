const login = document.querySelector('.login');
const account = document.querySelector('.account');

account.addEventListener('click', (e) => {
    if (document.querySelector('.login._open')) {
        login.classList.remove('_open');
    }
    else {
        login.classList.toggle('_open');
    }
})