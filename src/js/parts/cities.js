
// var json_data = { "jsonPath": "https:\/\/k2zakon.ru\/wp-content\/themes\/advokat\/js\/russian-cities.json" };
var json_data = { "jsonPath": "files/russian-cities.json" };
var myAjax = { "ajaxurl": "https:\/\/k2zakon.ru\/wp-admin\/admin-ajax.php" };


const cityPopup = document.querySelector('.popup#city');
const inputCity = cityPopup.querySelector('input[type="search"]');
const cityPopupImg = cityPopup.querySelector('.popup__content-img');

const headerCity = document.querySelector('.header__city-btn');
const headerCityName = headerCity.querySelector('span');
const headerCityChoose = document.querySelector('.header__city-choose');
const headerCityChooseName = headerCityChoose.querySelector('p span');
const headerCityOk = headerCityChoose.querySelector('#yes');
const headerCityChoice = headerCityChoose.querySelector('#choose');
const footerCity = document.querySelector('.footer__center-btn');
const footerCityP = footerCity.querySelector('span');
const footerMap = document.querySelector('footer #map');


const headerTelefone = document.querySelector('.header__phone');
const headerTelefoneText = headerTelefone;
const footerDesktopPhone = document.querySelector('.footer__contact#footer-phone');
const footerEmail = document.querySelector('#footer-email');
const footerEmailText = footerEmail;


const landingBannerCity = document.querySelector('.landing_banner-city');
const yandexLink = document.querySelector('#yandex-link');
const googleLink = document.querySelector('#google-link');
const gisLink = document.querySelector('#gis-link');

let city = null;
let lat = null;
let lon = null;


// Создание списка городов, добавление функции выбора и поиска города
function createLiElements(data) {
    let ul = cityPopup.querySelector('ul');
    let addedNames = []; // Массив для хранения уже добавленных имен городов

    data.forEach(function (obj) {
        if (!addedNames.includes(obj.name)) {
            let span = document.createElement('span');
            span.textContent = obj.name;
            span.setAttribute('lat', obj.coords.lat);
            span.setAttribute('lon', obj.coords.lon);
            let li = document.createElement('li');
            li.classList.add('none');
            li.appendChild(span);
            ul.appendChild(li);
            addedNames.push(obj.name);
        }
    });

    const cities = cityPopup.querySelectorAll('ul li span');

    getCityCookie();

    if (city !== null) {
        headerCityName.textContent = city;
        headerCityName.setAttribute('lat', lat);
        headerCityName.setAttribute('lon', lon);

        if (city !== 'Вся Россия') {
            headerCityChooseName.textContent = city;
        }
        else {
            headerCityChooseName.textContent = 'не выбран';
        }

        console.log('Взяли город из Cookie');
    }
    else {
        getPlace(addedNames, cities);
        headerCityChoose.classList.remove('_open');
        console.log('Определили город по IP');
    }

    cities.forEach((newCity) => {
        newCity.addEventListener('click', () => {
            headerCityName.textContent = newCity.textContent;

            let latValue = newCity.getAttribute('lat');
            let lonValue = newCity.getAttribute('lon');
            headerCityName.setAttribute('lat', latValue);
            headerCityName.setAttribute('lon', lonValue);

            cityPopup.classList.remove('_open');
            headerCityChoose.classList.add('_open');

            city = headerCityName.textContent;
            lat = headerCityName.getAttribute('lat');
            lon = headerCityName.getAttribute('lon');

            setCityCookie('city', city, {
                secure: true,
                'max-age': 31536000000,
            });
            setCityCookie('lat', lat, {
                secure: true,
                'max-age': 31536000000,
            });
            setCityCookie('lon', lon, {
                secure: true,
                'max-age': 31536000000,
            });
        });
    });

    inputCity.addEventListener('input', () => {
        const filterValue = inputCity.value.toLowerCase();
        let matchedCount = 0;
        cityPopupImg.classList.add('none');

        if (filterValue === '') {
            cities.forEach((city, index) => {
                cityPopupImg.classList.remove('none');
                if (index !== 0) {
                    city.closest('li').classList.add('none');
                } else {
                    city.closest('li').classList.remove('none');
                }
            });
        } else {
            cities.forEach((city) => {
                const listItemText = city.textContent.toLowerCase();

                if (listItemText.startsWith(filterValue)) {
                    if (matchedCount < 12) {
                        city.closest('li').classList.remove('none');
                        matchedCount++;
                    } else {
                        city.closest('li').classList.add('none');
                    }
                } else {
                    city.closest('li').classList.add('none');
                }
            });
        }
    });
}

