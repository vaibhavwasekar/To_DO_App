const addTodo = () => {
    let title = document.getElementById("title").value.trim();
    let desc = document.getElementById("desc").value.trim();

    if (!title || !desc) {
        alert("Please enter both title and description!");
        return;
    }

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    let todoObject = {
        title: title,
        desc: desc,
        id: Math.trunc(Math.random() * 1000),
    };

    todos.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(todos));

    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";

    showTodos();
};

const showTodos = () => {
    let todoString = localStorage.getItem("todos");
    let content = "";

    if (!todoString || JSON.parse(todoString).length === 0) {
        content = "<h3 class='text-white text-center'>No todos to show</h3>";
    } else {
        let todos = JSON.parse(todoString);
        for (let todo of todos.reverse()) {
            content += `
                <div class='card mt-2'>
                    <div class='card-body'>
                        <h3>${todo.title}</h3>
                        <p>${todo.desc}</p>
                        <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                </div>
            `;
        }
    }

    document.getElementById('main-content').innerHTML = content;
};

const deleteTodo = (id) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodos();
};

document.addEventListener("DOMContentLoaded", showTodos);
