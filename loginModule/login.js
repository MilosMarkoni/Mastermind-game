import * as utils from "../utils.js";
import * as storageService from "../localStorage.js";
import { invalidField, removeInvalidField, validateInput } from "../helpers.js";
import * as events from "../events.js";

export const validate = () => {
    const username = document.loginForm.username;
    const password = document.loginForm.password;

    validateInput(username);
    validateInput(password);

    if (storageService.hasItem(username.value)) {
        removeInvalidField(username);

        const fetchedUser = JSON.parse(storageService.hasItem(username.value));
        if (password.value === fetchedUser.password) {
            removeInvalidField(password);
            events.trigger("userLoggedIn", username.value);
            storageService.updateItem("currentlyLoggedIn", username.value);

            // Clear inputs after logged in
            document.loginForm.username.value = "";
            document.loginForm.password.value = "";

            return true;
        } else {
            if (utils.isEmpty(password.value)) {
                invalidField(password, "Required password");
            } else {
                invalidField(password, "Incorect password");
            }
            return false;
        }
    } else {
        if (utils.isEmpty(username.value)) {
            invalidField(username, "Required username");
        } else {
            invalidField(username, "User doesn't exist!");
        }
        return false;
    }
};