// Определение местонахождения пользователя по IP
async function getPlace(addedNames, cities) {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const dataCity = data.city;

    async function getTranslateCity() {
        const response1 = await fetch(
            'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=' +
            encodeURI(dataCity)
        );
        const data1 = await response1.json();
        const result1 = data1.flat(Infinity);
        const translate = result1[0];

        if (addedNames.includes(translate)) {
            headerCityName.textContent = translate;
            headerCityChooseName.textContent = translate;
            console.log(`Город ${translate} есть в списке.`);

            cities.forEach((city) => {
                if (city.textContent === headerCityName.textContent) {
                    let latValue = city.getAttribute('lat');
                    let lonValue = city.getAttribute('lon');
                    headerCityName.setAttribute('lat', latValue);
                    headerCityName.setAttribute('lon', lonValue);
                }
            });
        } else {
            headerCityName.textContent = 'Вся Россия';
            headerCityChooseName.textContent = 'не выбран';
            console.log(`Города ${translate} нет в списке.`);

            headerCityName.setAttribute('lat', '50.603664');
            headerCityName.setAttribute('lon', '36.571866');
        }
    }
    getTranslateCity();
}

// Сохраняем наименование города в Cookie
function setCityCookie(name, value, options = {}) {
    options = {
        path: '/',
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value);

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

// Получаем наименование города из Cookie
function getCityCookie() {
    const cookieString = document.cookie; // получить все куки
    const cookies = cookieString.split(';'); // разделить куки по точке с запятой

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('city=')) {
            const encodedValue = cookie.substring('city='.length, cookie.length);
            city = decodeURIComponent(encodedValue); // декодируем значение обратно в читаемую форму

            break;
        }
    }

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('city=')) {
            const encodedValue = cookie.substring('city='.length, cookie.length);
            city = decodeURIComponent(encodedValue); // декодируем значение обратно в читаемую форму

            break;
        }
    }

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('lat=')) {
            const encodedValue = cookie.substring('lat='.length, cookie.length);
            lat = decodeURIComponent(encodedValue); // декодируем значение обратно в читаемую форму

            break;
        }
    }

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('lon=')) {
            const encodedValue = cookie.substring('lon='.length, cookie.length);
            lon = decodeURIComponent(encodedValue); // декодируем значение обратно в читаемую форму

            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Использование переменной json_data.jsonPath для загрузки данных JSON с городами и выполнение функции createLiElements
    $.getJSON(json_data.jsonPath, createLiElements);

    // Кнопка модалки подтверждения города
    headerCityOk.addEventListener('click', () => {
        headerCityChoose.classList.add('_open');

        city = headerCityName.textContent;
        lat = headerCityName.getAttribute('lat');
        lon = headerCityName.getAttribute('lon');

        setCityCookie('city', city, {
            secure: true,
            'max-age': 31536000000,
        });

        setCityCookie('lat', lat, {
            secure: true,
            'max-age': 31536000000,
        });

        setCityCookie('lon', lon, {
            secure: true,
            'max-age': 31536000000,
        });
    });

    handleTextChange();
});


// Отслеживание изменения города
let previousText = headerCityName.textContent;

const defaultTelefon = headerTelefone.href;
const defaultTelefonText = headerTelefoneText.textContent;
const defaultEmail = footerEmail.href;
const defaultEmailText = footerEmailText.textContent;
const defaultAddress = footerCityP.textContent;

