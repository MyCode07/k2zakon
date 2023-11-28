import { isMobile } from "../utils/isMobile.js";


export const victoryCardsHover = () => {
    var victoryCards = document.querySelectorAll('.victory__card');

    if (!victoryCards) return;

    victoryCards.forEach(card => {
        const cardText = card.querySelector('.victory__card-text');

        if (!isMobile.any()) {
            cardText.addEventListener("mouseenter", () => card.classList.add('_active'));
            cardText.addEventListener("mouseleave", () => card.classList.remove('_active'));
        }
        else {
            cardText.addEventListener("click", (e) => card.classList.toggle('_active'));
        }
    })
}