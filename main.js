const $arena = document.querySelector('.arenas');
const $formConrol = document.querySelector('.control');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

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

const createElem = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
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

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    dmg: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

$formConrol.addEventListener('submit', (event) => {
  event.preventDefault();
  const enemy = enemyAttack();
  const attack = {};

  for (let item of $formConrol) {
    if (item.checked && item.name === 'hit') {
      attack.dmg = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  isHit(player1, enemy, attack);
  isHit(player2, attack, enemy);

  if (player1.hp === 0 || player2.hp === 0) {
    $formConrol.style = 'display: none';
    const title = 
    player1.hp === 0
    ? player2.hp === 0
    ? playerWin()
    : playerWin(player2.name)
    : playerWin(player1.name);
    $arena.appendChild(title);
    $arena.appendChild(createReloadButton());
  }
});

function isHit(playerDef, attacker, defender) {
  if (attacker.hit !== defender.defence) {
    playerDef.changeHP(attacker.dmg);
    playerDef.renderHP();
  }
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function changeHP(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

const playerWin = (name) => {
  const $winTitle = createElem('div', 'loseTitle');
  if (name) {
    $winTitle.innerText = `${name} wins`;
  } else {
    $winTitle.innerText = 'Draw';
  }

  return $winTitle;
};

function createReloadButton() {
  const $reloadWrap = createElem('div', 'reloadWrap');
  const $reloadButton = createElem('button', 'button');
  $reloadButton.innerText = 'Reload';
  $reloadButton.addEventListener('click', () => window.location.reload());
  $reloadWrap.appendChild($reloadButton);
  return $reloadWrap;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
