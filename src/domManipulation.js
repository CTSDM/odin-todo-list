import {dialog, getDivProject, getDivTodoItem} from './dialog.js'

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
    populateProject(projects[DEFAULT_PROJECT_INDEX], DEFAULT_PROJECT_INDEX);
}

function populateProject(project, index) {
    const todoItemsContainer = document.querySelector(".todo-list");
    todoItemsContainer.dataset.index = index;

    project.items.forEach((item, index) => {
        createListItemsDiv(item, index, project);
    })
}

function removeDivItem(divContainer) {
    divContainer.parentNode.removeChild(divContainer);
}

export function createListItemsDiv(item, index, project) {
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

    const todoItemsContainer = document.querySelector(".todo-list");
    todoItemsContainer.appendChild(divContainer);
}

export function populateDivItem(projects, index, item) {
    const todoItemsContainer = document.querySelector(".todo-list");
    if (index === todoItemsContainer.dataset.index) {
        createListItemsDiv(item, projects[index].length - 1, projects[index]);
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
        populateProject(project, index);
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















