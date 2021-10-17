const $arena = document.querySelector('.arenas');

const player1 = {
  name: 'KITANA',
  player: 1,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Glaive'],
  attack: function () {
    console.log(this.name + ' Fight...');
  },
};

const player2 = {
  name: 'SCORPION',
  player: 2,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Longsword'],
  attack: function () {
    console.log(this.name + ' Fight...');
  },
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

const $randButton = document.querySelector('.button');
$randButton.addEventListener('click', () => {
  changeHP(player1);
  changeHP(player2);
  if (player1.hp <= 0 && player2.hp > 0) {
    $arena.appendChild(playerWin(player2.name));
  }
  if (player2.hp <= 0 && player1.hp > 0) {
    $arena.appendChild(playerWin(player1.name));
  }
  if (player2.hp <= 0 && player1.hp <= 0) {
    $arena.appendChild(playersDraw());
  }
});

const changeHP = (object) => {
  const $playerLife = document.querySelector(`.player${object.player} .life`);
  object.hp -= Math.ceil(Math.random() * 20);
  if (object.hp <= 0) {
    $playerLife.style.width = 0;
    $randButton.style = 'display: none';
  } else {
    $playerLife.style.width = `${object.hp}%`;
  }
}

const playerWin = (name) => {
  const $winTitle = createElem('div', 'loseTitle');
  $winTitle.innerText = `${name} wins`;
  return $winTitle;
}

const playersDraw = () => {
  const $drawTitle = createElem('div', 'loseTitle');
  $drawTitle.innerText = 'Draw';
  return $drawTitle;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

