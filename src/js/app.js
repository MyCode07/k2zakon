import "./parts/popup.js";
import "./parts/menu.js";
import "./parts/filter.js"
import "./parts/cities.js"
import "./parts/map.js";
import "./parts/read-more.js";
import "./parts/services.js";
import "./parts/education.js";

import { toolTipAction } from "./parts/tooltip.js";
import { stickyHeader } from "./parts/header.js";
import { victoryCardsHover } from "./parts/victory-hover.js";
import { animateAction, animateStaggerAction } from "./parts/animations.js";
import { replaceDomElements } from "./static/replace.js";
import { runNumbers } from "./parts/run-numbers.js";
import { createSliders } from "./parts/sliders.js";
import { personCardsHover } from "./parts/person-card-hover.js";

personCardsHover();
createSliders();
toolTipAction();
stickyHeader();
victoryCardsHover();
animateAction();
animateStaggerAction();
replaceDomElements();
runNumbers();


// import "./static/side-fixed.js";
// import { accorden } from "./static/accordeon.js";
// import { maskInputs } from "./static/inputmask.js";
// import { runTicker } from "./static/ticker.js";
// import { toTop } from "./static/to-top.js";

// toTop();
// runTicker()
// accorden();
// maskInputs('+7 999 999 999 999', '.phone')