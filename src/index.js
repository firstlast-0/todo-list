import './style.css';
import { displayList } from './dom';

let projects = [];
let todoList = [];
projects.push(todoList);
function Todo(title, desc, due, prio) {    
    return { title, desc, due, prio };
}
let todo1 = Todo('AA', 'aa', '2024-01-10', 'Low');
todoList.push(todo1);
let todo2 = Todo('BB', 'bb', '2024-02-20', 'High');
todoList.push(todo2);
displayList(todoList);

let dialog = document.querySelector('#create');
let submit = document.querySelector('#sub');
submit.addEventListener('click', (event) => {
    event.preventDefault();    
    let title = document.querySelector('#title').value;
    let desc = document.querySelector('#desc').value;
    let due = document.querySelector('#due').value;
    let prio = document.querySelector('#prio').value;
    
    let todo = Todo(title, desc, due, prio);
    todoList.push(todo);
    displayList(todoList);    
    dialog.close();
});

let newProj = document.querySelector('#newProj');
newProj.addEventListener('click', () => {
    let name = prompt('What would you like to name your new Project');
    
});