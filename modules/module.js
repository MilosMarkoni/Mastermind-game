import * as events from "../events.js";

class Module {
    constructor(element, opts) {
        const defaults = {};

        this.events = events;

        this.element = element;
        this.options = {
            ...defaults,
            ...opts,
        };
    }
}

export default Module;
