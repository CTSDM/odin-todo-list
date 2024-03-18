// In this module we program all the logic related to the dialog

const dialog = document.querySelector("dialog");
const TODO_TEXT = "TODO";
const PROJECT_TEXT= "Project";

dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
        document.querySelector('form').reset();
        dialog.close();
    }
})

dialog.appendChild(getDivTodoItem());

function getCloseButton() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Close";

    return btn;
}

function getSubmitButton() {
    const btn = document.createElement("button");
    btn.classList.add("submit");
    btn.type = "submit";
    btn.textContent = "Confirm";

    return btn;
}

function getCloseSubmitButtons() {
    const divButtons = document.createElement("div");
    divButtons.classList.add("buttons");
    divButtons.appendChild(getCloseButton());
    divButtons.appendChild(getSubmitButton());

    return divButtons;
}

function getDivTitle() {
    const divTitle = document.createElement("div");
    divTitle.classList.add("add-title");
    const labelTitle = document.createElement("label");
    labelTitle.htmlFor = "title";
    labelTitle.textContent = "Title";
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.id = "title";
    inputTitle.name = "title";
    inputTitle.autofocus = true;
    inputTitle.autocomplete = "off";
    inputTitle.required = true;

    divTitle.appendChild(labelTitle);
    divTitle.appendChild(inputTitle);

    return divTitle;
}

function getDivDescription() {
    const divDescription = document.createElement("div");
    divDescription.classList.add("add-description");
    const labelDescription = document.createElement("label");
    labelDescription.htmlFor = "description";
    labelDescription.textContent = "Description";
    const inputDescription= document.createElement("textarea");
    inputDescription.id = "description";
    inputDescription.name = "description";
    inputDescription.rows = "20";
    inputDescription.cols = "100";
    inputDescription.required = true;

    divDescription.appendChild(labelDescription);
    divDescription.appendChild(inputDescription);

    return divDescription;
}

function getDivDueDate() {
    const divDueDate = document.createElement("div");
    divDueDate.classList.add("due-date");
    const labelDueDate= document.createElement("label");
    labelDueDate.htmlFor = "due-date";
    labelDueDate.textContent = "Due date";
    const inputDueDate = document.createElement("input");
    inputDueDate.type = "date";
    inputDueDate.name = "due-date";
    inputDueDate.id = "due-date";
    inputDueDate.required = true;
    
    divDueDate.appendChild(labelDueDate);
    divDueDate.appendChild(inputDueDate);

    return divDueDate;
}

function getDivCheckbox(className, name, textLabel) {
    const divT = document.createElement("div");
    divT.classList.add(className);
    const labelT = document.createElement("label");
    labelT.textContent = textLabel;
    const inputT = document.createElement("input");
    inputT.type = "checkbox";
    inputT.name = name;
    inputT.id = name;

    divT.appendChild(labelT);
    divT.appendChild(inputT);

    return divT;
}

function getForm(text) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const form = document.createElement("form");
    form.method = "dialog";
    const spanText = document.createElement("span");
    spanText.textContent = `Add ${text}`;

    form.appendChild(spanText);
    modal.appendChild(form);
    return form;
}

function getDivTodoItem() {
    const form = getForm(TODO_TEXT);

    // Adding title and description
    form.appendChild(getDivTitle());
    form.appendChild(getDivDescription());

    // bottom container that includes due-date, urgency and importance
    const divBottomContainer = document.createElement("div");
    divBottomContainer.classList.add("bottom-container-todo");
    // Adding due-date, urgency and importance
    divBottomContainer.appendChild(getDivDueDate());
    divBottomContainer.appendChild(getDivCheckbox("urgency", "urgency", "Urgent?"));
    divBottomContainer.appendChild(getDivCheckbox("importance", "importance", "Important?"));
    
    // Adding bottom container to form
    form.appendChild(divBottomContainer);

    // Adding buttons
    form.appendChild(getCloseSubmitButtons());

    // We return the parent div of the form element
    return form.parentNode;
}

function getDivProject() {
    const form = getForm(PROJECT_TEXT);
    
    // Adding title and description and importance
    form.appendChild(getDivTitle());
    form.appendChild(getDivDescription());
    form.appendChild(getDivCheckbox("urgency", "urgency", "Urgent?"));

    // Adding buttons
    form.appendChild(getCloseSubmitButtons());
}


export {dialog, getDivTodoItem, getDivProject};

