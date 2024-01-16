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

// || FLICKERING HAND ANIMATION
// note : the order of array item matters:
// rock --> index[0]
// paper --> index[1]
// scissor--> index[2]
const images = [
  "/assets/images/hands/rock.svg",
  "/assets/images/hands/paper.svg",
  "/assets/images/hands/scissor.svg",
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

const intervalId = computerThinking();

// || USER PICKS AN OPTION

const weapons = document.querySelector(".weapons");

weapons.addEventListener("click", (e) => {
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
});

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
