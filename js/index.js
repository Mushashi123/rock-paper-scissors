// || Constants
const ROCK = "rock";
const PAPER = "paper";
const SCISSOR = "scissor";

// || DOM element node selection
const computer = document.querySelector(".computer");

// || Other Variables
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

computerThinking();
