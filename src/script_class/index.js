import { UIDesign, renderView, renderApp, addProject, selectedProject, addTask, selectEditTodo, deleteTask, deleteProject, editProject, updateEditedProject, unselecteAllProject } from '../script_class/UIDesign.js';
import { Project } from '../script_class/project.js';
import { Todo } from '../script_class/todo.js'
import { MiddleManagement } from '../script_class/middleManagement.js';


const ui = new UIDesign();
const management = new MiddleManagement();


renderApp(ui);


if(localStorage.getItem('projects')){
    const Ldatas = JSON.parse(localStorage.getItem('projects'));
    
    Ldatas.forEach( data => {
        const project = new Project(`${data.nameProject}`);
        data.todos.forEach( todo => {
            const currentTodo = new Todo(`${todo.todoName}`);
            const table = [currentTodo.nameTodo, currentTodo.description, currentTodo.date, currentTodo.priority];
            currentTodo.edit(table);
            project.addTodo(currentTodo);
        });
        management.addProject(project);
        addProject(ui, project);
    });
}


renderView(ui, 'welcomeBackground');


// ui.buttonNewProject.addEventListener('click', () =>{

//     renderView(ui, 'createProjectView');

//     ui.buttonNewProject.classList.add('active');
// });

ui.buttonNewProject.addEventListener('click', () =>{
    unselecteAllProject();
    renderView(ui, 'createProjectView');
});




ui.form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const newProject = new Project(`${ui.inputProject.value}`);
    addProject(ui, newProject);
    management.addProject(newProject);
    management.storeIntoLocalStorage();
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
    evt.stopPropagation();

    if(evt.target.classList.contains('formTask')){
        const newTodo = new Todo(`${ui.inputTask.value}`);
        management.addTodo(newTodo);
        
        addTask(ui, newTodo);
        management.storeIntoLocalStorage(); 
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

    if(evt.target.classList.contains('projectFormEdit')){
        const idClicked = evt.target.id;
        const newName = ui.inputProject.value
        const projectNameToEdit = management.getSelectedProject(idClicked);
        management.editProject(idClicked, newName);
        updateEditedProject(ui, projectNameToEdit);

       
    }
});


ui.app.addEventListener('click', (evt) => {
    
    if(evt.target.classList.contains('editTodo')){
        const idTodoClicked = evt.target.id
        const todoToEdit = management.getTodo(idTodoClicked);
        management.setSelectedTodo(todoToEdit);
        selectEditTodo(ui, todoToEdit);
        renderView(ui, 'editTodoView');
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

    if(evt.target.classList.contains('deleteProject')){
        const idProjectClicked = evt.target.id;
        const projectClicked = management.getSelectedProject(idProjectClicked);
        const projectElementToDelete = document.getElementById(`${idProjectClicked}`).parentNode;
        management.deleteProjectNames(projectClicked);
        management.deleteProject(projectClicked);
        deleteProject(ui, projectElementToDelete);

        
    }

    if(evt.target.classList.contains('editProject')){
        const idProjectClicked = evt.target.id;
        const projectToEdit = management.getSelectedProject(idProjectClicked);
        editProject(ui, projectToEdit);

       
    } 
});