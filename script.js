const inputbox = document.getElementById("inputbox");
const addbtn = document.getElementById("addbtn");
const todolist = document.getElementById("todolist");

let edittodo = null;

const addtodo = () => {
  const inputtext = inputbox.value.trim();
  if (inputtext.length <= 0) {
    alert("your must write something in your todo");
    return;
  }

  if (addbtn.value === "Edit") {
    edittodo.target.previousElementSibling.innerHTML = inputtext;
    addbtn.value = "Add";
    inputbox.value = "";
    savelocal();
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputtext;
    li.appendChild(p);

    const edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("btn", "edit");
    li.appendChild(edit);

    const delet = document.createElement("button");
    delet.innerText = "Remove";
    delet.classList.add("btn", "delet");
    li.appendChild(delet);

    todolist.appendChild(li);
    inputbox.value = "";
    savelocal();
  }
};

const update = (e) => {
  if (e.target.innerHTML === "Remove") {
    e.target.parentElement.remove();
    savelocal();
    deletlocal(e.target.parentElement)
  }

  if (e.target.innerHTML === "Edit") {
    inputbox.value = e.target.previousElementSibling.innerHTML;
    inputbox.focus();
    addbtn.value = "Edit";
    edittodo = e;
  }
};

const savelocal = () => {
  let todos = [];
  document.querySelectorAll("#todolist li p").forEach(p => {
    todos.push(p.innerHTML);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

const gettodo = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);

    const edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("btn", "edit");
    li.appendChild(edit);

    const delet = document.createElement("button");
    delet.innerText = "Remove";
    delet.classList.add("btn", "delet");
    li.appendChild(delet);

    todolist.appendChild(li);
  });
};


const deletlocal = (todo)=>{
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

document.addEventListener("DOMContentLoaded", gettodo);
addbtn.addEventListener("click", addtodo);
todolist.addEventListener("click", update);
