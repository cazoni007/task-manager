const toggleButton = document.getElementById('toggle-theme-button');
const body = document.querySelector('body');
const main = document.querySelector('main');
const title = document.querySelector('.title');
const list = document.querySelector('.list');
const itemList = document.getElementsByTagName('li');
const input = document.querySelector('.input');
const form = document.querySelector('.main');

document.addEventListener('DOMContentLoaded', loadLocalStorageTask);
function loadLocalStorageTask(){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = task.content;
        taskElement.classList.add('list__item');
        if (task.theme === 'dark') {
            taskElement.classList.add('toggle-theme-body');
            taskElement.classList.add('toggle-white-color');
        }
        taskElement.id = task.id;
        list.appendChild(taskElement);
    });
}

const toggleTheme = () => {
    if (body.classList.contains('toggle-theme-dark-white')){
        body.classList.remove('toggle-theme-dark-white');
        body.classList.add('toggle-theme-body');
        main.classList.remove('toggle-theme-white');
        main.classList.add('toggle-theme-main');
        title.classList.add('toggle-white-color');
        
        [...itemList].forEach(element => {
            element.classList.add('toggle-theme-body');
            element.classList.add('toggle-white-color');
        });
        // list.children.classList.add('toggle-theme-body');
        // list.children.classList.add('toggle-white-color')
    } else {
        body.classList.remove('toggle-theme-body');
        body.classList.add('toggle-theme-dark-white');
        main.classList.remove('toggle-theme-main');
        main.classList.add('toggle-theme-white');
        title.classList.remove('toggle-white-color');
        
        [...itemList].forEach(element => {
            element.classList.remove('toggle-theme-body');
            element.classList.remove('toggle-white-color');
        });
        // list.children.classList.remove('toggle-theme-body');
        // list.children.classList.remove('toggle-white-color');
        }
    }
let sumId = 1;
const getTask = (event) => {
    event.preventDefault();
    event.preventDefault();
    const taskContent = `${input.value}<span>✖️</span><span>🖋️</span>`;
    const task = document.createElement('li');
    task.innerHTML = taskContent;
    task.classList.add('list__item');
    if (body.classList.contains('toggle-theme-body')) {
        task.classList.add('toggle-theme-body');
        task.classList.add('toggle-white-color');
    }
    task.id = sumId;
    sumId++;
    list.append(task);
    console.log(task);
    storeTaskInLocalStorage(taskContent);
    input.value = "";
}
const deleteTask = (event) => {
    if(event.target.textContent === "✖️" && confirm("¿Seguro que deseas eliminar esta tarea?")) {
        const taskElement = event.target.parentElement;
        taskElement.remove();
        removeTaskFromLocalStorage(taskElement.id);
    } else if(event.target.textContent === "🖋️"){
        const newTask = prompt("Edita la tarea:", event.target.parentElement.firstChild.textContent)
        if (newTask !== null) {
            const taskElement = event.target.parentElement;
            const newTaskContent = prompt("Edita la tarea:", taskElement.firstChild.textContent);
            if (newTaskContent !== null) {
                taskElement.firstChild.textContent = newTaskContent;
                updateTaskInLocalStorage(taskElement.id, newTaskContent);
            }
        }
    }
}
toggleButton.addEventListener("click", toggleTheme);
form.addEventListener('submit', getTask);
list.addEventListener('click',deleteTask);

function storeTaskInLocalStorage (taskContent) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const task = {
        id: sumId,
        content: taskContent,
        theme: body.classList.contains('toggle-theme-body') ? 'dark' : 'light'
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter(task => task.id !== parseInt(taskId));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskId, newContent) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.map(task => {
        if (task.id === parseInt(taskId)) {
            task.content = newContent;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}