class MiddleManagement{
    constructor(){
       this.projects = [];
       this.projectNames = [];
    }

    addProjectName(project){
       this.projectNames.push(project.getProjectName().toLowerCase());
    }

    addProject(project){
        if(!this.projectNames.includes(`${project.getProjectName().toLowerCase()}`)){
            this.projects.push(project);
            this.addProjectName(project);
        }    
    }

    /* selected project when we click on one, to get the objectproject [before creating any taks] */
    getSelectedProject(idProject){
        const idPro = this.projects.filter(project => idProject === project.getIdProject());
        return idPro[0];    /* now it give me an object instead of an array which was my issue */
    }

   
    addTodo(todo){
        if(this.selectedProject){
            const projetSelected = this.projects.filter( project => this.selectedProject.getIdProject() === project.getIdProject() )[0];
            projetSelected.addTodo(todo);
            this.setSelectedProject(projetSelected);
        }
    }

    setSelectedProject(project){
        this.selectedProject = project;
    }
}


export{ MiddleManagement };