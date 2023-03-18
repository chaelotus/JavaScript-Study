const ToDoForm = document.querySelector("#todo-input");
const ToDoList = document.querySelector("#todo-list");
const input = document.querySelector("#todo-input input");

const TODOS_KEY = "todos";
let todos = [];

function savedtodos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(todos));
}
function DeleteTodos(event){
    const removeone = event.target.parentElement;
    removeone.remove();
    todos = todos.filter(todo => todo.id !== parseInt(removeone.id));
    savedtodos();
}
function paintTodos(newtodos){
    const li = document.createElement("li");
    ToDoList.appendChild(li);
    li.id = newtodos.id;
    const span = document.createElement("span");
    li.appendChild(span);
    span.innerText = newtodos.text;
    const button = document.createElement("button");
    li.appendChild(button);
    button.innerText = '❌';
    button.addEventListener("click",DeleteTodos);
}
function ToDohandle(event){
    event.preventDefault();
    const newtodosobj = {
        id : Date.now(),
        text: input.value,
    }
    todos.push(newtodosobj);
    savedtodos();
    input.value = "";
    paintTodos(newtodosobj);
    savedtodos();
}
ToDoForm.addEventListener("submit",ToDohandle);
const savedtodo = localStorage.getItem(TODOS_KEY);
if(savedtodo){
    const parsetodo = JSON.parse(savedtodo);
    todos = parsetodo;
    todos.forEach(paintTodos);
}