import { invalidField, validateInput, removeInvalidField } from "../helpers.js";
import * as storageService from "../localStorage.js";

export const validate = () => {
    const username = document.registerForm.username;
    const password = document.registerForm.password;
    const confirmPassword = document.registerForm.confirmPassword;

    validateInput(username);
    validateInput(password);
    validateInput(confirmPassword);

    if (storageService.hasItem(username.value) || username.value === "Guest" || username.value === "currentlyLoggedIn") {
        invalidField(username, "Username already exists.");
    } else {
        if (password.value === confirmPassword.value) {
            removeInvalidField(confirmPassword);

            storageService.setItem(username.value, JSON.stringify({ password: password.value, win: 0, loss: 0 }));
        } else {
            invalidField(confirmPassword, `${confirmPassword.placeholder} must match ${password.name}.`);
        }
    }
};
