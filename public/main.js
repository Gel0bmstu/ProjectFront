console.log("hello world");

const menuItems = {
	signup: 'Регистрация',
	login: 'Логин',
	game: 'Играть',
	leaderboard: 'Таблица лидеров',
	about: 'О приложении'
};

const app = document.getElementById('application');

const title = document.createElement('h1');
title.textContent = 'ВСЕМ МОИМ БРАТЬЯМ САЛАААААААААААААААААМ';
title.className = 'title';
title.id = 'id';
app.appendChild(title);

const block = document.createElement('div');
block.className = 'menuBlock';
app.appendChild(block);

function createButton(object, text) {
	const btn = document.createElement('button');
	btn.dataset.section = text;
	btn.textContent = text;
	object.append(btn);
}

function createMenu(map) {
	Object.keys(map).forEach( (key) => {
		createButton(block, key);
	});
}	

createMenu(menuItems);


const loginLink = document.querySelector('[data-section = "login"]');
loginLink.addEventListener('click', () => {
	console.log('HELLO');
	block.innerHTML = '';
	createButton(block, 'newButton');
	createButton(block, 'back');
});

const backLink = document.querySelector('[data-section = "back"]');
backLink.addEventListener('click', () =>{
	console.log('BACK');
	block.innerHTML = '';
	createMenu(menuItems);
})
