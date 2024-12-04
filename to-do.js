let inputBox = document.getElementById("inputBox");
let btn = document.getElementById("btn");
let ul = document.getElementById("ul")
let edittodo = null;


const addtodo = () => {
    let inputText = inputBox.value.trim();
    if (inputText <= 0) {
        alert("Please write something....!");
    }

    if (btn.value === "Edit") {
        editLocalTodos(edittodo.target.previousElementSibling.innerHTML);
        edittodo.target.previousElementSibling.innerHTML = inputText;
        btn.value = "ADD";
        inputBox.value = "";
    }
    else {
        const li = document.createElement("li");
        const p = document.createElement("p");

        p.innerHTML = inputText;
        li.appendChild(p);


        const editbtn = document.createElement("button");
        editbtn.innerText = "Edit";
        li.appendChild(editbtn);
        editbtn.classList.add("btn", "editbtn");


        const deletebtn = document.createElement("button");
        deletebtn.innerText = "Remove";
        li.appendChild(deletebtn);
        deletebtn.classList.add("btn", "deletebtn");

        ul.appendChild(li);
        inputBox.value = "";
        saveLocaltodo(inputText);
    }
}


const updatetodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        ul.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }
    else if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        btn.value = "Edit";
        edittodo = e;
    }
}

let saveLocaltodo = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

let getLocaltodo = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement("li");
            const p = document.createElement("p");

            p.innerHTML = todo;
            li.appendChild(p);


            const editbtn = document.createElement("button");
            editbtn.innerText = "Edit";
            li.appendChild(editbtn);
            editbtn.classList.add("btn", "editbtn");


            const deletebtn = document.createElement("button");
            deletebtn.innerText = "Remove";
            li.appendChild(deletebtn);
            deletebtn.classList.add("btn", "deletebtn");

            ul.appendChild(li);
        });
    }
}
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // Array functions : slice / splice
    console.log(todoIndex);
}


const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocaltodo);
btn.addEventListener('click', addtodo);
ul.addEventListener('click', updatetodo);