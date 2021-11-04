import { createElem, createReloadButton } from './gameLogic.js';
import { generateLogs } from './logs.js';

export const $arena = document.querySelector('.arenas');
export const $formConrol = document.querySelector('.control');

async function post({ hit, defence }) {
  const thisPost = await fetch(
    'http://reactmarathon-api.herokuapp.com/api/mk/player/fight',
    {
      method: 'POST',
      body: JSON.stringify({
        hit,
        defence,
      }),
    }
  ).then((res) => res.json());
  return thisPost;
}

export function getAttack() {
  const attack = {};

  for (let item of $formConrol) {
    if (item.checked && item.name === 'hit') {
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  return post(attack);
}

export function takeHit(playerDef, playerAtk, attacker, defender) {
  if (attacker.hit !== defender.defence) {
    playerDef.changeHP(attacker.value);
    playerDef.renderHP();
    generateLogs('hit', playerDef, playerAtk, attacker);
  } else {
    generateLogs('defence', playerDef, playerAtk, attacker);
  }
}

export function showResult(player1, player2) {
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

export const playerWin = (winner, loser) => {
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
