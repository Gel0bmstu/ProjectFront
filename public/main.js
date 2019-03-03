console.log("Server started");

const menuItems = {
	signup: 'Регистрация',
	login: 'Логин',
	game: 'Играть',
	leaderboard: 'Таблица лидеров',
	about: 'О приложении'
};

const users = {
	'a.ostapenko@corp.mail.ru': {
		email: 'a.ostapenko@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
	'd.dorofeev@corp.mail.ru': {
		email: 'd.dorofeev@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 100500,
	},
	's.volodin@corp.mail.ru': {
		email: 'marina.titova@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
	'a.tyuldyukov@corp.mail.ru': {
		email: 'a.tyuldyukov@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
};

// const users = {
// 	firstUser: "Fread",
// 	secondUser: "Jhon"
// };

function ajax (callback, method, path, body) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, path, true);
	xhr.withCredentials = true;

	if (body) {
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) {
			return;
		}

		callback(xhr);
	};

	if (body) {
		xhr.send(JSON.stringify(body));
	} else {
		xhr.send();
	}
}

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

// Объеект, к которому добавится кнопка; sectionName, className, Текст кнопки
function createButton(object, sectionName, className, textContent) {
	const btn = document.createElement('button');
	btn.dataset.section = sectionName;
	btn.textContent = sectionName;
	btn.className = className;
	btn.textContent = textContent;
	object.appendChild(btn);
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

	Object.keys(menuItems).forEach( (key, value) => {
		createButton(menu, key, 'btn', menuItems[key]);
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
	createButton(menu, 'submit', 'submit btn', 'Submit');
	createButton(menu, 'menu', 'menu btn', 'Back');


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
	main.appendChild(gameLogic);

	createButton(menu, 'menu', 'btn', 'Back');
}

function createLeaderboard() {
	main.innerHTML = '';
	createTitle('Leaderboard');

	const leaderboard = document.createElement('div');
	leaderboard.dataset.section = 'leaderboard';
	leaderboard.className = 'menu';

	if (users) {
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		thead.innerHTML = `
		<tr>
			<th>Email</th>
			<th>Age</th>
			<th>Score</th>
		</th>
		`;
		const tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);
		table.border = 1;
		table.cellSpacing = table.cellPadding = 0;

		console.log('Перед forEach');

		for (let key in users) {
			const email = users[key].email;
			const age = users[key].age;
			const score = users[key].score;

			console.log(email, age, score);

			const tr = document.createElement('tr');
			const tdEmail = document.createElement('td');
			const tdAge = document.createElement('td');
			const tdScore = document.createElement('td');

			tdEmail.textContent = email;
			tdAge.textContent = age;
			tdScore.textContent = score;

			tr.appendChild(tdEmail);
			tr.appendChild(tdAge);
			tr.appendChild(tdScore);

			tbody.appendChild(tr);

			leaderboard.appendChild(table);
		};
	};
	main.appendChild(leaderboard);

	alert('vishli iz if');
	// else {
	// 	const em = document.createElement('em');
	// 	em.textContent = 'Loading';
	// 	leaderboard.appendChild(em);

	// 	ajax(function (xhr) {
	// 		const users = JSON.parse(xhr.responseText);
	// 		application.innerHTML = '';
	// 		createLeaderboard(users);
	// 	}, 'GET', '/users');
	// }

	createButton(leaderboard, 'menu', 'btn', 'Back');
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
	leaderboard: createLeaderboard,
	// about: createAbout,

	// Other functions
	title: createTitle,
};

// Обработчик всех евентов в DOM'е
app.addEventListener('click', (evt) => {

	const target = evt.target;

	// Если target является кнопкой 
	if (target instanceof HTMLButtonElement) {
		// Убираем все стандартные обработчики	
		evt.preventDefault();

		const section = target.dataset.section;

		functions[section]();
	};
});