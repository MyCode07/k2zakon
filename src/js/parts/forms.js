"use strict"

const url = '';

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form')

    if (forms.length) {
        forms.forEach(form => {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                let error = validateForm(form)

                let formData = new FormData(form);

                if (formFile && formFile.files[0]) {
                    formData.append('file', formFile.files[0]);
                }

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

                        setTimeout(() => {
                            resetForm(form)
                        }, 5000);
                    }
                    else {
                        failMessage(form)
                        form.classList.remove('_sending');

                        setTimeout(() => {
                            resetForm(form)
                        }, 5000);
                    }
                }

                else {
                    fillAllFields(form)

                    form.classList.remove('_sending');
                    setTimeout(() => {
                        resetForm(form)
                    }, 5000);
                }

            })

            checkCheckBoxes(form)
        })
    }

    function validateForm(form) {
        let error = 0;
        const formReq = [...form.querySelectorAll('[data-required] input')].concat([...form.querySelectorAll('[data-required] textarea')])

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]

            formRemoveError(input);
            validateInput()

            input.addEventListener('input', function () {
                formRemoveError(input);
                validateInput()
                resetForm(form)
            })

            function validateInput() {
                if (input.getAttribute('type') === 'email') {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                }
                else {
                    if (input.getAttribute('name') === 'phone') {
                        if (/[_]/.test(input.value) || input.value.length < 18) {
                            formAddError(input);
                            error++;
                        }

                    }
                    else {
                        if (input.value.length < 2) {
                            formAddError(input);
                            error++;
                        }
                    }
                }
            }
        }

        return error;
    }

    function formAddError(input) {
        input.closest('.form__input').classList.add('_error');
    }

    function formRemoveError(input) {
        input.closest('.form__input').classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function sentMessage(form) {
        const submitBtn = form.querySelector('.form__button button')

        submitBtn.classList.add('_sent');
    }

    function failMessage(form) {
        const submitBtn = form.querySelector('.form__button button')
        submitBtn.classList.add('_fail');
    }

    function fillAllFields(form) {
        const submitBtn = form.querySelector('.form__button button')
        submitBtn.classList.add('_error');
    }

    function resetForm(form) {
        const submitBtn = form.querySelector('.form__button button')
        submitBtn.classList.remove('_error');
        submitBtn.classList.remove('_fail');
        submitBtn.classList.remove('_sent');
    }


    const formFile = document.querySelector('input[name="file"]');
    if (formFile) {
        formFile.addEventListener('change', () => {
            uploadFile(formFile.files[0]);
        });

        function uploadFile(file) {
            if (!['application/msword', 'application/pdf', 'application/vnd.ms-powerpoint', 'text/plain'].includes(file.type)) {
                alert('Разрешены только текстовые документы.');
                document.querySelector('#filename').innerHTML = '';
                formFile.value = '';
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert('Файл должен быть менее 2 МБ.');
                return;
            }

            var reader = new FileReader();

            reader.onload = function (e) {
                document.querySelector('#filename').innerHTML = file.name;
            };

            reader.onerror = function (e) {
                alert('Ошибка');
            };

            reader.readAsDataURL(file);
        }
    }

});

function checkCheckBoxes(form) {
    const checkBoxContainers = form.querySelectorAll('[data-checkbox-container]')
    if (checkBoxContainers.length) {
        checkBoxContainers.forEach(container => {
            const cehckboxes = container.querySelectorAll('input[type="checkbox"]')

            if (cehckboxes.length) {
                cehckboxes.forEach(checkbox => {
                    checkbox.addEventListener('input', () => {
                        cehckboxes.forEach(item => {
                            if (item != checkbox) {
                                item.checked = false
                            }
                        })
                    })
                })
            }
        })
    }
}