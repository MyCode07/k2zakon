"use strict"

const url = adminajaxurl.ajaxurl;

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form')

    if (forms.length) {
        forms.forEach(form => {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                let error = validateForm(form)
                let formData = new FormData(form);

                console.log(error);

                if (error === 0) {
                    form.classList.add('_sending');
                    let response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        sentMessage(form)
                        form.reset();
                        form.classList.remove('_sending');
                    }
                    else {
                        failMessage(form)
                        form.classList.remove('_sending');
                    }
                }

                else {
                    fillAllFields(form)
                    form.classList.remove('_sending');
                }
            })
        })
    }

    function validateForm(form) {
        let error = 0;
        let formReq = [...form.querySelectorAll('[data-required] input')].concat([...form.querySelectorAll('[data-required] textarea')])
        const phone = form.querySelector('input[name="your_phone"]')
        const email = form.querySelector('input[type="email"]')
        const validateContact = form.querySelector('.validate-contact')

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]

            formRemoveError(input);
            validateInput()

            input.addEventListener('input', function () {
                formRemoveError(input);
                validateInput()
            })

            function validateInput() {

                if (phone.value == '' && email.value == '') {
                    validateContact.classList.add('_active');
                }

                if (input.getAttribute('type') === 'email') {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                    else {
                        validateContact.classList.remove('_active');
                    }

                    if (phone.value == '') {
                        phone.closest('.form__input').removeAttribute('data-required')
                        email.closest('.form__input').setAttribute('data-required', true)
                    }
                    else {
                        phone.closest('.form__input').setAttribute('data-required', true)
                        email.closest('.form__input').removeAttribute('data-required')
                    }
                }
                else {
                    if (input.getAttribute('name') === 'your_phone') {
                        if (/[_]/.test(input.value) || input.value.length < 18) {
                            formAddError(input);
                            error++;
                        }
                        else {
                            validateContact.classList.remove('_active');
                        }

                        if (email.value == '') {
                            email.closest('.form__input').removeAttribute('data-required')
                            phone.closest('.form__input').setAttribute('data-required', true)
                        }
                        else {
                            email.closest('.form__input').setAttribute('data-required', true)
                            phone.closest('.form__input').removeAttribute('data-required')
                        }
                    }
                    else {
                        if (input.value.length < 2) {
                            formAddError(input);
                            error++;
                        }
                    }
                }

                formReq = [...form.querySelectorAll('[data-required] input')].concat([...form.querySelectorAll('[data-required] textarea')])
            }
        }

        return error;
    }

    function formAddError(input) {
        const validate = input.closest('.form__input').querySelector('.validate')
        if (validate) validate.classList.add('_active');

    }

    function formRemoveError(input) {
        const validate = input.closest('.form__input').querySelector('.validate')
        if (validate) validate.classList.remove('_active');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function sentMessage() {
        const activePopup = document.querySelector('.popup#contacts._active');
        if (activePopup) {
            activePopup.classList.remove('_active')
        }
        
        popup.classList.add('_open');
        document.body.classList.add('_noscroll');
    }

    function failMessage(form) {

    }

    function fillAllFields(form) {

    }

    function resetForm(form) {

    }


    function submitEmail(popup) {

    }

    function setSentFormCookie() {
        const options = {
            path: '/',
        };
        const name = 'sent_mail';
        const value = true

        if (options.expires instanceof Date) options.expires = options.expires.toUTCString();

        let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += '; ' + optionKey;

            let optionValue = options[optionKey];

            if (optionValue !== true) {
                updatedCookie += '=' + optionValue;
            }
        }

        document.cookie = updatedCookie;
        console.log(name + ' обновлен в Cookie');
    }
});
