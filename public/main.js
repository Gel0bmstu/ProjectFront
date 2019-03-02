console.log("hello world");

const menuItems = {
	signup: 'Регистрация',
	login: 'Логин',
	game: 'Играть',
	leaderboard: 'Таблица лидеров',
	about: 'О приложении'
};

// const head = document.getElementsByTagName('head');
// const body = document.getElementsByTagName('body');

// Разименовывем необходимые элементы DOM'a
const app = document.getElementById("application");

const header = document.createElement('div');
header.dataset.section = "header";
app.appendChild(header);

const side = document.createElement('div');
side.dataset.section = "sidebar";
app.appendChild(side);

const main = document.createElement('div');
main.className = "main";
app.appendChild(main);

// Вспомогательные функции (их и будем писать/исправлять/дополнять)
function createTitle(text) {
	const title = document.createElement('div');
	title.className = 'title';
	const title_txt = document.createElement('h1');
	title_txt.textContent = text;

	main.appendChild(title)
	title.appendChild(title_txt);
}

function createButton(object, sectionName, className) {
	const btn = document.createElement('button');
	btn.dataset.section = sectionName;
	btn.textContent = sectionName;
	btn.className = className;
	object.append(btn);
}

function createForm(object, sectionName, className, formAction) {
	const form = document.createElement('input');
	form.dataset.section = sectionName;
	form.placeholder = formAction;
	form.className = className;
	form.action = formAction;
	object.append(form);
}

// Основные функции, отвечают за логику работы фронта/генерирование контента и тд
function createMenu() {
	main.innerHTML = '';
	createTitle('ВСЕМ МОИМ БРАТЬЯМ САЛАААААААААААААААААМ');

	const menu = document.createElement('div');
	menu.className = 'menu';
	main.appendChild(menu);

	const menuStyle = document.createElement('link');
	menuStyle.rel = 'stylesheet'
	menuStyle.href = 'styles/menu.css';

	// poka hz kak eto
	header.appendChild(menuStyle);

	Object.keys(menuItems).forEach( (key) => {
		createButton(menu, key, 'btn');
	});
}	

function createLogin() {
	main.innerHTML = '';

	createTitle('Login')

	const menu = document.createElement('div');
	menu.className = 'menu';
	main.appendChild(menu);

	createForm(menu, 'loginForm', 'loginForm form', 'login');
	createForm(menu, 'passForm', 'passForm form', 'pass');
	createButton(menu, 'submit', 'submit btn');
	createButton(menu, 'menu', 'menu btn');


}

function createSignup() {
	
}

function createGame() {
	main.innerHTML = '';

	const menu = document.createElement('div');
	menu.className = 'gameBlock';
	main.appendChild(menu);

	const canvas = document.createElement('canvas');
	canvas.id = 'gameCanvas';
	canvas.width = 700;
	canvas.height = 700;
	menu.appendChild(canvas);

	const buf = document.getElementById('gamejs');
	if (buf !== null) {
		alert('got!');
	}

	const gameLogic = document.createElement('script');
	gameLogic.id = "gamejs";
	gameLogic.src = '/game.js'
	menu.appendChild(gameLogic);

	createButton(menu, 'menu', 'btn');
}

// Заглушки, можешь сделать их, если хочешь
function leaderboard() {

}

function createAbout() {

}


// Главный блок: создаем меню 
createMenu();

// Карта функций, сюда будем подгруать новые функции
const functions = {
	menu: createMenu,

	// Menu elements
	signup: createSignup,
	login: createLogin,
	game: createGame,
	// leaderboard: createLeaderboard,
	// about: createAbout,

	// Other functions
	title: createTitle,
};

// Обработчик всех евентов в DOM'е
app.addEventListener('click', (evt) => {

	const target = evt.target;

	if (target instanceof HTMLButtonElement) {	
		evt.preventDefault();

		const section = target.dataset.section;

		functions[section]();
	};
});