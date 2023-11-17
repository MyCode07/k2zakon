
import "./parts/sliders.js";
import "./parts/popup.js";
import "./parts/menu.js";

import "./parts/victory-hover.js"
import "./parts/filter.js"
import "./parts/cities.js"
import "./parts/map.js";

import { toolTipAction } from "./parts/tooltip.js";
import { stickyHeader } from "./parts/header.js";
import { victoryCardsHover } from "./parts/victory-hover.js";
import { animateAction, animateStaggerAction } from "./parts/animations.js";
import { replaceDomElements } from "./static/replace.js";

toolTipAction();
stickyHeader();
victoryCardsHover();
animateAction();
animateStaggerAction();
replaceDomElements();

// toTop();
// runTicker()
// accorden();
// maskInputs('+7 999 999 999 999', '.phone')

// import "./static/side-fixed.js";
// import { accorden } from "./static/accordeon.js";
// import { maskInputs } from "./static/inputmask.js";
// import { runTicker } from "./static/ticker.js";
// import { toTop } from "./static/to-top.js";

// import "./parts/menu.js";
// import "./parts/animations.js";
// import "./parts/mobile-controll.js";
// import "./parts/login.js";
// import "./parts/category-scroll.js";