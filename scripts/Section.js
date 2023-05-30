export class Section {
    constructor({ items, renderer }, selector) {
        this._cardContent = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    addItem(data) {
        this._container.prepend(data);
    }

    renderItems() {
        this._cardContent.forEach((item) => {
            this._renderer(item);
        });
    }
}