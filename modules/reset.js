import Module from "./module.js";

class Reset extends Module {
    constructor(element, opts) {
        super(element, opts);
        this.bindEvent();
    }

    bindEvent = () =>
        this.element.addEventListener("click", () => {
            this.events.trigger("newGame");
        });
}

export default Reset;