function handleTextChange() {
    const currentText = headerCityName.textContent;

    if (currentText !== previousText) {
        previousText = currentText;

        footerCity.classList.add('hide');
        footerMap.classList.add('hide');

        // Отправка названия города на сервер и получение информации о нем
        $.ajax({
            url: myAjax.ajaxurl,
            method: 'POST',
            data: { action: 'my_ajax_action', city: currentText },
            dataType: 'json',
            success: function (response) {
                if (
                    'phone_link' in response &&
                    response.phone_link !== '' &&
                    response.phone_link !== null
                ) {
                    headerTelefone.href = response.phone_link;
                    headerTelefoneText.textContent = response.phone;
                    footerDesktopPhone.textContent = response.phone;
                } else {
                    headerTelefone.href = defaultTelefon;
                    headerTelefoneText.textContent = defaultTelefonText;
                    footerDesktopPhone.textContent = defaultTelefonText;
                }

                if (
                    'email' in response &&
                    response.email !== '' &&
                    response.email !== null
                ) {
                    footerEmail.href = 'mailto:' + response.email;
                    footerEmailText.textContent = response.email;
                } else {
                    footerEmail.href = defaultEmail;
                    footerEmailText.textContent = defaultEmailText;
                }

                if (
                    'full_address' in response &&
                    response.full_address !== '' &&
                    response.full_address !== null
                ) {
                    footerCityP.textContent = response.full_address;
                    footerCity.classList.remove('hide');
                } else {
                    footerCityP.textContent = defaultAddress;
                    footerCity.classList.remove('hide');
                }

                if (yandexLink) {
                    let linkCounter = yandexLink.querySelector('.link-counter');
                    if ('yandex_link' in response && response.yandex_link !== '') {
                        yandexLink.href = response.yandex_link;
                        if (linkCounter) {
                            linkCounter.classList.add('start')
                            linkCounter.textContent = response.yandex_amount;
                        }
                    }
                }
                if (googleLink) {
                    let linkCounter = googleLink.querySelector('.link-counter');
                    if ('google_link' in response && response.google_link !== '') {
                        googleLink.href = response.google_link;
                        if (linkCounter) {
                            linkCounter.classList.add('start')
                            linkCounter.textContent = response.google_amount;
                        }
                    }
                }
                if (gisLink) {
                    let linkCounter = gisLink.querySelector('.link-counter');
                    if ('twogis_link' in response && response.twogis_link !== '') {
                        gisLink.href = response.twogis_link;
                        if (linkCounter) {
                            linkCounter.classList.add('start')
                            linkCounter.textContent = response.twogis_amount;
                        }
                    }
                }

                if (
                    'coordinate_latitude' in response &&
                    'coordinate_longitude' in response &&
                    response.coordinate_latitude !== '' &&
                    response.coordinate_longitude !== '' &&
                    response.coordinate_latitude !== null &&
                    response.coordinate_longitude !== null &&
                    'full_address' in response &&
                    response.full_address !== '' &&
                    response.full_address !== null
                ) {
                    changeMapLocation(
                        response.coordinate_latitude,
                        response.coordinate_longitude,
                        'Юристы K2',
                        response.full_address
                    );
                    footerMap.classList.remove('hide');
                } else {
                    console.log('Офиса в выбранном городе нет, ищем ближайший');
                    footerCity.classList.add('hide');

                    let latValue = headerCityName.getAttribute('lat');
                    let lonValue = headerCityName.getAttribute('lon');

                    // Отправка координаты города на сервер для подбора ближайшего города с офисом
                    $.ajax({
                        url: myAjax.ajaxurl,
                        method: 'POST',
                        data: {
                            action: 'my_ajax_action_map',
                            latitude: latValue,
                            longitude: lonValue,
                        },
                        dataType: 'json',
                        success: function (response) {
                            footerCityP.textContent = response.city_full_address;
                            changeMapLocation(
                                response.closest_latitude,
                                response.closest_longitude,
                                'Юристы K2',
                                response.city_full_address
                            );
                            console.log('Ближайший офис в г. ' + response.closest_city);
                            footerCity.classList.remove('hide');
                            footerMap.classList.remove('hide');
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            // Обработка ошибки
                            console.error(
                                'Ошибка выполнения AJAX-запроса:',
                                textStatus,
                                errorThrown
                            );
                        },
                        complete: function () {
                            console.log('Запрос завершен.');
                        },
                    });
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error(
                    'Ошибка выполнения AJAX-запроса:',
                    textStatus,
                    errorThrown
                );
            },
            complete: function () {
                console.log('Запрос завершен.');
            },
        });

        // if (landingBannerLocation) {
        //     if (previousText !== 'Вся Россия') {
        //         landingBannerCity.textContent = currentText;
        //         landingBannerLocation.classList.remove('hide');
        //     } else {
        //         landingBannerLocation.classList.add('hide');
        //     }
        // }
    }

    // Рекурсивно вызываем функцию для постоянного отслеживания изменений
    requestAnimationFrame(handleTextChange);
}

// Создаем карту
var myMap;

ymaps.ready(function () {
    myMap = new ymaps.Map('map', {
        center: [50.603664, 36.571866],
        zoom: 15.52,
    });

    //Добавьте метку (балун) на карту
    var myPlacemark = new ymaps.Placemark(
        [50.603664, 36.571866],
        {
            hintContent: 'Юристы K2',
            balloonContent: 'г. Белгород, ул. Свободная, 50, 4 этаж',
        },
        { iconColor: '#d8160c', preset: 'islands#redDotIcon' }
    );
    myMap.geoObjects.add(myPlacemark);
});

function changeMapLocation(lat, lon, hintContent, balloonContent) {
    if (myMap && myMap.geoObjects) {
        myMap.geoObjects.removeAll();
    }

    var newPlacemark = new ymaps.Placemark(
        [lat, lon],
        { hintContent: hintContent, balloonContent: balloonContent },
        { iconColor: '#d8160c', preset: 'islands#redDotIcon' }
    );

    if (myMap) {
        myMap.geoObjects.add(newPlacemark);
        myMap.setCenter([lat, lon], 15.52);
    }
}