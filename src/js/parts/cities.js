import { lockPadding, unLockPadding } from "../utils/lockPadding.js";

var json_data = { "jsonPath": "https://k2zakon.ru/wp-content/themes/blank-sheet/assets/files/russian-cities.json" };

const cityPopup = document.querySelector('.popup#city');
const inputCity = cityPopup.querySelector('input[type="search"]');
const cityPopupImg = cityPopup.querySelector('.popup__content-img');
const cityPopupChack = cityPopup.querySelector('.popup__content-chack');

const header = document.querySelector('.header');
const headerCity = document.querySelector('.header__city-btn');
const headerCityName = headerCity.querySelector('span');
const headerCityChoose = document.querySelector('.header__city-choose');
const headerCityChooseName = headerCityChoose.querySelector('p span');
const headerCityOk = headerCityChoose.querySelector('#yes');
const headerCityChoice = headerCityChoose.querySelector('#choose');
const footerCity = document.querySelector('.footer__center-btn');
const footerCityP = footerCity.querySelector('span');
const footerMap = document.querySelector('footer #map');
const calendar = document.querySelector('._calendar-data');


const headerTelefone = document.querySelector('.header__phone');
const headerTelefoneText = headerTelefone;
const footerDesktopPhone = document.querySelector('.footer__contact#footer-phone');
const footerEmail = document.querySelector('#footer-email');
const footerEmailText = footerEmail;

const yandexLink = document.querySelector('.yandex');
const googleLink = document.querySelector('.google');
const gisLink = document.querySelector('.gis');

let city = null;
let lat = null;
let lon = null;


const footerMapDescop = document.querySelector('.map-desctop');
const footerMapMobile = document.querySelector('.map-mobile');
const taxiMapLinks = document.querySelectorAll('.taxi-map-link');
const yandexMapLinks = document.querySelectorAll('.yandex-map-link');
const googleMapLinks = document.querySelectorAll('.google-map-link');
const twoGisMapLinks = document.querySelectorAll('.twogis-map-link');


if (headerCityChoice) {
    headerCityChoice.addEventListener('click', () => headerCityChoose.classList.add('_hide'))
}

document.addEventListener('DOMContentLoaded', function (e) {
    setTimeout(() => {
        if (headerCityChoose && !headerCityChoose.classList.contains('_hide')) {
            setCityNameCookie();
        }
    }, 3000);
})

const footerEmailCopy = document.querySelector('#footer-email-copy');
if (footerEmailCopy) {
    var copyText = footerEmailCopy.querySelector("input");

    footerEmailCopy.addEventListener('click', () => {
        copyToClipboard(copyText.value)
    })
}


export function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return window.clipboardData.setData("Text", text);
    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

