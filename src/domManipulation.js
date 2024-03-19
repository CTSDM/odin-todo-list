import {items} from "./items.js";
import {projects} from "./project.js"; 
import {dialog, getDivProject, getDivTodoItem} from './dialog.js'

const funcSelectionItemList = [addDivTodo, addDivProject];
const btnAdd = document.querySelector(".add button");
const typeItemSelection = document.querySelectorAll(".selection-dialog div");

typeItemSelection.forEach((e, index) => {
    e.addEventListener("click", funcSelectionItemList[index]);
})

function addDivProject() {
    cleanChildDialog();
    dialog.appendChild(getDivProject());
    console.log(projects);
}

function addDivTodo() {
    cleanChildDialog();
    dialog.appendChild(getDivTodoItem());
    console.log(items);
}

function cleanChildDialog() {
    const modal = dialog.querySelector(".modal");
    dialog.removeChild(modal);
}

btnAdd.addEventListener("click", () =>  {
    dialog.showModal();
    cleanChildDialog();
    dialog.appendChild(getDivTodoItem());
});
