console.log("hello world");

const menuItems = {
	signup: 'Регистрация',
	login: 'Логин',
	game: 'Играть',
	leaderboard: 'Таблица лидеров',
	about: 'О приложении'
};

const app = document.getElementById('application');
const block = document.createElement('div');
block.className = 'menuBlock';
app.appendChild(block);

function createTitle(object) {
	const title = document.createElement('h1');
	title.textContent = 'ВСЕМ МОИМ БРАТЬЯМ САЛАААААААААААААААААМ';
	title.className = 'title';

	object.appendChild(title);
}

function createButton(object, text) {
	const btn = document.createElement('button');
	btn.dataset.section = text;
	btn.textContent = text;
	object.append(btn);
}

function createMenu() {
	block.innerHTML = '';
	createTitle(block);	
	Object.keys(menuItems).forEach( (key) => {
		createButton(block, key);
	});
}	

function createLogin() {
	block.innerHTML = '';
	createButton(block, 'manipulation');
	createButton(block, 'back')
}

function back() {
	createMenu();
}

createMenu();


const functions = {
	menu: createMenu, 
	title: createTitle,
	// signup: createSignup,
	login: createLogin,
	back: back
	// game: createGame,
	// leaderboard: createLeaderboard,
	// about: createAbout
};

app.addEventListener('click', (evt) => {
	evt.preventDefault();

	const target = evt.target;

	const section = target.dataset.section;

	functions[section]();
});