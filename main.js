import {elHP, changeHP, renderHP} from './plMethods.js';
import { createElem } from './gameLogic.js';
import { enemyAttack, playerAttack, takeHit, $formConrol, $arena, showResult } from './playerLogic.js';
import { generateLogs } from './logs.js';

class Player {
  constructor(props) {
    this.name = props.name.toUpperCase();
    this.img = `http://reactmarathon-api.herokuapp.com/assets/${props.name.toLowerCase()}.gif`;
    this.hp = 100;
    this.player = props.player;
    this.weapon = props.weapon;
  }

  elHP = elHP;
  changeHP = changeHP;
  renderHP = renderHP;
}

const player1 = new Player({
  name: 'KITANA',
  player: 1,
  weapon: ['Glaive'],
});

const player2 = new Player({
  name: 'SCORPION',
  player: 2,
  weapon: ['Longsword'],
  changeHP,
  elHP,
  renderHP,
});

const createPlayer = ({player, hp, name, img}) => {
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
};

generateLogs('start', player1, player2);

$formConrol.addEventListener('submit', (event) => {
  event.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  takeHit(player1, player2, enemy, player);
  takeHit(player2, player1, player, enemy);
  showResult(player1, player2);
});

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
