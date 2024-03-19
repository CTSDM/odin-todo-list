import {dialog, getDivProject, getDivTodoItem} from './dialog.js'

export default function changeDOM(projects) {

    const funcSelectionItemList = [addDivTodo, addDivProject];
    const btnAdd = document.querySelector(".add button");
    const typeItemSelection = document.querySelectorAll(".selection-dialog div");

    // By default we load into the modal the todo item option to add
    dialog.appendChild(getDivTodoItem(projects));
    // By default we load the items in the default project

    typeItemSelection.forEach((e, index) => {
        e.addEventListener("click", funcSelectionItemList[index]);
    })

    function addDivProject() {
        cleanChildDialog();
        dialog.appendChild(getDivProject(projects));
        console.log(projects);
    }

    function addDivTodo() {
        cleanChildDialog();
        dialog.appendChild(getDivTodoItem(projects));
    }

    function cleanChildDialog() {
        const modal = dialog.querySelector(".modal");
        dialog.removeChild(modal);
    }

    btnAdd.addEventListener("click", () =>  {
        dialog.showModal();
        cleanChildDialog();
        dialog.appendChild(getDivTodoItem(projects));
    })
};
