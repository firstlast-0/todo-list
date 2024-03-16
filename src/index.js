import './style.css';
import { displayList, displayProjectOptions, displayProjects } from './dom';

let currentProj = 'Default';
let p = 'p';
let projects = [currentProj, p];
let todoList = [];
function Todo(proj, title, desc, due, prio) {    
    return { proj, title, desc, due, prio };
}

let todo1 = Todo('Default', 'def', 'aa', '2024-01-10', 'Low');
todoList.push(todo1);
let todo2 = Todo('p', 'pro', 'bb', '2024-02-20', 'High');
todoList.push(todo2);
displayList(todoList, currentProj);

let currentProjDom = document.querySelector('h1 span');
let dialog = document.querySelector('#create');
let submit = document.querySelector('#sub');
submit.addEventListener('click', (event) => {
    event.preventDefault();    
    let title = document.querySelector('#title').value;
    let desc = document.querySelector('#desc').value;
    let due = document.querySelector('#due').value;
    let prio = document.querySelector('#prio').value;
    let proj = document.querySelector('#proj').value;
    
    let todo = Todo(proj, title, desc, due, prio);
    todoList.push(todo);
    displayList(todoList, proj);
    currentProj = proj;
    currentProjDom.textContent = currentProj;
    dialog.close();
});

let newProj = document.querySelector('#newProj');
newProj.addEventListener('click', () => {
    let project = prompt('What would you like to name your new Project');

    if (projects.includes(project)) alert('Project name already exists!');
    else {
        projects.push(project);
        let select = document.querySelector('#proj');
        let option = document.createElement('option');
        option.textContent = project;
        option.setAttribute('selected', '');
        select.appendChild(option);
    }
});

displayProjectOptions(projects);
displayProjects(projects, todoList);
currentProjDom.textContent = currentProj;