import Game from './game.js'
import How from './how.js'
import { sound }from './../data/sound.js'

const Home = (() => {
	
	// cache the dom
	// using the $ to show that it's a dom variable same as saying hangmanEl
	const $hangman = document.querySelector('.hangman');

	const init = () => {
		render();
		listeners();
	}

	const listeners = () => {
		document.querySelector('.start').addEventListener('click', () => {
			Game.init();
			sound.click.play();
		})

		document.querySelector('.instructions').addEventListener('click', () => {
			How.init();
			sound.click.play();
		})
	}

	const render = () => {
		let markup = '';
		markup += `
			<h1 class="hangman__title">Hangman</h1>
			<button class="button start">New Game</button>
			<button class="button instructions">Instructions</button>
		`
		$hangman.innerHTML = markup;
	}

	return {
		init,
	}
})();

export default Home;