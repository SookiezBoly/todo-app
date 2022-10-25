class Project{
    constructor(projectName){
        this.projectName = projectName
        this.idProject = Date.now().toString();
        this.todos = []
    }

    getProjectName(){
        return this.projectName;
    } 

    getIdProject(){
        return this.idProject;
    }

    setProjectName(projectName){
        this.projectName = projectName
    }

    addTodo(todo){
        this.todos.push(todo);
    }
}

export{ Project };
