// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

// eventListener
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOptions.addEventListener("click",filterTodo);
document.addEventListener("DOMContentLoaded",getTodos);

// functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // todo Div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add Todo To LocalStorage
    saveLocalTodos(todoInput.value);
    // CHECK MARK BUTTON
    const complatedButton = document.createElement("button");
    complatedButton.innerHTML = `<i class="fas fa-check"></i>`;
    complatedButton.classList.add("complate-btn");
    todoDiv.appendChild(complatedButton);
    // CHECK MARK TRASH
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    
    //if (e.target.classList[0] === "trash-btn" ) {
    if (e.target.classList.contains("trash-btn")) {
        // Animations
        e.target.parentElement.classList.add("fall");
        removeLocalTodos(e.target.parentElement);
        e.target.parentElement.addEventListener("transitionend",function () {
            e.target.parentElement.remove();
        })
    }

    if (e.target.classList[0] === "complate-btn" ) {
        e.target.parentElement.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;

        }
    })
}

function saveLocalTodos(todo) {
    // Check-- Do I already have thing in there?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos() {
    // Check-- Do I already have thing in there?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        // todo Div 
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // CHECK MARK BUTTON
        const complatedButton = document.createElement("button");
        complatedButton.innerHTML = `<i class="fas fa-check"></i>`;
        complatedButton.classList.add("complate-btn");
        todoDiv.appendChild(complatedButton);
        // CHECK MARK TRASH
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
        })

}

function removeLocalTodos(todo) {
     // Check-- Do I already have thing in there?
     let todos;
     if(localStorage.getItem("todos") === null){
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem("todos"));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex),1);
     localStorage.setItem("todos",JSON.stringify(todos));
}