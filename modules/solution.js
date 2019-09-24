import { addElemToRow } from "../helpers.js";
import { randomZeroToX } from "../utils.js";
import Module from "./module.js";

class Solution extends Module {
    constructor(element, opts) {
        super(element, opts);

        this.options = { solutionSnapshot: [] };

        this.events.on("gameFinished", () => this.showSolution());

        this.events.on("fetchedData", data => {
            this.clearSolution();
            this.randomizeSolution(data);
        });
    }

    randomizeSolution = data => {
        // Generate four random pictures and notify listeners for new solution
        for (let i = 0; i < 4; i++) {
            const combination = randomZeroToX(4);
            this.options.solutionSnapshot[i] = {
                value: data.cardsResponse.cards[combination].code,
                picture: data.cachedImages[combination].cloneNode(),
            };
        }

        this.events.trigger("notifySolution", this.options.solutionSnapshot);
    };

    clearSolution = () => {
        this.options.solutionSnapshot = [];

        for (let i = 0; i < 4; i++) {
            if (this.element.children[i].hasChildNodes()) {
                this.element.children[i].firstElementChild.remove();
            }
        }
    };

    showSolution = () => {
        for (let i = 0; i < 4; i++) {
            addElemToRow(this.options.solutionSnapshot[i].picture, this.element);
        }
    };
}

export default Solution;
