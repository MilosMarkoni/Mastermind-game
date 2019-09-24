import WrapperBoard from "./wrapperBoard.js";
import { addElemToRow, createElem } from "../helpers.js";

class Result extends WrapperBoard {
    constructor(element, opts) {
        super(element, opts);

        this.options = {
            solution: [],
            greenElements: 0,
            redElements: 0,
        };

        this.events.on("updateResultModule", data => this.updateResults(data));

        this.events.on("notifySolution", data => this.receiveSolution(data));

        this.events.on("newGame", () => this.clearBoard());
    }

    updateResults = data => {
        this.currentRowCounter++;

        this.calcTheResult(data);
        this.displayResults();

        if (this.gameFinishedSuccessfully() && !this.noMoreRows()) {
            this.moveToNextRowCss();
        }
    };

    calcTheResult = data => {
        // Reset from previous attempt
        this.options.greenElements = 0;
        this.options.redElements = 0;

        // Clone the objects
        let solution = JSON.parse(JSON.stringify(this.options.solution));
        let board = JSON.parse(JSON.stringify(data));

        // Count the green elements
        for (let i = 0; i < 4; i++) {
            if (board[i].value == solution[i].value) {
                this.options.greenElements++;
                board[i].value = -1;
                solution[i].value = -2;
            }
        }

        // Count the red elements
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i].value == solution[j].value) {
                    this.options.redElements++;
                    solution[j] = -2;
                    board[i].value = -1;
                }
            }
        }
    };

    displayResults = () => {
        // print result
        this.printResult(this.options.greenElements, true);
        this.printResult(this.options.redElements, false);

        // Show the results if the combination is true
        if (this.gameFinishedSuccessfully()) {
            this.events.trigger("gameFinished", true);
        }

        // Show the results if the combination is false and it's game over
        if (this.noMoreRows() && !this.gameFinishedSuccessfully()) {
            this.events.trigger("gameFinished", false);
        }
    };

    printResult = (resultElements, status) => {
        for (let i = 0; i < resultElements; i++) {
            addElemToRow(createElem(`ui-circle ${status ? "green" : "red"}`), this.getPreviousRow());
        }
    };

    receiveSolution = data => (this.options.solution = data);

    gameFinishedSuccessfully = () => this.options.greenElements === 4;
}

export default Result;
