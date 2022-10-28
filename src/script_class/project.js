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

    getTodos(){
        return this.todos; /* you dont need to create this function since you can acces to it directly */
    }
}

export{ Project };


