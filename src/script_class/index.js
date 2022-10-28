import { UIDesign, renderView, renderApp, addProject, selectedProject, addTask, selectEditTodo, deleteTask } from '../script_class/UIDesign.js';
import { Project } from '../script_class/project.js';
import { Todo } from '../script_class/todo.js'
import { MiddleManagement } from '../script_class/middleManagement.js';


const ui = new UIDesign();
const management = new MiddleManagement();

renderApp(ui);
renderView(ui, 'welcomeBackground');


ui.buttonNewProject.addEventListener('click', () =>{
    renderView(ui, 'createProjectView');
    ui.buttonNewProject.classList.add('active');
});


ui.form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const newProject = new Project(`${ui.inputProject.value}`);
    addProject(ui, newProject);
    management.addProject(newProject);
});


ui.projectList.addEventListener('click', (e) => {
    if(e.target.classList.contains('projectName')){
        const projectClicked = management.getSelectedProject(e.target.id);
        if(projectClicked){
            selectedProject(ui, projectClicked);
            management.setSelectedProject(projectClicked);
            renderView(ui, 'projectSelected');      
        }    
    }
});


ui.app.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(evt.target.classList.contains('formTask')){
        const newTodo = new Todo(`${ui.inputTask.value}`);
        addTask(ui, newTodo);
        management.addTodo(newTodo);    
    }

    if(evt.target.classList.contains('editTodoform')){
        const todoName = ui.inputEditText.value;
        const description = ui.textArea.value;
        const date = ui.inputDate.value;
        const priority = ui.prioritySelection.value.toLowerCase();
  
        management.editTodo(evt.target.id, todoName, description, date, priority)
        const project = management.getSelectedProjectT();
        selectedProject(ui, project);
        renderView(ui, 'projectSelected');
        project.todos.forEach(todo => {
            addTask(ui, todo);
        });
    }

});


ui.app.addEventListener('click', (evt) => {
    
    if(evt.target.classList.contains('editTodo')){
        const idTodoClicked = evt.target.id
        const todoToEdit = management.getTodo(idTodoClicked);
        management.setSelectedTodo(todoToEdit);
        selectEditTodo(ui, todoToEdit);
        renderView(ui, 'editView');
    }

    if(evt.target.classList.contains('backToTaskPage') || evt.target.classList.contains('fa-chevron-left')){
        renderView(ui, 'projectSelected');
    }

    if(evt.target.classList.contains('deleteTodo')){
        const idDeleteClicked = evt.target.id;
        const todoToDelete = document.querySelector(`[data-id="${idDeleteClicked}"]`);
        deleteTask(ui, todoToDelete);
        management.deleteTodo(idDeleteClicked);
    }

    if(evt.target.classList.contains('todoToCheck')){
        const idClicked = evt.target.dataset.id;
        const todoToCheck = management.getTodo(idClicked);
        const elementLi = evt.target.parentNode;

        if(todoToCheck.getChecked() === true){
            todoToCheck.setChecked(false);
            elementLi.classList.remove('checked');
            elementLi.style = '';
        }else{
            todoToCheck.setChecked(true);
            elementLi.classList.add('checked');
            elementLi.style.setProperty('--afterBack', '#ccc');
        }
        management.setSelectedTodo(todoToCheck);
    }

});