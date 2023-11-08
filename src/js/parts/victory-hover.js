import { gsap } from "gsap";
// import { isMobile } from "../isMobile.js";


// if (!isMobile.any()) {
const advantagesList = document.querySelectorAll('.js-hover');

if (advantagesList.length) {

    advantagesList.forEach(item => {
        const div = item.querySelector('div');
        const animation = gsap.to(div, {
            opacity: 1,
            duration: 0.2,
            ease: "ease-in-out"
        });

        animation.reverse();
        item.addEventListener("mouseenter", () => animation.play());
        item.addEventListener("mouseleave", () => animation.reverse());
        item.addEventListener("mousemove", (e) => moveText(e, item));
    })
}
// }

function moveText(e, item) {
    const div = item.querySelector('div');
    const left = (e.clientX - item.getBoundingClientRect().left)
    const top = (e.clientY - item.getBoundingClientRect().top)
    console.log(left);
    gsap.to(div, {
        left: left,
        top: top,
        duration: 0.3,
    });
}