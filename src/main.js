import { elHP, changeHP, renderHP } from './plMethods.js';
import { createElem, getRandom } from './gameLogic.js';
import {
  takeHit,
  $formConrol,
  $arena,
  showResult,
  getAttack,
} from './playerLogic.js';
import { generateLogs } from './logs.js';

let player1;
let player2;

class Player {
  constructor(props) {
    this.name = props.name;
    this.img = props.img;
    this.hp = 100;
    this.player = props.player;
  }

  elHP = elHP;
  changeHP = changeHP;
  renderHP = renderHP;
}

class Game {
  start = async () => {
    const nextOne = JSON.parse(localStorage.getItem('player1'));
    const nextTwo = JSON.parse(localStorage.getItem('player2'));

    player1 = new Player({
      ...nextOne,rootSelector: 'arenas',
      player: 1,
    });

    player2 = new Player({
      ...nextTwo,
      player: 2,
    });

    createPlayer(player1);
    createPlayer(player2);
    generateLogs('start', player1, player2);
    $arena.classList = `arenas arena${getRandom(4)}`
    $arena.appendChild(createPlayer(player1));
    $arena.appendChild(createPlayer(player2));
  };
}

const game = new Game();
game.start();

function createPlayer({ player, hp, name, img }) {
  const $player = createElem('div', `player${player}`);
  const $prorgessBar = createElem('div', 'progressbar');

  const $life = createElem('div', 'life');
  const $name = createElem('div', 'name');

  $life.style.width = `${hp}%`;
  $name.innerText = name;

  $prorgessBar.appendChild($life);
  $prorgessBar.appendChild($name);

  $player.appendChild($prorgessBar);

  const $character = createElem('div', 'character');

  const $img = createElem('img');
  $img.src = img;

  $character.appendChild($img);
  $player.appendChild($character);
  return $player;
}

$formConrol.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { player1: player, player2: enemy } = await getAttack();

  takeHit(player1, player2, enemy, player);
  takeHit(player2, player1, player, enemy);
  showResult(player1, player2);
});
