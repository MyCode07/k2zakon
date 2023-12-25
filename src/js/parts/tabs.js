import { copyToClipboard } from "./cities.js";

const tabs = document.querySelectorAll('.details-tabs button');
const tabsContent = document.querySelectorAll('.details-content');
const block = document.querySelector('.details-block');

if (tabs.length) {
    tabs.forEach(tab => {
        const id = tab.dataset.id;

        tab.addEventListener('click', function () {
            if (!tab.classList.contains('_active')) {
                tabs.forEach(item => {
                    if (item.dataset.id == id) {
                        item.classList.add('_active')
                    }
                    else {
                        item.classList.remove('_active')
                    }
                })

                tabsContent.forEach(item => {
                    if (item.dataset.id == id) {
                        item.classList.add('_active')
                    }
                    else {
                        item.classList.remove('_active')
                    }
                })

                block.classList.toggle('_right')
            }
        })
    })
}

const copyToTexts = document.querySelectorAll('.details .copy');
if (copyToTexts.length) {
    copyToTexts.forEach(item => {
        const text = item.querySelector('span').textContent;
        item.addEventListener('click', function () {
            copyToClipboard(text);
        })
    })
}