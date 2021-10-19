const $arena = document.querySelector('.arenas');
const $randButton = document.querySelector('.button');

const player1 = {
  name: 'KITANA',
  player: 1,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Glaive'],
  changeHP: function (num) {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  },
  elHP: function () {
    return document.querySelector(`.player${this.player} .life`);
  },
  renderHP: function ($elem) {
    $elem.style.width = `${this.hp}%`;
  }
};

const player2 = {
  name: 'SCORPION',
  player: 2,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Longsword'],
  changeHP: function (num) {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  },
  elHP: function () {
    return document.querySelector(`.player${this.player} .life`);
  },
  renderHP: function ($elem) {
    $elem.style.width = `${this.hp}%`;
  }
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

$randButton.addEventListener('click', () => {
  player1.changeHP(getRandom(20));
  player1.renderHP(player1.elHP());
  player2.changeHP(getRandom(20));
  player2.renderHP(player2.elHP());
  if (player1.hp === 0 || player2.hp === 0) {
    $randButton.style = 'display: none';
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
}

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

