const $arena = document.querySelector('.arenas');
const $formConrol = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const logs = {
  start:
    'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
};

const player1 = {
  name: 'KITANA',
  player: 1,
  hp: 10,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Glaive'],
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  name: 'SCORPION',
  player: 2,
  hp: 10,
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

const enemyAttack = () => {
  const enemy = {};
  enemy.hit = ATTACK[getRandom(3) - 1];
  enemy.defence = ATTACK[getRandom(3) - 1];
  enemy.dmg = getRandom(HIT[enemy.hit]);
  return enemy;
};

const playerAttack = () => {
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
  return attack;
};

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    let title;
    $formConrol.style = 'display: none';
    if (player1.hp === player2.hp) {
      title = playerWin(0, 0);
    } else if (player1.hp > player2.hp) {
      title = playerWin(player1.name, player2.name);
    } else {
      title = playerWin(player2.name, player1.name);
    }
    $arena.appendChild(title);
    $arena.appendChild(createReloadButton());
  }
}

$formConrol.addEventListener('submit', (event) => {
  event.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  isHit(player1, player2, enemy, player);
  isHit(player2, player1, player, enemy);
  showResult();
});

function isHit(playerDef, playerAtk, attacker, defender) {
  if (attacker.hit !== defender.defence) {
    playerDef.changeHP(attacker.dmg);
    playerDef.renderHP();
    generateLogs('hit', playerDef, playerAtk, attacker);
  } else {
    generateLogs('defence', playerDef, playerAtk, attacker);
  }
}

function generateLogs(type, plDef, plAtk, attacker) {
  const time = dateGenerator();
  const len = logs[type].length;
  const text = logs[type][getRandom(len) - 1];
  const hp = `${plDef.hp}/100`;
  let el;
  switch (type) {
    case 'hit':
      const hitText = text
        .replace('[playerKick]', plAtk.name)
        .replace('[playerDefence]', plDef.name);
      const damage = attacker.dmg;
      el = `<p>${time} - ${hitText} Урон: ${damage}. Осталось: ${hp}</p>`;
      break;
    case 'defence':
      const defText = text
        .replace('[playerKick]', plAtk.name)
        .replace('[playerDefence]', plDef.name);
      el = `<p>${time} - ${defText} Осталось: ${hp}</p>`;
      break;
    case 'start':
      let startText = logs[type]
        .replace('[player1]', plDef.name)
        .replace('[player2]', plAtk.name)
        .replace('[time]', time);
      el = `<p>${startText}</p>`;
      break;
    case 'end':
      const endText = text
        .replace('[playerWins]', plAtk)
        .replace('[playerLose]', plDef);
      el = `<p>${time} - ${endText}</p>`;
      break;
    case 'draw':
      let drawText = logs[type];
      el = `<p>${time} - ${drawText}</p>`;
      break;
  }

  $chat.insertAdjacentHTML('afterbegin', el);
}

function dateGenerator() {
  const date = new Date();
  const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
  return `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;
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

const playerWin = (winner, loser) => {
  const $winTitle = createElem('div', 'loseTitle');
  if (winner) {
    generateLogs('end', loser, winner);
    $winTitle.innerText = `${winner} wins`;
  } else {
    generateLogs('draw', loser);
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

generateLogs('start', player1, player2);
