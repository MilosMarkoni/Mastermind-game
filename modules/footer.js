import Module from "./module.js";
import { addElemToRow } from "../helpers.js";

class Footer extends Module {
    constructor(element, opts) {
        super(element, opts);

        this.options = { footer: this.element.querySelector(".ui-row") };

        this.bindEvents();

        this.events.on("gameFinished", () => this.unbindEvents());

        this.events.on("newGame", () => {
            this.unbindEvents();
            this.bindEvents();
        });

        this.events.on("fetchedData", data => {
            this.receiveItems(data);
            this.renderItems();
        });
    }

    unbindEvents = () => this.element.removeEventListener("click", this.addItem);

    bindEvents = () => this.element.addEventListener("click", this.addItem);

    receiveItems = data => (this.footerItems = data);

    addItem = e => {
        if (e.target.classList.contains("ui-image")) {
            this.events.trigger("elementChosen", {
                value: this.footerItems.cardsResponse.cards[e.target.dataset.value].code,
                picture: this.footerItems.cachedImages[e.target.dataset.value].cloneNode(),
            });
        }
    };

    clearFooter = () => {
        for (let i = 0; i < 4; i++) {
            if (this.element.firstElementChild.children[i].hasChildNodes()) {
                this.element.firstElementChild.children[i].firstElementChild.remove();
            }
        }
    };

    renderItems = () => {
        this.clearFooter();
        for (let i = 0; i < 4; i++) {
            addElemToRow(this.footerItems.cachedImages[i], this.options.footer);
        }
    };
}

export default Footer;
