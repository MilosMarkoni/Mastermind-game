import Module from "./modules/module.js";
import { mainPanel } from "./DOM.js";
const originalFetch = window.fetch;

window.fetch = async function(url) {
    const request = await originalFetch(url);
    const response = await request.json();

    return response;
};

class API extends Module {
    constructor(element, opts) {
        super(element, opts);
        this.options = { deckURL: "https://deckofcardsapi.com/api/deck/new/shuffle/" };
        this.options.promises = [];

        this.fetchAPI();

        this.events.on("newGame", () => {
            this.fetchAPI();
        });
    }

    fetchAPI = () => {
        mainPanel.classList.add("loader");

        fetch(this.options.deckURL).then(data => {
            fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=4`)
                .then(cardsResponse => {
                    this.options.promises = [];
                    cardsResponse.cards.forEach((element, index) => {
                        this.options.promises.push(
                            new Promise(resolve => {
                                var image = new Image();
                                image.classList.add("ui-image");
                                image.dataset.value = index;
                                image.onload = () => resolve(image);
                                image.src = cardsResponse.cards[index].image;
                            }),
                        );
                    });
                    return cardsResponse;
                })
                .then(cardsResponse => {
                    Promise.all(this.options.promises)
                        .then(cachedImages => this.events.trigger("fetchedData", { cardsResponse, cachedImages }))
                        .then(() => mainPanel.classList.remove("loader"));
                });
        });
    };
}
export default API;
