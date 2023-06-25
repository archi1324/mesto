export class Section {
    constructor({renderer }, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    addItem(data) {
        this._container.prepend(data);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems(items) {
       this._clear();
       items.forEach(element => {
        this._renderer(element);
       });
    }
}