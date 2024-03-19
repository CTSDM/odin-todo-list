import {dialog, getDivProject, getDivTodoItem} from './dialog.js'

export default function changeDOM(projects) {
    firstLoadPage(projects);
};

const DEFAULT_PROJECT_INDEX = 0;

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

    // The first time we enter the page we load the contents of the default project
    populateProject(projects[DEFAULT_PROJECT_INDEX], DEFAULT_PROJECT_INDEX);
}

function populateProject(project, index) {
    const todoItemsContainer = document.querySelector(".todo-list");
    todoItemsContainer.dataset.index = index;

    project.items.forEach((item, index) => {
        todoItemsContainer.appendChild(createListItemsDiv(item, index, project));
    })
}

function removeDivItem(divContainer) {
    divContainer.parentNode.removeChild(divContainer);
}

function createListItemsDiv(item, index, project) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("todo-items");
    divContainer.dataset.index = index;
    const divTitle = document.createElement("div");
    divTitle.textContent = item.title;
    const divDate = document.createElement("div");
    divDate.textContent = item.dueDate;
    const divMoreInfo = document.createElement("div");
    divMoreInfo.textContent = "click me for more details";
    const divRemoveItem = document.createElement("div");
    divRemoveItem.classList.add("remove");
    divRemoveItem.textContent = "Remove item";
    divRemoveItem.addEventListener("click", (e) => {
        removeDivItem(e.target.parentNode);
        project.removeItem(index);
    });

    divContainer.appendChild(divTitle);
    divContainer.appendChild(divDate);
    divContainer.appendChild(divMoreInfo);
    divContainer.appendChild(divRemoveItem);

    return divContainer;
}

export function populateDivItem(projects, index, item) {
    const todoItemsContainer = document.querySelector(".todo-list");
    if (index === todoItemsContainer.dataset.index)
        todoItemsContainer.appendChild(createListItemsDiv(item, index, projects[index]));
}


















