import * as DOM from "../DOM.js";
import Game from "../game.js";
import * as events from "../events.js";
import * as registerService from "./register.js";
import * as loginService from "./login.js";
import * as storageService from "../localStorage.js";
import { removeInvalidField } from "../helpers.js";

class userHandle {
    constructor() {
        new Game();
        this.initLogin();
    }

    initLogin() {
        if (storageService.hasItem("currentlyLoggedIn") && storageService.hasItem("currentlyLoggedIn") !== "false") {
            events.trigger("userLoggedIn", storageService.hasItem("currentlyLoggedIn"));
            DOM.welcome.classList.add("hidden");
        } else {
            storageService.setItem("currentlyLoggedIn", false);
        }

        DOM.guestButton.addEventListener("click", () => {
            events.trigger("userLoggedIn", "Guest");
            DOM.welcome.classList.add("hidden");
        });

        DOM.loginButton.addEventListener("click", () => {
            DOM.welcome.classList.add("hidden");
            DOM.login.classList.remove("hidden");

            DOM.confirmLogin.addEventListener("click", event => {
                document.loginForm.addEventListener("keydown", event => {
                    removeInvalidField(event.target);
                });
                if (loginService.validate()) {
                    event.preventDefault();
                    DOM.login.classList.add("hidden");
                }
            });
        });

        DOM.registerButton.addEventListener("click", event => {
            event.preventDefault();
            DOM.welcome.classList.add("hidden");
            DOM.register.classList.remove("hidden");

            DOM.confirmRegister.addEventListener("click", event => {
                document.registerForm.addEventListener("keydown", event => {
                    removeInvalidField(event.target);
                });

                if (registerService.validate()) {
                    event.preventDefault();
                    DOM.register.classList.add("hidden");
                    DOM.welcome.classList.remove("hidden");
                }
            });
        });

        DOM.backToWelcomeFromRegisterButton.addEventListener("click", event => {
            event.preventDefault();
            DOM.register.classList.add("hidden");
            DOM.welcome.classList.remove("hidden");
        });

        DOM.backToWelcomeFromLoginButton.addEventListener("click", event => {
            event.preventDefault();
            DOM.login.classList.add("hidden");
            DOM.welcome.classList.remove("hidden");
        });
    }
}
new userHandle();

export default userHandle;
