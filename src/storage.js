const NAME_VARIABLE_PROJECTS_STORED = "projects";

function saveProjects (projects) {
    // map the array of project instances into an array of project strings!
    const arrayProjectsAsStrings = projects.map((project) => project.toJSON());
    localStorage.setItem(NAME_VARIABLE_PROJECTS_STORED, JSON.stringify(arrayProjectsAsStrings));
}

function getArrayProjects() {
    return JSON.parse(localStorage.getItem(NAME_VARIABLE_PROJECTS_STORED));
}

export {saveProjects, getArrayProjects, NAME_VARIABLE_PROJECTS_STORED}
