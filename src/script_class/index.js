import { UIDesign, renderView, renderApp, addProject, selectedProject, addTask } from '../script_class/UIDesign.js';
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
        management.addTodo(newTodo)      
    }


});





ui.app.addEventListener('click', (e) => {
    console.log(e.target)
    if(e.target.classList.contains('editTodo')){
        console.log('FOUND EDIT BUTTON')
    }
})