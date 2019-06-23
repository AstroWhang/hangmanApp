import Home from './home.js';
import End from './end.js';
import Board from './board.js';
import {sound} from './../data/sound.js';


const Game = (() => {
	
	const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	const words = ['apple', 'banana', 'cherry', 'elephant', 'dog'];
	let chosenWord;
	let guessingWord;
	let lives;
	let guesses;

	//cache the dom
	const $hangman = document.querySelector('.hangman');

	const init = () => {
		
		// 1. choose a word
		chosenWord = chooseWord();

		// 2. build out our guessing word to render
		guessingWord = Array(chosenWord.length).fill('_')
		console.log(chosenWord);
		console.log(guessingWord)
		guesses = [];
		lives = 7;

		// show initial screen or page
		showInitPage();
		listeners();
		Board.init();
	}

	const listeners = () => {

		$hangman.addEventListener('click', (event) => {
			if (event.target.matches('.hangman__letter')) {
				sound.click.play();
				check(event.target.innerHTML)
			}
			if (event.target.matches('.hangman__trigger')) {
				sound.click.play();
				Home.init();
			}
		})
	}

	const isAlreadyTaken = (letter) => {
		return guesses.includes(letter)
	}

	const check = (guess) => {

		if (isAlreadyTaken(guess)) return;
		guesses.push(guess)

		// check if the guessed letter exist in the chosenWord
		if (chosenWord.includes(guess)) {
			// update the guessing word

			updateGuessingWord(guess);
			console.log(guessingWord);

		} else {
			lives--;
			// render the board accordingly

			Board.setLives(lives)


		}
		render();
		// check if the game is over
		isGameOver();
	}
	
	const hasWon = () => guessingWord.join('') === chosenWord;
	const hasLost = () => lives <= 0;

	const isGameOver = () => {
		// if won, then alert win
		if (hasWon()) {
			sound.win.play();
			End.setState({
				chosenWord: chosenWord,
				result: "win"
			})
		}

		// if lost, then alert lose
		if (hasLost()) {
			sound.lose.play();
			End.setState({
				chosenWord, //es6 same as chosenWord: chosenWord
				result: 'lose'
			})
		}
	}

	const render = () => {
		document.querySelector('.hangman__lives').innerHTML = lives;
		document.querySelector('.hangman__word').innerHTML = guessingWord.join('');
		document.querySelector('.hangman__letters').innerHTML = createLetters();
	}

	const updateGuessingWord = (letter) => {
		chosenWord.split('').forEach((elem, index) => {
			if (elem === letter) {
				guessingWord[index] = elem;
			}
		})
	}


	const showInitPage = () => {
		let markup = `
			<p class="hangman__stats">Lives:
				<span class="hangman__lives">${lives}</span>
			</p>
			<h1 class="hangman__title">Hangman</h1>
			<canvas class="hangman__board" height="155px"></canvas>
			<div class="hangman__word">${guessingWord.join("")}</div>
			<p class="hangman__instructions">Pick a letter below to guess the whole word.</p>
			<ul class="hangman__letters">
				${createLetters()}
			</ul>
			<button class="button hangman__trigger">Main Menu</button>
		`
		$hangman.innerHTML = markup;
	}

	const createLetters = () => {
		let markup = ``;
		letters.forEach((letter) => {
			const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
			markup += `
				<li class="hangman__letter ${isActive}">${letter}</li>
			`
		})
		return markup;
	}

	const chooseWord = () => {
		let randNum = Math.floor(Math.random() * words.length);
		return words[randNum]
	}

	// 1. choose a random word chosenWord = chooseWord(); //ex. apple

	// 2. apple chosenWord
	//_ _ _ _ _ guessingWord

	return {
		init,
	}

})();

export default Game