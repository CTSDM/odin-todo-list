class Item {
    #title;
    constructor(title, description, dueDate, priority) {
        this.#title = title;
    }

    get title() {
        console.log(this.#title);
    }
}

const item1 = new Item("titulo");
item1["title"];
