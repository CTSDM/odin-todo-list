import './style.css';
import Project from './project.js';
import changeDOM from './domManipulation.js';
import {compareAsc, format} from "date-fns";

// IIFE 
(function (){
    // we create a default project
    // the default project cannot be deleted
    const projects = [];
    projects.push(getDefaultProject());
   
    // we needt to pass this project array to the dommanipulation
    // and the dommanipulation somewhere else
    changeDOM(projects);




    function getDefaultProject() {
        const title = "Default";
        const description = "Default project where todo items not belonging to any particular project can be added and stored.";
        const importance = false;

        return new Project(title, description, importance);
    }
})()
