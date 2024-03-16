let dialog = document.querySelector('#create');
let editDialog = document.querySelector('#edit');
let newB = document.querySelector('#new');
newB.addEventListener('click', () => {
    dialog.show();
});

let cancel = document.querySelector('#can');
cancel.addEventListener('click', () => {
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
          displayList(list);
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
            editDialog.show();

            let cancelE = document.querySelector('#canE');
            let fset = document.querySelector('#fset');
            let confirm = document.createElement('button');
            confirm.textContent = 'CONFIRM';                
            confirm.addEventListener('click', (event) => {
                event.preventDefault();
                list[i].title = title.value;
                list[i].desc = desc.value;
                list[i].due = due.value;
                list[i].prio = prio.value;
                displayList(list);
                editDialog.close();
                fset.removeChild(confirm);
                });
            
            fset.insertBefore(confirm, cancelE);
            
            cancelE.addEventListener('click', () => {
            editDialog.close();
            fset.removeChild(confirm);
            });
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

function displayProjectOptions(projects) {
    for (let project of projects) {
        let select = document.querySelector('#proj');
        let option = document.createElement('option');
        option.textContent = project;
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
            });
            div.appendChild(span);
            div.appendChild(view);
            projList.appendChild(div);
        }
    });
}

export { displayList, displayProjectOptions, displayProjects };