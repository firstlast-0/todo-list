let currentProjDom = document.querySelector('#main > h1');
let dialog = document.querySelector('#create');
let editDialog = document.querySelector('#edit');
let fset = document.querySelector('#fset');
let backdrop = document.querySelector('#modalBackdrop');
backdrop.addEventListener('click', () => {
    backdrop.classList.add("hidden");
    dialog.close();
    editDialog.close();
    // console.log(fset.childElementCount);
    if (fset.childElementCount === 10) {
        fset.removeChild(fset.lastElementChild);
        fset.removeChild(fset.lastElementChild);
    }
    
});

let newB = document.querySelector('#new');
newB.addEventListener('click', () => {
    backdrop.classList.remove("hidden");
    dialog.show();
});

let cancel = document.querySelector('#can');
cancel.addEventListener('click', () => {
    backdrop.classList.add("hidden");
    dialog.close();
});

function displayList(list, currentProj) {
    let table = document.querySelector('tbody');
    table.replaceChildren();

    for (let i = 0; i < list.length; i++) {
        if (list[i]['proj'] !== currentProj) continue;

        let todo = document.createElement('tr');

        todo.setAttribute('data-index', i);
        let del = document.createElement('button');
        del.textContent = 'DELETE';
        del.addEventListener('click', () => {          
          list.splice(i, 1);
          displayList(list, currentProj);
          localStorage.todoList = JSON.stringify(list);
        });

        for (let key in list[i]) {
            if (key === 'desc' || key === 'prio' || key === 'proj') continue;
            let cell = document.createElement('td');
            cell.textContent = list[i][key];
            todo.appendChild(cell);                    
        }

        let actions = document.createElement('td');
        let edit = document.createElement('button');
        edit.textContent = 'EDIT';

        let title = document.querySelector('#titleE');
        let desc = document.querySelector('#descE');
        let due = document.querySelector('#dueE');
        let prio = document.querySelector('#prioE');
        edit.addEventListener('click', () => {                                              
            title.value = list[i].title;
            desc.value = list[i].desc;
            due.value = list[i].due;
            prio.value = list[i].prio;
            backdrop.classList.remove("hidden");
            editDialog.show();            

            let cancelE = document.createElement('button');
            cancelE.textContent = 'CANCEL';
            
            let confirm = document.createElement('button');
            confirm.textContent = 'CONFIRM';                
            confirm.addEventListener('click', (event) => {
                event.preventDefault();
                list[i].title = title.value;
                list[i].desc = desc.value;
                list[i].due = due.value;
                list[i].prio = prio.value;
                displayList(list, currentProj);
                backdrop.classList.add("hidden");
                editDialog.close();
                fset.removeChild(confirm);
                fset.removeChild(cancelE);
                localStorage.todoList = JSON.stringify(list);
            });            
            fset.appendChild(confirm);  

            cancelE.addEventListener('click', (event) => {
                event.preventDefault();
                backdrop.classList.add("hidden");
                editDialog.close();
                fset.removeChild(confirm);
                fset.removeChild(cancelE);
            });
            fset.appendChild(cancelE);
        });        

        actions.appendChild(edit);
        actions.appendChild(del);

        todo.appendChild(actions);
        setColor(todo, list[i].prio);
        table.appendChild(todo);
    }
}

function setColor(todo, prio) {
    let color;
    if (prio === 'Low') color = 'Cyan';
    else if (prio === 'Normal') color = 'Yellow';
    else  color = 'Red';
    todo.setAttribute('style', `background-color:${color}`);
}

function displayProjectOptions(projects, currentProject) {
    let select = document.querySelector('#proj');
    select.replaceChildren();

    for (let project of projects) {        
        let option = document.createElement('option');
        option.textContent = project;
        if (project === currentProject) option.selected = true;        
        select.appendChild(option);
    }
}

function displayProjects(projects, list) {
    let allProj = document.querySelector('#allProj');
    allProj.addEventListener('click', () => {
        let main = document.querySelector('#main');
        let projList = document.querySelector('#projList');
        projList.replaceChildren();
        main.style.display = 'none';
        projList.style.display = 'block';

        for (let project of projects) {
            let div = document.createElement('div');
            let span = document.createElement('span');
            span.textContent = project;
            let view = document.createElement('button');
            view.textContent = 'VIEW';
            view.addEventListener('click', () => {
                main.style.display = 'block';                
                displayList(list, project);
                projList.style.display = 'none';
                currentProjDom.textContent = project;
                displayProjectOptions(projects, project);
            });
            div.appendChild(span);
            div.appendChild(view);
            projList.appendChild(div);
        }
    });
}

export { displayList, displayProjectOptions, displayProjects };