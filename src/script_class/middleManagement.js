class MiddleManagement{
    constructor(){
       this.projects = [];
       this.projectNames = [];
    }


/* ------------------------- project --------------------------*/
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

    /* selected project when we click on one, to get the objectproject [before creating any taks] */
    getSelectedProject(idProject){
        const idPro = this.projects.filter(project => idProject === project.getIdProject());
        return idPro[0];    /* now it give me an object instead of an array which was my issue */
    }

    setSelectedProject(project){
        this.selectedProject = project;  
    }

/* ------------------------- todo --------------------------*/
    addTodo(todo){
        if(this.selectedProject){
            const projetSelected = this.projects.filter( project => this.selectedProject.getIdProject() === project.getIdProject() )[0];
            projetSelected.addTodo(todo);
            this.setSelectedProject(projetSelected);
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


