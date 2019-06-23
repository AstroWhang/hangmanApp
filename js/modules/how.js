import Home from "./home.js";
import { sound } from "../data/sound.js";


const How = (() => {

  const $hangman = document.querySelector('.hangman');


  const init = () => {
   
    render();
    listeners();
  }

  const listeners = () => {
    document.querySelector(".hangman__trigger").addEventListener('click', () => {
      sound.click.play();
      Home.init();
    })
  }

  const render = () => {
    let markup = `
    <h1 class="hangman__title">Instructions</h1>
    <ul class="how">
      <li>Alright here is how you play!</li>
      <li>When you start a new game, the game will automatically choose a word</li>
      <li>Your job is to guess that word in 7 tries</li>
    </ul>
    <button class="button hangman__trigger">Main Menu</button>
    `

    $hangman.innerHTML = markup;
  }

  return {
    init
  }

})();


export default How