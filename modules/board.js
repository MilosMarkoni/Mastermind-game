import WrapperBoard from "./wrapperBoard.js";
import { addElemToRow } from "../helpers.js";

class Board extends WrapperBoard {
    constructor(element, opts) {
        super(element, opts);
        this.options = { elementCounter: 0, boardSnapshot: {}, currentRowArray: [] };

        this.bindEvents();

        this.events.on("elementChosen", data => this.addElement(data));

        this.events.on("newGame", () => {
            this.clearBoard();
            this.options.elementCounter = 0;
        });
    }

    addElement = data => {
        addElemToRow(data.picture, this.getCurrentRow());

        let inserted = false;

        // Used for deleted elements, to insert in their place
        for (let i = 0; i < this.options.currentRowArray.length; i++) {
            if (Object.entries(this.options.currentRowArray[i]).length == 0 && !inserted) {
                this.options.currentRowArray[i] = { position: this.options.elementCounter, value: data.value };
                inserted = true;
            }
        }

        if (!inserted) {
            this.options.currentRowArray.push({ position: this.options.elementCounter, value: data.value });
        }

        this.options.elementCounter++;
        // Move to next row if current is filled
        if (this.options.elementCounter == 4) {
            this.getNextRow();
        }
    };

    bindEvents = () => {
        this.removeElementBinded = this.removeElementBinded || this.removeElement.bind(this);
        this.getCurrentRow().addEventListener("click", this.removeElementBinded);
    };

    unbindEvent = () => this.getPreviousRow().removeEventListener("click", this.removeElementBinded);

    removeElement = e => {
        if (e.target.parentElement.classList.contains("ui-box")) {
            this.options.elementCounter--;
            const deletedElem = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
            this.options.currentRowArray[deletedElem] = {};
            event.target.remove();
        }
    };

    getNextRow = () => {
        this.options.boardSnapshot[this.currentRowCounter] = this.options.currentRowArray;
        this.options.currentRowArray = [];
        this.currentRowCounter++;
        this.options.elementCounter = 0;

        if (!this.noMoreRows()) {
            this.prepareNextRow();
        } else {
            this.unbindEvent();
        }

        this.events.trigger("updateResultModule", this.options.boardSnapshot[this.currentRowCounter - 1]);
    };

    prepareNextRow = () => {
        this.moveToNextRowCss();
        // unbind previous row listener
        this.unbindEvent();
        // bind current row with listener
        this.bindEvents();
    };
}

export default Board;
