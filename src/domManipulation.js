import Item from "./items";
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
}

function addDivTodo() {
    cleanChildDialog();
    dialog.appendChild(getDivTodoItem());
}

function cleanChildDialog() {
    const modal = dialog.querySelector(".modal");
    console.log(modal);
    console.log(dialog);
    dialog.removeChild(modal);
}

btnAdd.addEventListener("click", () =>  dialog.showModal());
