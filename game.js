import Header from "./modules/header.js";
import Reset from "./modules/reset.js";
import Result from "./modules/result.js";
import Board from "./modules/board.js";
import Solution from "./modules/solution.js";
import Footer from "./modules/footer.js";
import * as events from "./events.js";
import API from "./API.js";

import * as DOM from "./DOM.js";

class Game {
    constructor() {
        // Init API
        new API();

        /**
         * Initialize modules
         */
        new Header(DOM.statusPanelWrapper);
        new Reset(DOM.resetButton);
        new Result(DOM.resultWrapper);
        new Solution(DOM.solutionWrapper);
        new Board(DOM.boardWrapper);
        new Footer(DOM.footerWrapper);

        events.on("userLoggedIn", data => {
            events.trigger("selectedUser", data);
        });
    }
}

export default Game;
