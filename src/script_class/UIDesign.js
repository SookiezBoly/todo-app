import { createElement } from '../script_class/elementCreation.js';

class UIDesign {
    constructor(){
        this.view = [];
        this.projectNames = [];      

        this.h1 = createElement('h1', {}, 'todo app');
        this.header = createElement('div', {class:'header'}, this.h1);

        this.all = createElement('div',{class:'all'}, 'all');
        this.today = createElement('div',{class:'today'}, 'today');
        this.week = createElement('div',{class:'week'}, 'week');
        this.month = createElement('div',{class:'month'}, 'month');
        this.temporalityProject = createElement('div', {class:'temporalityProject'}, this.all, this.today, this.week, this.month);

        this.buttonNewProject = createElement('button', {class:'newProjectButton'}, 'create project');
        this.projectList = createElement('ul', {class:'projectList'}, '');

        this.content = createElement('div', {class:'content'}, this.temporalityProject, this.buttonNewProject, this.projectList);
        this.projects = createElement('div', {class:'projects'}, this.header, this.content);
        this.sidebar = createElement('div', {class:'sidebar'}, this.projects);

        this.container = createElement('div', {class:'container'}, '');

        this.app = createElement('div', {class:'app'}, this.sidebar, this.container);
        
        this.showAllView();
    }

    showAllView(){
        this.view = [
            {
                name:'welcomeBackground',
                value: this.showWelcomeView(),
            },
            {
                name:'createProjectView',
                value: this.showNewProjectView(),
            },
            {
                name:'projectSelected',
                value: '',
            },
            {
                name:'editView',
                value:'',
            }
        ];
    }

    showWelcomeView(){
        const h1 = createElement('h1', {}, 'welcome to your todo app');
        const divDefaultView = createElement('div', {class:'defaultView'}, '');
        const bodyContainder = createElement('div', {class:'body'}, h1, divDefaultView);

        return bodyContainder;
    }

    showNewProjectView(){
        const h1 = createElement('h1', {class:'title'}, 'create a new project');
        const header= createElement('div', {class:'header'}, h1);
        this.inputProject = createElement('input', {type:'text', class:'inputProject', id:'inputProject', placeholder:'project name', name:'project-name'}, '');
    
        const logoAdd = createElement('i', {class:'fa-solid fa-plus'}, '');
        const span = createElement('span', {}, 'Add')
        this.buttonAdd = createElement('button', {type:'submit', class:'addNewProject'}, span, logoAdd);
    
        const divField = createElement('div', {class:'field'}, this.inputProject, this.buttonAdd);
    
        this.form = createElement('form', {class:'projectForm'}, divField);
        const bodyContainder = createElement('div', {class:'body'}, this.form);
    
        return [header, bodyContainder]; 
    }


    showProjectSelectedView(){
        this.h1 = createElement('h1', {class:'title'}, `${this.projectSelected.getProjectName()}`);
        const header= createElement('div', {class:'header'}, this.h1);

        this.inputTask = createElement('input', {type:'text',id:'', name:'', class:'task', placeholder:'enter your task', required:'required'}, '');
        const icon = createElement('i', {class:'fa-solid fa-plus'}, '');
        this.buttonAddTast = createElement('button', {type:'submit'}, icon);
        const divField = createElement('div', {class:'field'}, this.inputTask, this.buttonAddTast)
        this.formTask = createElement('form', {class:'formTask'}, divField);

        this.ulTodo = createElement('ul', {class:'todoLists'}, '');

        const bodyContainder = createElement('div', {class:'body'}, this.formTask, this.ulTodo);

        return [header, bodyContainder];
    }


    showEditTodoView(){
        const iconBack = createElement('i', {class:'fa-solid fa-chevron-left'}, '');
        this.backButton = createElement('div', {class:'backToTaskPage'}, iconBack);
        const h1 = createElement('h1', {class:'title'}, this.editTodoSelected.getTodoName());
        const header = createElement('div', {class:'header'}, this.backButton, h1);

        this.inputEditText = createElement('input', {type:'text', name:'todoTitle', id:'todoTitle', class:'input', placeholder:'Enter Title', value:`${this.editTodoSelected.getTodoName()}`, required:'required'}, '');
        const fieldInput = createElement('div', {class:'field'}, this.inputEditText);
        this.textArea = createElement('textarea', {name:'taskDescription', id:'taskDescription', row:'15', placeholder:'enter tasks descriptions', value:`${this.editTodoSelected.getDescription()}`}, `${this.editTodoSelected.getDescription()}`);
        const fieldTextArea = createElement('div', {class:'field'}, this.textArea);

        this.inputDate = createElement('input', {type:'date', class:'todoDate', name:'todoDate', required:'required', value:`${this.editTodoSelected.getDate()}`}, '');
        const fieldDate = createElement('div', {class:'field'}, this.inputDate);
        this.low = createElement('option', {value:'low'}, 'Low');
        this.medium = createElement('option', {value:'medium'}, 'Medium');
        this.high = createElement('option', {value:'high'}, 'High');
        this.prioritySelection = createElement('select', {name:'prioritySelection', class:'prioritySelection'}, this.low, this.medium, this.high); 
        
        _getPriorityForEdit(this.editTodoSelected.getPriority(), this.low, this.medium, this.high);

        const fieldTodoPriority = createElement('div', {class:'field'}, this.prioritySelection);
        const fieldDateSelect = createElement('div', {class:'fields'}, fieldDate, fieldTodoPriority);

        const iconEdit = createElement('i', {class:'fa-solid fa-pen-to-square editTodo'}, '');

        this.buttonValidEdit = createElement('button', {type:'submit', class:'validateEditTodo'}, iconEdit);
        const fieldButton = createElement('div', {class:'fieldButton'}, this.buttonValidEdit);

        this.formEdit = createElement('form', {class:'editTodoform', id:`${this.editTodoSelected.getIdTodo()}`}, fieldInput, fieldTextArea, fieldDateSelect, fieldButton);
        const bodyContainder = createElement('div', {class:'body'}, this.formEdit);

        return [header, bodyContainder];
    }
}


