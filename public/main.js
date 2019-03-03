console.log("hello world");

const {AjaxModule} = window;

const menuItems = {
	signup: 'Регистрация',
	login: 'Логин',
	game: 'Играть',
	leaderboard: 'Таблица лидеров',
	about: 'О приложении',
	profile: 'Профайл',
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

function createinput(object, name, type, placeholder, className) {
	const input = document.createElement('input');

	input.name = name;
	input.type = type;
	input.placeholder = placeholder;
	input.className = className;

	object.appendChild(input);
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

	createTitle('Login');

	const signInSection = document.createElement('section');
	signInSection.className = 'menu';
	signInSection.dataset.sectionName = 'login';

	const form = document.createElement('form');

	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email',
			className: 'loginForm form'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password',
			className: 'passForm form'
		},
		{
			name: 'submit',
			type: 'submit',
			className: 'submit btn'
		}
	];

	inputs.forEach(function (item) {
		createinput(form, 
			item.name,
			item.type, 
			item.placeholder, 
			item.className
		);
	});

	signInSection.appendChild(form);

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;

		AjaxModule.doPost({
			callback() {
				main.innerHTML = '';
				createProfile();					
			},
			path: '/login',
			body: {
				email: email,
				password: password
			}
		});
	});

	main.appendChild(signInSection);
	createButton(form, 'menu', 'menu btn');
}

function createSignup() {
	main.innerHTML = '';

	createTitle('Sign Up');

	const signUpSection = document.createElement('section');
	signUpSection.className = 'menu';	
	signUpSection.dataset.sectionName = 'sign_up';

	const form = document.createElement('form');

	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email',
			className: 'loginForm form'
		},
		{
			name: 'age',
			type: 'number',
			placeholder: 'Your Age',
			className: 'ageForm form'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password',
			className: 'passForm form'
		},
		{
			name: 'password_repeat',
			type: 'password',
			placeholder: 'Repeat Password',
			className: 'passForm form'
		},
		{
			name: 'submit',
			type: 'submit',
			className: 'submit btn'
		}
	];

	inputs.forEach(function (item) {
		createinput(form,
			item.name,
			item.type, 
			item.placeholder, 
			item.className
		);
	});

	signUpSection.appendChild(form);

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const age = parseInt(form.elements[ 'age' ].value);
		const password = form.elements[ 'password' ].value;
		const password_repeat = form.elements[ 'password_repeat' ].value;

		if (password !== password_repeat) {
			alert('Passwords is not equals');

			return;
		}

		AjaxModule.doPost({
			callback() {
				main.innerHTML = '';
				createProfile();					
			},
			path: '/signup',
			body: {
				email: email,
				age: age,
				password: password
			}
		});
	});

	main.appendChild(signUpSection);
	createButton(form, 'menu', 'menu btn');
}

function createProfile(me) {
	const profileSection = document.createElement('section');
	profileSection.className = 'menu';
	profileSection.dataset.section = 'profile';

	createTitle("Profile");

	if (me) {
		const menu = document.createElement('div');
		menu.className = 'menu';

		const div1 = document.createElement('div');
		div1.textContent = `Email ${me.email}`;
		const div2 = document.createElement('div');
		div2.textContent = `Age ${me.age}`;
		const div3 = document.createElement('div');
		div3.textContent = `Score ${me.score}`;
		
		menu.appendChild(div1);
		menu.appendChild(div2);
		menu.appendChild(div3);

		profileSection.appendChild(menu);
	} else {
		AjaxModule.doGet({
			callback(xhr) {
				if (!xhr.responseText) {
					alert('Unauthorized');
					main.innerHTML = '';
					createMenu();
					return;
				}

				const user = JSON.parse(xhr.responseText);
				main.innerHTML = '';
				createProfile(user);;			
			},
			path: '/me'
		});
	}

	main.appendChild(profileSection);
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
	profile: createProfile,
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