import Module from "./module.js";

class WrapperBoard extends Module {
    constructor(element, opts) {
        super(element, opts);
        this.currentRowCounter = 0;
    }

    clearBoard() {
        for (let i = 0; i <= this.currentRowCounter; i++) {
            // Remove items from row
            for (let j = 0; j < 4; j++) {
                if (i != 6) {
                    const currentItem = this.element[i].children[j];
                    if (currentItem.hasChildNodes()) currentItem.firstElementChild.remove();
                }
            }

            // remove class from row with active css-active class
            if (i != 6 && this.element[i].classList.contains("css-active")) {
                this.element[i].classList.remove("css-active");
            }
        }

        this.currentRowCounter = 0;
        this.element[this.currentRowCounter].classList.add("css-active");
    }
    moveToNextRowCss() {
        this.getPreviousRow().classList.remove("css-active");
        this.getCurrentRow().classList.add("css-active");
    }

    getPreviousRow = () => this.element[this.currentRowCounter - 1];

    getCurrentRow = () => this.element[this.currentRowCounter];

    noMoreRows = () => this.currentRowCounter == 6;
}

export default WrapperBoard;