/** ----------------------------------------- functions ---------------------------------------------------------- */


function renderApp(arg){
    return document.body.append(arg.app);
}

function renderView (arg, viewType){
    arg.container.innerHTML = '';

    const page = arg.view.find( v => {
        return v.name === viewType 
    });

    if(!page){
        return;
    }
    
    if(Array.isArray(page.value)){
        page.value.forEach( p =>{
            arg.container.appendChild(p)
        });
    }else{
        arg.container.appendChild(page.value);
    }
}

function addProject(arg, todo){
    const text = `
                <li class="project">
                    <span class="projectName" id = "${todo.getIdProject()}">${todo.getProjectName()}</span>
                    <div class="majProject">
                        <i class="fa-solid fa-pen-to-square editProject"></i>
                        <i class="fa-solid fa-trash deleteProject"></i>
                    </div>                
                </li> `;
        
    if(todo.getProjectName()){
        if(!arg.projectNames.includes(`${todo.getProjectName().toLowerCase()}`)){
            const position = 'beforeend';
            arg.projectList.insertAdjacentHTML(position, text);
            arg.projectNames.push(todo.getProjectName().toLowerCase());
        }   
    }
    arg.inputProject.value = '';
}

function addTask(arg, todo){
    const text = `
            <li class="todo" data-id = "${todo.getIdTodo()}">
                        <input type="checkbox" name="todoToCheck" class="input" id="${todo.getIdTodo()}">
                        <label for="${todo.getIdTodo()}" class="todoToCheck" data-id ="${todo.getIdTodo()}"></label>
                        <div class="details">
                            <div class="preview">
                                <div class="title">${todo.getTodoName()}</div>
                                <div class="infotags">
                                    <span class="dateTag">
                                        <span class="iconCalendar"><i class="fa fa-calendar"></i></span>
                                        <span>${todo.getDate()}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="others">
                                <i class="fa-solid fa-pen-to-square editTodo" id="${todo.getIdTodo()}"></i>
                                <i class="fa-solid fa-trash deleteTodo" id="${todo.getIdTodo()}"></i>
                            </div>
                        </div>
                    </li>
                `;

        const position = 'beforeend';
        arg.ulTodo.insertAdjacentHTML(position, text);    
        arg.inputTask.value = '';

        _getColorPriority(todo);
        _getChecked(todo);
}

function deleteTask(arg, todoElement){
    arg.ulTodo.removeChild(todoElement);
}

function unselecteAllProject(){
    const elements =  document.querySelectorAll(".projectList .project .projectName");
    elements.forEach((e) => {
         e.classList.remove('activeProject');
    });
}

function selectedProject(arg, projectSelected){
    arg.projectSelected = projectSelected;
    unselecteAllProject();
    const selectedProjectElem = document.getElementById(`${projectSelected.getIdProject()}`);
    selectedProjectElem.classList.add('activeProject');
    arg.view[2].value = arg.showProjectSelectedView();  
}

function selectEditTodo(arg, todoSelected){
    arg.editTodoSelected = todoSelected;
    arg.view[3].value = arg.showEditTodoView();
}

function _getPriorityForEdit(property, ...element){
    const elements = [...element];

    for(let key in elements){
        elements[key].removeAttribute('selected');
        if(property === elements[key].value){
            elements[key].setAttribute('selected', 'true');
        }
    }
}    

function _getColorPriority(todo){
    const priority = todo.getPriority();
        let color = document.querySelector(`[data-id="${todo.getIdTodo()}"]`);
        switch(priority){
            case 'high' :
                color.classList.add('highPriority');
                break;
            case 'medium' :
                color.classList.add('mediumPriority');
                break;
            case 'low' :
                color.classList.add('lowPriority');
                break;
        } 
}

function _getChecked(todo){
    const labelInput = document.getElementById(`${todo.getIdTodo()}`);
    const elementLi = labelInput.parentNode;

    if(todo.getChecked() === true){
        labelInput.setAttribute('checked', true);
        labelInput.classList.add('checked');
        elementLi.classList.add('checked');
        elementLi.style.setProperty('--afterBack', '#ccc');
    }
}

export { UIDesign, renderView, renderApp, addProject, selectedProject, addTask, selectEditTodo, deleteTask };