if (cityPopupImg) {
    cityPopupImg.addEventListener('click', () => {
        cityPopupImg.classList.add('none')
        cityPopupChack.classList.add('_active')
        document.querySelector('#city .all').classList.add('none')
    })
}

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

    if (!header.classList.contains('_static-info')) {

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
            headerCityChoose.classList.remove('_hide');
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
                headerCityChoose.classList.add('_hide');

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

                unLockPadding();
            });
        });

        inputCity.addEventListener('input', () => {
            const filterValue = inputCity.value.toLowerCase();
            let matchedCount = 0;
            cityPopupImg.classList.add('none');
            cityPopupChack.classList.remove('_active');

            document.querySelector('#city .all').classList.remove('none')


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

// document.addEventListener('DOMContentLoaded', () => {
// Использование переменной json_data.jsonPath для загрузки данных JSON с городами и выполнение функции createLiElements
$.getJSON(json_data.jsonPath, createLiElements);

// Кнопка модалки подтверждения города
headerCityOk.addEventListener('click', setCityNameCookie);

function setCityNameCookie() {
    headerCityChoose.classList.add('_hide');

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
}


// Отслеживание изменения города
let previousText = headerCityName.textContent;

const defaultTelefon = adminajaxurl.defalut_phone_link;
const defaultTelefonText = adminajaxurl.defalut_phone;
const defaultEmail = 'mailto:' + adminajaxurl.defalut_email;
const defaultEmailText = footerEmailText.defalut_email;
const defaultAddress = footerCityP.textContent;

let closestCityHasOffiice = ''
function changeCityName(currentcity) {
    const cities = document.querySelectorAll('.city');
    if (!cities.length) return;

    if (currentcity.toLowerCase == 'вся россия') {
        currentcity = closestCityHasOffiice;
    }

    console.log('Смена города в .city на ' + currentcity);

    cities.forEach(item => {
        if (!item.closest('.no-city-change')) item.textContent = currentcity
    })
}

function changeCityLogo(currentcitylogo) {
    const cittLogos = document.querySelectorAll('.city-logo');
    if (!cittLogos.length) return;

    console.log('Смена лого города в .city-logo на ' + currentcitylogo);
    cittLogos.forEach(item => {

        if (!item.closest('.no-city-change')) {
            laodPictureSource(item, currentcitylogo)
            item.src = currentcitylogo
        }
    })
}

function laodPictureSource(image, url) {
    const picture = image.closest('picture');
    if (picture) {
        let source = picture.querySelectorAll('source');
        console.log(source);
        if (source.length) {
            source.forEach(sour => {
                sour.srcset = url
                sour.dataset.lazySrcset = url
            })
        }
    }
}

function handleTextChange() {
    const currentText = headerCityName.textContent;

    if (currentText.toLowerCase() !== previousText.toLowerCase()) {
        previousText = currentText;

        changeCityName(currentText)

        footerCity.classList.add('hide');
        footerMap.classList.add('hide');

        // Отправка названия города на сервер и получение информации о нем
        $.ajax({
            url: adminajaxurl.ajaxurl,
            method: 'POST',
            data: { action: 'my_ajax_action', city: currentText },
            dataType: 'json',
            success: function (response) {
                changeCityLogo(response.city_logo);
                console.log(response);

                closestCityHasOffiice = response.city_name

                if (response.calendar) {
                    changeCalendarInfo(response.calendar.calendar_title, response.calendar.calendar_text, response.calendar.calendar_btn)
                }

                if (
                    'phone_link' in response &&
                    response.phone_link !== '' &&
                    response.phone_link !== null
                ) {
                    if (!header.classList.contains('_static-info')) {
                        headerTelefone.href = response.phone_link;
                        headerTelefoneText.textContent = response.phone;
                        footerDesktopPhone.textContent = response.phone;
                    }
                }
                else {
                    if (!header.classList.contains('_static-info')) {
                        headerTelefone.href = defaultTelefon;
                        headerTelefoneText.textContent = defaultTelefonText;
                        footerDesktopPhone.textContent = defaultTelefonText;
                    }
                }

                if (
                    'email' in response &&
                    response.email !== '' &&
                    response.email !== null
                ) {
                    if (!header.classList.contains('_static-info')) {
                        footerEmail.href = 'mailto:' + response.email;
                        footerEmailText.textContent = response.email;
                    }
                }
                else {
                    if (!header.classList.contains('_static-info')) {
                        footerEmail.href = defaultEmail;
                        footerEmailText.textContent = defaultEmailText;
                    }
                }

                if (
                    'full_address' in response &&
                    response.full_address !== '' &&
                    response.full_address !== null
                ) {
                    if (!header.classList.contains('_static-info')) {
                        footerCityP.textContent = response.full_address;
                        footerCity.classList.remove('hide');
                    }
                }
                else {
                    if (!header.classList.contains('_static-info')) {
                        footerCityP.textContent = defaultAddress;
                        footerCity.classList.remove('hide');
                    }
                }

                if (yandexLink) {
                    let linkCounter = yandexLink.querySelector('.link-counter');
                    if ('yandex_link' in response && response.yandex_link !== '') {
                        yandexLink.href = response.yandex_link;
                        if (linkCounter && !header.classList.contains('_static-info')) {
                            linkCounter.classList.add('start')
                            // linkCounter.textContent = response.yandex_amount;
                            let number = parseInt(response.yandex_amount)
                            run(linkCounter, number);
                        }
                    }
                }
                if (googleLink) {
                    let linkCounter = googleLink.querySelector('.link-counter');
                    if ('google_link' in response && response.google_link !== '') {
                        googleLink.href = response.google_link;
                        if (linkCounter && !header.classList.contains('_static-info')) {
                            linkCounter.classList.add('start')
                            // linkCounter.textContent = response.google_amount;

                            let number = parseInt(response.google_amount)
                            run(linkCounter, number);
                        }
                    }
                }
                if (gisLink) {
                    let linkCounter = gisLink.querySelector('.link-counter');
                    if ('twogis_link' in response && response.twogis_link !== '') {
                        gisLink.href = response.twogis_link;
                        if (linkCounter && !header.classList.contains('_static-info')) {
                            linkCounter.classList.add('start')
                            // linkCounter.textContent = response.twogis_amount;

                            let number = parseInt(response.twogis_amount)
                            run(linkCounter, number);
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

                    if (!header.classList.contains('_static-info')) {
                        changeMapLocation(
                            response.desctop_map,
                            response.mobile_map,
                            response.yandex_link,
                            response.google_link,
                            response.twogis_link,
                            response.taxi_link
                        );
                        footerMap.classList.remove('hide');
                    }
                }

                else {
                    console.log('Офиса в выбранном городе нет, ищем ближайший');
                    footerCity.classList.add('hide');

                    let latValue = headerCityName.getAttribute('lat');
                    let lonValue = headerCityName.getAttribute('lon');

                    // Отправка координаты города на сервер для подбора ближайшего города с офисом
                    $.ajax({
                        url: adminajaxurl.ajaxurl,
                        method: 'POST',
                        data: {
                            action: 'my_ajax_action_map',
                            latitude: latValue,
                            longitude: lonValue,
                        },
                        dataType: 'json',
                        success: function (response) {
                            console.log(response);
                            console.log('Ближайший офис в г. ' + response.closest_city);

                            if (response.calendar) {
                                changeCalendarInfo(response.calendar.calendar_title, response.calendar.calendar_text, response.calendar.calendar_btn)
                            }


                            if (!header.classList.contains('_static-info')) {
                                footerCityP.textContent = response.city_full_address;
                                changeMapLocation(
                                    response.desctop_map,
                                    response.mobile_map,
                                    response.yandex_link,
                                    response.google_link,
                                    response.twogis_link,
                                    response.taxi_link
                                );
                                footerCity.classList.remove('hide');
                                footerMap.classList.remove('hide');
                                changeCityLogo(response.city_logo);
                                closestCityHasOffiice = response.closest_city
                            }

                            if (yandexLink && !header.classList.contains('_static-info')) {
                                let linkCounter = yandexLink.querySelector('.link-counter');
                                if ('yandex_link' in response && response.yandex_link !== '') {
                                    yandexLink.href = response.yandex_link;
                                    if (linkCounter) {
                                        linkCounter.classList.add('start')
                                        // linkCounter.textContent = response.yandex_amount;
                                        let number = parseInt(response.yandex_amount)
                                        run(linkCounter, number);
                                    }
                                }
                            }
                            if (googleLink && !header.classList.contains('_static-info')) {
                                let linkCounter = googleLink.querySelector('.link-counter');
                                if ('google_link' in response && response.google_link !== '') {
                                    googleLink.href = response.google_link;
                                    if (linkCounter) {
                                        linkCounter.classList.add('start')
                                        // linkCounter.textContent = response.google_amount;

                                        let number = parseInt(response.google_amount)
                                        run(linkCounter, number);
                                    }
                                }
                            }
                            if (gisLink && !header.classList.contains('_static-info')) {
                                let linkCounter = gisLink.querySelector('.link-counter');
                                if ('twogis_link' in response && response.twogis_link !== '') {
                                    gisLink.href = response.twogis_link;
                                    if (linkCounter) {
                                        linkCounter.classList.add('start')
                                        // linkCounter.textContent = response.twogis_amount;

                                        let number = parseInt(response.twogis_amount)
                                        run(linkCounter, number);
                                    }
                                }
                            }
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
    }

    // Рекурсивно вызываем функцию для постоянного отслеживания изменений
    requestAnimationFrame(handleTextChange);
}
handleTextChange();


function changeCalendarInfo(title, text, btn) {
    if (!calendar) return;
    calendar.querySelector('h2').textContent = title;
    calendar.querySelector('p').textContent = text;
    calendar.querySelector('a').textContent = btn.title;
    calendar.querySelector('a').href = btn.url;
}


function changeMapLocation(desctopMap, mobileMap, yandexLink, googleLink, twoGisLink, taxiLink = false) {
    changeMapImage(footerMapDescop, desctopMap)
    changeMapImage(footerMapMobile, mobileMap)

    changeMapLinks(taxiMapLinks, taxiLink)
    changeMapLinks(yandexMapLinks, yandexLink)
    changeMapLinks(googleMapLinks, googleLink)
    changeMapLinks(twoGisMapLinks, twoGisLink)

    function changeMapImage(map, image) {
        const mapImage = map.querySelector('img');
        const mapSources = map.querySelectorAll('source');

        mapImage.src = image
        if (mapSources.length) {
            mapSources.forEach(item => item.srcset = image)
        }
    }

    function changeMapLinks(links, href) {
        if (links.length && href) {
            links.forEach(item => item.href = href)
        }
    }
}



export function run(elem, num, time = 4000, step = 1) {
    if (0 < num < 50) time = 1000;
    else if (50 < num < 100) time = 2000;
    else if (100 < num < 150) time = 3000;
    else time = 4000

    let n = 0;
    let t = Math.floor(time / (num / step));
    let interval = setInterval(() => {
        n = n + step;
        if (n == num) {
            clearInterval(interval);
        }
        elem.innerHTML = n;
    }, t);
}