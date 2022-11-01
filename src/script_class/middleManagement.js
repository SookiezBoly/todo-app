class MiddleManagement{
    constructor(){
       this.projects = [];
       this.projectNames = [];
    }


/* ---------------------------------------------- Local Storage ------------------------------------------------------ */

    storeIntoLocalStorage = () => {
        const datas = [];
        this.projects.forEach(project => {
            datas.push({
                idProject : project.getIdProject(),
                nameProject : project.getProjectName(),         
                todos : project.getDatasTodos()
            });
        });

        localStorage.setItem('projects', JSON.stringify(datas));
    }

/* ----------------------------------------------    project       --------------------------------------------------- */

    addProjectName(project){
       this.projectNames.push(project.getProjectName().toLowerCase());
    }

    addProject(project){
        if(!this.projectNames.includes(`${project.getProjectName().toLowerCase()}`)){
            this.projects.push(project);
            this.addProjectName(project);
        }    
    }

    getSelectedProjectT(){
        return this.selectedProject;
    }

    getSelectedProject(idProject){
        const idPro = this.projects.filter(project => idProject === project.getIdProject());
        return idPro[0];
    }

    setSelectedProject(project){
        this.selectedProject = project;  
    }

    deleteProject(idProject){
        this.projects = this.projects.filter(project => idProject !== project.getIdProject() )
    }

    deleteProjectNames(project){
        const nameProject = project.getProjectName().toLowerCase();
        this.projectNames = this.projectNames.filter(name => name !== nameProject);
    }

    editProject(idClicked, newName){
        const projectNameToEdit = this.getSelectedProject(idClicked);
        if(!this.projectNames.includes(`${newName}`)){
            projectNameToEdit.setProjectName(newName);
        }       
    }



/* ------------------------------------------      todo         ----------------------------------------------------- */

    addTodo(todo){
        if(this.selectedProject){
            const projetSelected = this.projects.filter( project => this.selectedProject.getIdProject() === project.getIdProject() )[0];
            projetSelected.addTodo(todo);
            this.setSelectedProject(projetSelected);
            return true;
        }
    }

    getTodo(idTodo){
        if(this.selectedProject){
            return this.selectedProject.todos.filter( element => idTodo === element.getIdTodo())[0];
        } 
    }
   
    setSelectedTodo(todo){
        this.selectedTodo = todo;
    }

    editTodo(id, ...data){
        const todoToEdit = this.selectedProject.todos.filter( todo => id === todo.getIdTodo())[0];
        const table = [...data];
        todoToEdit.edit(table);
        this.setSelectedProject(this.selectedProject);
    }

    deleteTodo(idTodo){
        this.selectedProject.todos = this.selectedProject.todos.filter(todo => idTodo !== todo.getIdTodo());
        this.setSelectedProject(this.selectedProject);
        return this.selectedProject.todos;
    }

}






export{ MiddleManagement };


