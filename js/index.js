// || Constants
const ROCK = "rock";
const PAPER = "paper";
const SCISSOR = "scissor";
const USER = "user";
const COMPUTER = "computer";

// || DOM element node selection
const computer = document.querySelector(".computer");
const gameTop = document.querySelector(".game__top");
const gameCenter = document.querySelector(".game__center");
const gameBottom = document.querySelector(".game__bottom");
const weapons = document.querySelector(".weapons");

// || FLICKERING HAND ANIMATION
// note : the order of array item matters:
// rock --> index[0]
// paper --> index[1]
// scissor--> index[2]
const images = [
  "../assets/images/hands/rock.svg",
  "../assets/images/hands/paper.svg",
  "../assets/images/hands/scissor.svg",
];

const weaponOptionImages = [
  "../assets/images/options/rock.svg",
  "../assets/images/options/paper.svg",
  "../assets/images/options/scissor.svg",
];

//preload images for flickering animation
const computerImgs = images.map((imageLink, index) => {
  const computerImg = new Image();
  computerImg.src = imageLink;

  switch (index) {
    case 0:
      computerImg.alt = ROCK;
      computerImg.dataset.weapon = ROCK;
      break;
    case 1:
      computerImg.alt = PAPER;
      computerImg.dataset.weapon = PAPER;
      break;
    case 2:
      computerImg.alt = SCISSOR;
      computerImg.dataset.weapon = SCISSOR;
      break;
    default:
      computerImg.alt = "Hand image";
  }

  computerImg.classList.add("hand-img");
  computerImg.classList.add("computer__img");
  return computerImg;
});

function startGame() {
  weapons.addEventListener("click", (e) => evaluateGame(e, intervalId));
}

// flickering image animation
function computerThinking() {
  // change images on every interval with random images
  return setInterval(() => {
    // random number between 0 - 2
    const random = Math.trunc(Math.random() * 3);

    //remove all the child nodes of computer
    while (computer.firstChild) {
      computer.removeChild(computer.firstChild);
    }

    //add random image
    computer.appendChild(computerImgs[random]);
  }, 50);
}

function evaluateGame(e, intervalId) {
  // dont evaluate the game if user clicked elsewhere
  if (!e.target.dataset.weapon) {
    return;
  }

  //get computer's choice
  clearInterval(intervalId);
  const computersChoice = computer.firstChild.dataset.weapon;

  //get users's choice
  const usersChoice = e.target.dataset.weapon;

  // evaluate winner
  let winner = "draw";

  //if user wins
  if (
    (usersChoice === ROCK && computersChoice === SCISSOR) ||
    (usersChoice === PAPER && computersChoice === ROCK) ||
    (usersChoice === SCISSOR && computersChoice === PAPER)
  ) {
    winner = USER;
  }

  // if computer wins
  if (
    (computersChoice === ROCK && usersChoice === SCISSOR) ||
    (computersChoice === PAPER && usersChoice === ROCK) ||
    (computersChoice === SCISSOR && usersChoice === PAPER)
  ) {
    winner = COMPUTER;
  }

  // depending upon winner change the UI
  switch (winner) {
    case USER:
      changeUI(winner, usersChoice);
      break;
    case COMPUTER:
      changeUI(winner, usersChoice);
      break;
    case "draw":
      changeUI(winner, usersChoice);
      break;
    default:
      console.log("Error occured");
      return;
  }
}

function changeUI(winner, usersChoice) {
  // || change .game__top
  // - the flex shrink for game_top during animation is running is 0 cause, if it shrinks it moves the container and entire items moves
  // - but once the animation stops, it shall be allowed to shrink to make sure .gamt__top and .gameBottom are equally shrinked
  gameTop.classList.add("game__top--shrink");

  //|| change .game__center section

  let statsMessage = ``;

  switch (winner) {
    case USER:
      statsMessage = `YOU WIN!`;
      break;
    case COMPUTER:
      statsMessage = `YOU LOSE`;
      break;
    case "draw":
      statsMessage = `IT'S A DRAW`;
      break;
  }

  while (gameCenter.firstChild) {
    gameCenter.removeChild(gameCenter.firstChild);
  }

  gameCenter.appendChild(createStatsComponent(statsMessage));

  // || change the .user section

  while (gameBottom.firstChild) {
    gameBottom.removeChild(gameBottom.firstChild);
  }
  gameBottom.appendChild(createUserComponent(usersChoice));
}

