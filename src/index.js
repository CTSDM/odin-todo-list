import './style.css';
import Project from './project.js';
import Item from './items.js';
import changeDOM from './domManipulation.js';
import {compareAsc, format} from "date-fns";
import defaultItems from './defaultItems.js'

// IIFE 
(function (){
    // we create a default project
    // the default project cannot be deleted
    const projects = [];
    projects.push(getDefaultProject(defaultItems));
   
    // we needt to pass this project array to the dommanipulation
    // and the dommanipulation somewhere else
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
