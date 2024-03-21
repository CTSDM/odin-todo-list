import {dialog, getDivProject, getDivTodoItem} from './dialog.js'
import { saveProjects } from './storage.js';

export default function changeDOM(projects) {
    firstLoadPage(projects);
};

const DEFAULT_PROJECT_INDEX = 0;
const INITIAL_ACTIVE_PROJECT = 1;
const TITLE_ALL_ITEMS_CONTAINER =  "All TODO items";
const INDEX_ALL_ITEMS_CONTAINER = 0;

function firstLoadPage(projects) {
    const funcSelectionItemList = [addDivTodo, addDivProject];
    const btnAdd = document.querySelector(".add button");
    const typeItemSelection = document.querySelectorAll(".selection-dialog div");

    // By default we load into the modal the todo item option to add
    dialog.appendChild(getDivTodoItem(projects));
    // By default we load the items in the default project

    typeItemSelection.forEach((e, index) => {
        e.addEventListener("click", funcSelectionItemList[index]);
    })

    btnAdd.addEventListener("click", () =>  {
        dialog.showModal();
        cleanChildDialog();
        dialog.appendChild(getDivTodoItem(projects));
    })

    function addDivProject() {
        cleanChildDialog();
        dialog.appendChild(getDivProject(projects));
    }

    function addDivTodo() {
        cleanChildDialog();
        dialog.appendChild(getDivTodoItem(projects));
    }

    function cleanChildDialog() {
        const modal = dialog.querySelector(".modal");
        dialog.removeChild(modal);
    }

    // The first time we enter the page we load the sidebar with the default project
    // We will also add another tab which is all 'todo items'
    // The first time we load the web, we will load the default project whose index is 
    // INITIAL_ACTIVE_PROJECT
    populateSideBar(projects, INITIAL_ACTIVE_PROJECT);
    populateProject(projects[DEFAULT_PROJECT_INDEX], DEFAULT_PROJECT_INDEX, projects);
}

function populateProject(project, index, projects) {
    const todoItemsContainer = document.querySelector(".todo-list");
    todoItemsContainer.dataset.index = index;

    project.items.forEach((item, index) => {
        createListItemsDiv(item, index, project, projects);
    })
}

function removeDivItem(divContainer) {
    divContainer.parentNode.removeChild(divContainer);
}

function createListItemsDiv(item, index, project, projects) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("todo-items");
    divContainer.dataset.index = index;
    const divTitle = document.createElement("div");
    divTitle.textContent = item.title;
    const divDate = document.createElement("div");
    divDate.textContent = item.dueDate;
    const divMoreInfo = document.createElement("div");
    divMoreInfo.textContent = "click me for more details";
    divMoreInfo.addEventListener("click",() => {showFullInfoItem(item, projects)});
    const divRemoveItem = document.createElement("div");
    divRemoveItem.classList.add("remove");
    divRemoveItem.textContent = "Remove item";
    divRemoveItem.addEventListener("click", (e) => {
        removeDivItem(e.target.parentNode);
        project.removeItem(index);
        saveProjects(projects);
    });

    divContainer.appendChild(divTitle);
    divContainer.appendChild(divDate);
    divContainer.appendChild(divMoreInfo);
    divContainer.appendChild(divRemoveItem);

    const todoItemsContainer = document.querySelector(".todo-list");
    todoItemsContainer.appendChild(divContainer);
}

export function populateDivItem(projects, index, item) {
    const todoItemsContainer = document.querySelector(".todo-list");
    if (index === todoItemsContainer.dataset.index) {
        createListItemsDiv(item, projects[index].length - 1, projects[index], projects);
    }
}

function populateSideBar(projects, indexActive) {
    // the div below will show all the available items within all the projects
    setUpAllTODOs(projects, TITLE_ALL_ITEMS_CONTAINER, INDEX_ALL_ITEMS_CONTAINER);

    projects.forEach((project, index) => {
        addProject(project, index + 1);
    });

    setActiveContainer(indexActive);
}

function setUpAllTODOs(projects, title, index) {
    setUpDiv(title, index);
    // The container of all items will always be the first div
    const divAllTODO = document.querySelector(".project-item div");
    divAllTODO.addEventListener("click", () => {
        clearListItems();
        projects.forEach((project) => {
            populateProject(project, "none");
        })
    })
}

function setUpDiv(title, index) {
    const divContainer = document.querySelector(".project-item");
    const divProj = document.createElement("div");
    divProj.textContent = title;
    divProj.dataset.index = index;
    // We add +1 because the first item of the divContainer is the container
    // of all the items
    divProj.dataset.index = index;
    divContainer.appendChild(divProj);
}

export function addProject(project, index) {
    setUpDiv(project.title, index);
    const divProjContainer = document.querySelectorAll(".project-item div");
    divProjContainer[index].addEventListener("click", () => {
        clearListItems();
        populateProject(project, index - 1);
        const updatedProjContainer = document.querySelectorAll(".project-item div");
        updatedProjContainer.forEach((element) => {
            element.classList.remove("active");
        });
        updatedProjContainer[index].classList.add("active");
    })
}

function setActiveContainer(index) {
    const allElementsSidebar = document.querySelectorAll(".project-item div");
    allElementsSidebar[index].classList.add("active");
}

function clearListItems() {
    const todoItemsContainer= document.querySelector(".todo-list");
    while(todoItemsContainer.firstChild) {
        todoItemsContainer.removeChild(todoItemsContainer.firstChild);
    }
}

function showFullInfoItem(item) {
    setUpDialog(dialogInfo);
    clearDialogInfo(dialogInfo);
    const divContainer = document.createElement("div");
    divContainer.classList.add("show-info");
    addModalValues(divContainer, item);
    dialogInfo.appendChild(divContainer);
    dialogInfo.showModal();
}

function setUpDialog(dialog) {
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    })
}

function clearDialogInfo(dialogContainer) {
    while (dialogContainer.firstChild) {
        dialogContainer.removeChild(dialogContainer.firstChild);
    }
}

function addModalValues(divContainer, item) {
    setTitleOnModal(divContainer, item);
    setDescriptionOnModal(divContainer, item);
    setDueDateOnModal(divContainer, item);
    if (item.urgency) setUrgencyOnModal(divContainer, item);
    if (item.importance) setImportanceOnModal(divContainer, item); 
}

function setUrgencyOnModal(divContainer) {
    const divUrgency = document.createElement("div");
    divUrgency.textContent = "This project is urgent!"
    divContainer.appendChild(divUrgency);
}

function setImportanceOnModal(divContainer) {
    const divImportance = document.createElement("div");
    divImportance.textContent= "This project is important!"
    divContainer.appendChild(divImportance);
}
function setTitleOnModal (divContainer, item) {
    const divTitle = document.createElement("div");
    divTitle.textContent = `Title: ${item.title}`;
    divContainer.appendChild(divTitle);
}

function setDescriptionOnModal(divContainer, item) {
    const divDescription = document.createElement("div");
    divDescription.textContent = `Description: ${item.description}`;
    divContainer.appendChild(divDescription);
}

function setDueDateOnModal(divContainer, item) {
    const divDueDate = document.createElement("div");
    divDueDate.textContent = `Due Date: ${item.dueDate}`;
    divContainer.appendChild(divDueDate);
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

function populateModalItem (form, projects) {
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
}

function populateModalProject(form) {
    form.appendChild(getDivTitle());
    form.appendChild(getDivDescription());
    form.appendChild(getDivCheckbox("importance", "importance", "Important?"));
}

export { populateModalItem, populateModalProject }
