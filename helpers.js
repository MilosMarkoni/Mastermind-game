import { isEmpty } from "./utils.js";

export const createElem = card => {
    const elem = document.createElement("DIV");
    if (card.includes("ui-circle")) {
        elem.setAttribute("class", card);
    } else {
        elem.style.backgroundImage = `url("${card}")`;
    }
    return elem;
};

export const addElemToRow = (card, rowTarget) => {
    for (let i = 0; i < 4; i++) {
        if (!rowTarget.children[i].hasChildNodes()) {
            rowTarget.children[i].appendChild(card);
            break;
        }
    }
};

export const invalidField = (element, message) => {
    element.classList.add("error");
    element.setCustomValidity(message);
};

export const removeInvalidField = element => {
    element.classList.remove("error");
    element.setCustomValidity("");
};

export const validateInput = element => {
    if (isEmpty(element.value)) {
        invalidField(element, `${element.placeholder} required.`);
    } else {
        removeInvalidField(element);
    }
};
