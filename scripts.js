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
        list.classList.add('toggle-theme-body');
        [...itemList].forEach(element => element.classList.add('toggle-white-color'));
    } else {
        body.classList.remove('toggle-theme-body');
        body.classList.add('toggle-theme-dark-white');
        main.classList.remove('toggle-theme-main');
        main.classList.add('toggle-theme-white');
        title.classList.remove('toggle-white-color');
        list.classList.remove('toggle-theme-body');
        [...itemList].forEach(element => element.classList.remove('toggle-white-color'));
    }
};
const getTask = (event) => {
    event.preventDefault();
    const task = document.createElement('li')
    task.innerText = `${input.value}✖️🖋️`;
    task.classList.add('list__item')
    list.append(task);
}
toggleButton.addEventListener("click", toggleTheme)
form.addEventListener('submit', getTask)
