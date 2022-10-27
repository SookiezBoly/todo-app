class Todo{
    constructor(todoName){
        this.todoName = todoName;
        this.description = '';
        this.date = '';
        this.priority = '';
        this.checked = false;
        this.idTodo = Date.now().toString();
    }

    getTodoName(){
        return this.todoName;
    }

    getIdTodo(){
        return this.idTodo;
    }

    getDate(){
        return this.date;
    }

    getPriority(){
        return this.priority;
    }

    getDescription(){
        return this.description;
    }

    getChecked(){
        return this.checked;
    }

    setChecked(check){
        this.checked = check;
    }

    edit([newName, newDescription, newDate, newPriority]){
        this.todoName = newName;
        this.description = newDescription;
        this.date = newDate;
        this.priority = newPriority;
    }
}

export{ Todo };