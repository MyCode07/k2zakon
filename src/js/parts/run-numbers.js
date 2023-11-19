import { run } from "./cities.js";

const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runNum(entry.target)

            observer.unobserve(entry.target)
        }
    })
}, { threshold: 0.2 });


function runNum(entry) {
    let nums = entry.querySelectorAll('.run');
    nums.forEach(item => {
        let number = parseInt(item.textContent)
        run(item, number);
    })
}


const numbers = document.querySelectorAll('.run-numbers');
export const runNumbers = () => {
    if (!numbers.length) return;
    numbers.forEach(item => {
        observer.observe(item)
    })
}