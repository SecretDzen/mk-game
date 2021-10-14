const player1 = {
  name: "KITANA",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["Glaive"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

const player2 = {
  name: "SCORPION",
  hp: 90,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Longsword"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

const createPlayer = (player, object) => {
  const $player = document.createElement("div");
  $player.classList.add(`${player}`);

  const $prorgessBar = document.createElement("div");
  $prorgessBar.classList.add("progressbar");

  const $life = document.createElement("div");
  const $name = document.createElement("div");
  $life.classList.add("life");
  $name.classList.add("name");

  $life.style.width = '100%';
  $life.innerText = `${object.hp}`;
  $name.innerText = `${object.name}`;

  $prorgessBar.appendChild($life);
  $prorgessBar.appendChild($name);

  $player.appendChild($prorgessBar);

  const $character = document.createElement("div");
  $character.classList.add("character");

  const $img = document.createElement("img");
  $img.src = `${object.img}`;

  $character.appendChild($img);

  $player.appendChild($character);

  const $arena = document.querySelector(".arenas");
  $arena.appendChild($player);
};

createPlayer("player1", player1);
createPlayer("player2", player2);
