import Item from "./items";
import {dialog} from './dialog.js'
const btnAdd = document.querySelector(".add button");

btnAdd.addEventListener("click", () =>  dialog.showModal());
