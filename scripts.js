const toggleButton = document.getElementById('toggle-theme-button');
const body = document.querySelector('body');
const main = document.querySelector('main');
const title = document.querySelector('.title');
const list = document.querySelector('.list');
const itemList = document.getElementsByTagName('li');
const input = document.querySelector('.input');
const form = document.querySelector('.main');

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
    const task = document.createElement('li')
    task.innerHTML = `${input.value}<span>✖️</span><span>🖋️</span>`;
    task.classList.add('list__item')
    if (body.classList.contains('toggle-theme-body')){
        task.classList.add('toggle-theme-body');
        task.classList.add('toggle-white-color');
    }
    task.id = sumId;
    sumId++;
    list.append(task);
}
const deleteTask = (event) => {
    if(event.target.textContent === "✖️" && confirm("¿Seguro que deseas eliminar esta tarea?")) {
        (event.target.parentElement).remove();
    } else if(event.target.textContent === "🖋️"){
        const newTask = prompt("Edita la tarea:", event.target.parentElement.firstChild.textContent)
        if (newTask !== null) {
            event.target.parentElement.firstChild.textContent = newTask;
        }
    }
}
toggleButton.addEventListener("click", toggleTheme);
form.addEventListener('submit', getTask);
list.addEventListener('click',deleteTask);
