export default class Project {
    #items;
    #title;
    #description;
    #importance;
    
    constructor(title, description, importance)
    {
        this.#items = [];
        this.#title = title;
        this.#description = description;
        this.#importance = importance;
    }

    get title() {return this.#title;}
    set title(newTitle) {this.#title = newTitle;}

    get description() {return this.#description;}
    set description(newDescription) {this.#description = newDescription;}

    get importance() {return this.#importance;}
    set importance(newImportance) {this.#importance = newImportance;}

    get items() {return this.#items;}

    addItem(item) {this.#items.push(item);}
    removeItem(index) {this.#items.splice(index, 1);
    }
}
