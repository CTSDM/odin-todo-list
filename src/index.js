import './style.css';
import Item from './items.js'
import Project from './project.js'

console.log("doing something in the index.js file");
const item1 = new Item("ejercicio", "horas horas horas", "due date", false, true);
const item2 = new Item("practicas", "mucho que hacer", "due date", false, true);
const generalProject = new Project("General", true, "21-03-2025");

generalProject.addItem(item1);
generalProject.addItem(item2);

console.log(generalProject.items);
