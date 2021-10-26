import {elHP, changeHP, renderHP} from './plMethods.js';
import { createElem } from './gameLogic.js';
import { enemyAttack, playerAttack, takeHit, $formConrol, $arena, showResult } from './playerLogic.js';
import { generateLogs } from './logs.js';

const player1 = {
  name: 'KITANA',
  player: 1,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Glaive'],
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  name: 'SCORPION',
  player: 2,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Longsword'],
  changeHP,
  elHP,
  renderHP,
};

const createPlayer = (object) => {
  const $player = createElem('div', `player${object.player}`);
  const $prorgessBar = createElem('div', 'progressbar');

  const $life = createElem('div', 'life');
  const $name = createElem('div', 'name');

  $life.style.width = `${object.hp}%`;
  $name.innerText = object.name;

  $prorgessBar.appendChild($life);
  $prorgessBar.appendChild($name);

  $player.appendChild($prorgessBar);

  const $character = createElem('div', 'character');

  const $img = createElem('img');
  $img.src = `${object.img}`;

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
