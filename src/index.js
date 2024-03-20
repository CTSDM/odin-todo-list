import './style.css';
import Project from './project.js';
import Item from './items.js';
import changeDOM from './domManipulation.js';
import {compareAsc, format} from "date-fns";
import defaultItems from './defaultItems.js'
import {saveProjects, getArrayProjects, NAME_VARIABLE_PROJECTS_STORED} from './storage.js';


// IIFE 
(function (){
    // we create a default project
    // the default project cannot be deleted
    const projects = [];

    if(!localStorage.getItem(NAME_VARIABLE_PROJECTS_STORED)) {
        // we load the default items to the default project
        // for now we assume there is only one default project
        projects.push(getDefaultProject(defaultItems));
        saveProjects(projects);
    } else {
        // we load the stored items and show the items of the default project 
        const projectArray = getArrayProjects(); 
        projectArray.forEach((projectString) => {
            const project = new Project(projectString.title, projectString.description, projectString.importance);
            projectString.items.forEach((item) => project.addItem(new Item(item.title, item.description, item.dueDate, item.urgency, item.importance)));
            projects.push(project);
        })
    }
   
    // we need to pass this project array to the dommanipulation.js
    changeDOM(projects);

    function getDefaultProject(itemsData) {
        const title = "Default";
        const description = "Default project where todo items not belonging to any particular project can be added and stored.";
        const importance = false;
        const projectDefault = new Project(title, description, importance);
        for (const itemData of itemsData) {
            const newItem = new Item(itemData[0], itemData[1], itemData[2], itemData[3], itemData[4]);
            projectDefault.addItem(newItem);
        }
        return projectDefault;
    }
})()
