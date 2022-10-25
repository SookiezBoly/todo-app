class Todo{
    constructor(todoName){
        this.todoName = todoName;
        this.idTodo = Date.now().toString();
    }

    getTodoName(){
        return this.todoName;
    }

    getIdTodo(){
        return this.idTodo;
    }
}

export{ Todo };