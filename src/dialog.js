// In this module we program all the logic related to the dialog

import Item from './items.js';
import Project from './project.js';
import {populateDivItem, addProject} from './domManipulation.js';
import {saveProjects} from './storage.js';

export {dialog, getDivTodoItem, getDivProject};

const dialog = document.querySelector("dialog");

const TODO_TEXT = "TODO";
const PROJECT_TEXT= "Project";

dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
        document.querySelector('form').reset();
        dialog.close();
    }
})

function getDataItemsForm(form) {
    const dataItem = [];
    dataItem.push(form.querySelector("#title").value);
    dataItem.push(form.querySelector("#description").value);
    dataItem.push(form.querySelector("#due-date").value);
    dataItem.push(form.querySelector("#urgency").checked);
    dataItem.push(form.querySelector("#importance").checked);

    return dataItem;
}

function getDataProjectForm(form) {
    const dataProject = [];
    dataProject.push(form.querySelector("#title").value);
    dataProject.push(form.querySelector("#description").value);
    dataProject.push(form.querySelector("#importance").checked);

    return dataProject;
}

function closeModal() {
    dialog.querySelector("form").reset();
    dialog.close();
}

function addItemToProject(form, itemToAdd, projects) {
    const index = form.querySelector("select").value;
    projects[index].items.push(itemToAdd);
    populateDivItem(projects, index, itemToAdd);
    saveProjects(projects);
}

function submitItem(form, projects) {
    const dataItem = getDataItemsForm(form)
    const newItem = new Item(dataItem[0], dataItem[1], dataItem[2], dataItem[3], dataItem[4]);
    // add item to its corresponding project;
    addItemToProject(form, newItem, projects);
    form.reset();
}

function submitProject(form, projects) {
    const dataProject = getDataProjectForm(form);
    const newProject = new Project(dataProject[0], dataProject[1], dataProject[2]);
    projects.push(newProject);
    addProject(newProject, projects.length);
    saveProjects(projects);
    form.reset();
}

function getCloseButton() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Close";
    btn.addEventListener("click", closeModal);

    return btn;
}

function getSubmitButton(form, selector, projects) {
    const btn = document.createElement("button");
    btn.classList.add("submit");
    btn.type = "submit";
    btn.textContent = "Confirm";

    form.addEventListener("submit", () => {
        selector ? submitItem(form, projects) : submitProject(form, projects);
    })
    return btn;
}

function getCloseSubmitButtons(form, selector, projects) {
    const divButtons = document.createElement("div");
    divButtons.classList.add("buttons");
    divButtons.appendChild(getCloseButton());
    divButtons.appendChild(getSubmitButton(form, selector, projects));

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

function getDivDropdownProjects(projects) {
    const divDropdown = document.createElement("div");
    const labelDropdown = document.createElement("label");
    labelDropdown.htmlFor = "project-list";
    labelDropdown.textContent = "Choose a project:"
    divDropdown.classList.add("project-list");
    const selectDropdown = document.createElement("select");
    selectDropdown.name = "project-list";
    selectDropdown.id = "project-list";
    
    projects.forEach((project, index) => {
        const optionElement = document.createElement("option");
        optionElement.value = index;
        optionElement.textContent = project.title;
        selectDropdown.appendChild(optionElement);
    })

    divDropdown.appendChild(selectDropdown);

    return divDropdown;
}

function getDivTodoItem(projects) {
    const selector = true;
    const form = getForm(TODO_TEXT);

    // Adding a dropdown selector to select a project
    // by default it will use the default project, position 0 of the array project
    form.append(getDivDropdownProjects(projects));

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
    form.appendChild(getCloseSubmitButtons(form, selector, projects));

    // We return the parent div of the form element
    return form.parentNode;
}

function getDivProject(projects) {
    const selector = false;
    const form = getForm(PROJECT_TEXT);
    
    // Adding title and description and importance
    form.appendChild(getDivTitle());
    form.appendChild(getDivDescription());
    form.appendChild(getDivCheckbox("importance", "importance", "Important?"));

    // Adding buttons
    form.appendChild(getCloseSubmitButtons(form, selector, projects));

    return form.parentNode;
}



