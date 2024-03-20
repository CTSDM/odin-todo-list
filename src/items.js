export default class Item {
    #title;
    #description;
    #dueDate;
    #urgency;
    #importance;

    constructor(title, description, dueDate, urgency, importance) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#urgency = urgency;
        this.#importance = importance;
    }

    get title() {return this.#title;}
    set title(newTitle) {this.#title = newTitle;}

    get description() {return this.#description;}
    set description(newDescription) {this.#description = newDescription;}

    get dueDate() {return this.#dueDate;}
    set dueDate(newDueDate) {this.#dueDate= newDueDate;}

    get urgency() {return this.#urgency;}
    set urgency(newUrgency) {this.#urgency= newUrgency;}

    get importance() {return this.#importance;}
    set importance(newImportance) {this.#importance= newImportance;}

    toJSON() {
        return {
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate,
            urgency: this.#urgency,
            importance: this.#importance
        }
    }
}
