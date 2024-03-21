// In this module we program all the logic related to the dialog

import Item from './items.js';
import Project from './project.js';
import { populateDivItem, addProject } from './domManipulation.js';
import { populateModalItem, populateModalProject} from './domManipulation.js';
import { saveProjects } from './storage.js';

export {dialog, getDivTodoItem, getDivProject};

const dialog = document.querySelector("#dialogNewElement");

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

function getDivTodoItem(projects) {
    const selector = true;
    const form = getForm(TODO_TEXT);

    // Adding a dropdown selector to select a project
    // by default it will use the default project, position 0 of the array project
    populateModalItem(form, projects);
    // Adding buttons
    form.appendChild(getCloseSubmitButtons(form, selector, projects));

    // We return the parent div of the form element
    return form.parentNode;
}


function getDivProject(projects) {
    const selector = false;
    const form = getForm(PROJECT_TEXT);
    
    // Adding title and description and importance
    populateModalProject(form);
    // Adding buttons
    form.appendChild(getCloseSubmitButtons(form, selector, projects));

    return form.parentNode;
}
