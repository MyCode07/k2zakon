import { isMobile } from "../utils/isMobile.js";

const personCards = document.querySelectorAll('.person__card');

function personCardsHover() {
    if (!personCards) return;

    personCards.forEach(card => {

        if (!isMobile.any()) {
            card.addEventListener("mouseenter", () => {
                card.classList.add('_active')
            });
            card.addEventListener("mouseleave", () => card.classList.remove('_active'));
        }
        else {
            card.addEventListener("click", (e) => card.classList.toggle('_active'));
        }
    })
}
personCardsHover();