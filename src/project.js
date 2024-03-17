export default class Project {
    #items;
    #title;
    #importance;
    #dueDate;
    
    constructor(title, importance, dueDate)
    {
        this.#items = [];
        this.#title = title;
        this.#importance = importance;
        this.#dueDate = dueDate;
    }

    get title() {return this.#title;}
    set title(newTitle) {this.#title = newTitle;}

    get importance() {return this.#importance;}
    set importance(newImportance) {this.#importance = newImportance;}

    get dueDate() {return this.#dueDate;}
    set dueDate(newDueDate) {this.#dueDate = newDueDate;}

    get items() {return this.#items;}

    addItem(item) {this.#items.push(item);}
    removeItem(index) {this.#items.splice(index, 0, 1);
    }
}
