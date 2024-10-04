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
    const theme = localStorage.getItem("theme");
    tasks.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = task.content;
        taskElement.classList.add('list__item');
        taskElement.id = task.id;
        list.appendChild(taskElement);
    });
    
    if (theme === "dark") {
        toggleDarkTheme();
    } else {
        toggleWhiteTheme();
    }
}

const toggleTheme = () => {
    if (body.classList.contains('toggle-theme-dark-white')){
        storeLastThemeInLocalStorage ("dark");
        toggleDarkTheme();
    } else {
        storeLastThemeInLocalStorage ("white");
        toggleWhiteTheme();
        }
    }
let sumId = 1;
const getTask = (event) => {
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
            // const newTaskContent = prompt("Edita la tarea:", taskElement.firstChild.textContent);
            const newTaskContent = `${newTask}<span>✖️</span><span>🖋️</span>`;
            if (newTaskContent !== null) {
                taskElement.firstChild.textContent = newTask;
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

function storeLastThemeInLocalStorage (lastTheme) {
    localStorage.setItem("theme", lastTheme);
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

function toggleDarkTheme() {
    body.classList.remove('toggle-theme-dark-white');
    body.classList.add('toggle-theme-body');
    main.classList.remove('toggle-theme-white');
    main.classList.add('toggle-theme-main');
    title.classList.add('toggle-white-color');
    [...itemList].forEach(element => {
        element.classList.add('toggle-theme-body');
        element.classList.add('toggle-white-color');
    });
}

function toggleWhiteTheme() {
    body.classList.remove('toggle-theme-body');
    body.classList.add('toggle-theme-dark-white');
    main.classList.remove('toggle-theme-main');
    main.classList.add('toggle-theme-white');
    title.classList.remove('toggle-white-color');
    [...itemList].forEach(element => {
        element.classList.remove('toggle-theme-body');
        element.classList.remove('toggle-white-color');
    });
}