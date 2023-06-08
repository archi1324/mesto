export class Section {
    constructor({ items, renderer }, selector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    addItem(data) {
        this._container.prepend(data);
    }

    renderItems() {
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }
}