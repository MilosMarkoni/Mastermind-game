import Module from "./module.js";
import * as storageService from "../localStorage.js";
import { logoutButton, welcome, username, recordWrapper, record } from "../DOM.js";

class Header extends Module {
    constructor(element, opts) {
        super(element, opts);
        this.userName = "";
        this.userData = {};

        this.options.header = this.element.querySelector("h1");

        logoutButton.addEventListener("click", () => {
            storageService.updateItem("currentlyLoggedIn", false);
            welcome.classList.remove("hidden");
            this.events.trigger("newGame");
        });

        this.events.on("gameFinished", data => {
            if (this.userName !== "Guest") {
                this.updateScore(data);
            }

            this.changeStatusPanelWrapper(data);
        });

        this.events.on("newGame", () => this.resetStatusPanelWrapper());

        this.events.on("userLoggedIn", data => {
            this.userName = data;
            this.renderUserData();
        });
    }

    changeStatusPanelWrapper = status => {
        this.element.classList.add("ui-bold-text", `${status ? "green" : "red"}`);
        this.options.header.innerText = `${status ? "Success!" : "Failed!"} Press Reset button to play again!`;
    };

    resetStatusPanelWrapper = () => {
        this.element.className = "ui-panel ui-panel-medium-padding ui-header";
        this.options.header.innerText = `Welcome to Mastermind, ${this.userName}!`;
    };

    renderUserData = () => {
        this.userData = JSON.parse(storageService.hasItem(this.userName));
        this.options.header.innerText = `Welcome to Mastermind, ${this.userName}!`;

        if (this.userName === "Guest") {
            username.innerText = "Guest";
            recordWrapper.classList.add("ui-display__none");
        } else {
            username.innerText = this.userName;
            recordWrapper.classList.remove("ui-display__none");
            record.innerText = `${this.userData.win} - ${this.userData.loss}`;
        }
    };

    updateScore = score => {
        if (score) {
            this.userData.win++;
        } else {
            this.userData.loss++;
        }
        storageService.updateItem(this.userName, JSON.stringify(this.userData));
        this.renderUserData();
    };
}

export default Header;