function createStatsComponent(statsMessage = "") {
  const stats = document.createElement("div");
  const statsInfo = document.createElement("h1");
  const playAgainBtn = document.createElement("button");

  stats.classList.add("stats");
  statsInfo.classList.add("stats__info");
  statsInfo.textContent = statsMessage;
  playAgainBtn.type = "button";
  playAgainBtn.classList.add("stats__btn");
  playAgainBtn.classList.add("btn");
  playAgainBtn.classList.add("btn--primary");
  playAgainBtn.id = "play-again-btn";
  playAgainBtn.textContent = "PLAY AGAIN";
  playAgainBtn.addEventListener("click", restartGame);

  stats.appendChild(statsInfo);
  stats.appendChild(playAgainBtn);

  return stats;
}

function createUserComponent(usersChoice) {
  // to map to image links that is stored in global array images[]
  let index = usersChoice === ROCK ? 0 : usersChoice === PAPER ? 1 : 2;
  const user = document.createElement("div");
  const userImg = document.createElement("img");

  user.classList.add("user");
  userImg.src = images[index];
  userImg.alt = index === 0 ? ROCK : index === 1 ? PAPER : SCISSOR;
  userImg.classList.add("user__img");
  userImg.classList.add("hand-img");

  user.appendChild(userImg);
  return user;
}

function restartGame(e) {
  //reset the UI
  // || .game__center
  while (gameCenter.firstChild) {
    gameCenter.removeChild(gameCenter.firstChild);
  }

  gameCenter.appendChild(createGameHeadingComponent());

  // || .game__bottom

  while (gameBottom.firstChild) {
    gameBottom.removeChild(gameBottom.firstChild);
  }

  gameBottom.appendChild(createOptionsComponent());

  //replay the game
  intervalId = computerThinking();
}

function createOptionsComponent() {
  const options = document.createElement("div");
  const optionsHeading = document.createElement("h3");
  const weapons = document.createElement("div");
  const weaponItemRock = document.createElement("button");
  const weaponItemPaper = document.createElement("button");
  const weaponItemScissor = document.createElement("button");
  const weaponImgRock = document.createElement("img");
  const weaponImgPaper = document.createElement("img");
  const weaponImgScissor = document.createElement("img");
  // note : order of items maatter
  const weaponItems = [weaponItemRock, weaponItemPaper, weaponItemScissor];
  const weaponImages = [weaponImgRock, weaponImgPaper, weaponImgScissor];

  options.classList.add("options");
  optionsHeading.classList.add("options__heading");
  optionsHeading.textContent = `PICK AN OPTION:`;
  weapons.classList.add("weapons");
  weaponItems.forEach((weaponItem, index) => {
    weaponItem.type = "button";
    weaponItem.classList.add("weapon__items");
  });
  weaponImages.forEach((weaponImage, index) => {
    switch (index) {
      case 0:
        weaponImage.src = weaponOptionImages[0];
        weaponImage.alt = ROCK;
        weaponImage.dataset.weapon = ROCK;
        break;
      case 1:
        weaponImage.src = weaponOptionImages[1];
        weaponImage.alt = PAPER;
        weaponImage.dataset.weapon = PAPER;
        break;
      case 2:
        weaponImage.src = weaponOptionImages[2];
        weaponImage.alt = SCISSOR;
        weaponImage.dataset.weapon = SCISSOR;
        break;
    }

    weaponImage.classList.add("weapons__img");
  });

  // append em
  weaponItems.forEach((weaponItem, index) => {
    weaponItem.appendChild(weaponImages[index]);
    weapons.appendChild(weaponItem);
  });
  weapons.addEventListener("click", (e) => evaluateGame(e, intervalId));

  options.appendChild(optionsHeading);
  options.appendChild(weapons);

  return options;
}

function createGameHeadingComponent() {
  const gameHeading = document.createElement("h1");
  gameHeading.classList.add("game__heading");
  gameHeading.textContent = `LET'S PLAY`;
  return gameHeading;
}

let intervalId = computerThinking();

startGame();
