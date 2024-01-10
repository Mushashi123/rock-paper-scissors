const USER = "user";
const COMPUTER = "computer";

//for "rock","paper" and "scissor"case insensitiveness
let rockRegex = /rock/i;
let paperRegex = /paper/i;
let scissorRegex = /scissor/i;

function getComputersChoice() {
  const weapons = ["rock", "paper", "scissor"];
  // returns random number between 0 - 3
  let choice = Math.trunc(Math.random() * 3);

  //   each number between 0 - 3 is mapped with rock, paper and scissor
  //   the random number determines which options gets returned
  // no break is used cause return exits the function itself
  return weapons[choice];
}

function getUsersChoice() {
  let usersChoice = prompt("Rock, Paper or Scissor ?");

  //if users closes promt or enters nothing
  if (!usersChoice) {
    alert("Please enter your choice");
    // tell user to enter value once again
    usersChoice = getUsersChoice();
  }

  // if user inputs invalid input
  if (
    !(
      usersChoice.search(rockRegex) >= 0 ||
      usersChoice.search(paperRegex) >= 0 ||
      usersChoice.search(scissorRegex) >= 0
    )
  ) {
    alert("Invalid Input, Enter your choice once more");
    // tell user to enter value once again
    usersChoice = getUsersChoice();
  }

  return usersChoice;
}

function displayStats(usersChoice, computersChoice, winner) {
  let displayMessage = `
  your choice: ${usersChoice}
  computer's choice: ${computersChoice}
  ${
    winner === USER
      ? "You Won....!!!"
      : winner === COMPUTER
      ? "You lost :("
      : "Draw....!!!  Enter value again"
  }
  `;
  alert(displayMessage);
}

function displayWinner(winner, usersPoint, computersPoint) {
  let displayMessage = null;

  if (winner === USER) {
    displayMessage = `
   You won the best of 5 match...!!! :)

   Your Points: ${usersPoint}
   Computer's Points: ${computersPoint}
   `;
  } else if (winner === COMPUTER) {
    displayMessage = `
   Computer won the best of 5 match...!!! :(

   Your Points: ${usersPoint}
   Computer's Points: ${computersPoint}

   ..........BETTER LUCK NEXT TIME...............
   `;
  }

  alert(displayMessage);
}

function match() {
  let winner = null;
  //get both user and computers choice
  let computersChoice = getComputersChoice();
  let usersChoice = getUsersChoice();

  //if user wins
  if (
    (usersChoice.search(rockRegex) >= 0 &&
      computersChoice.search(scissorRegex) >= 0) ||
    (usersChoice.search(paperRegex) >= 0 &&
      computersChoice.search(rockRegex) >= 0) ||
    (usersChoice.search(scissorRegex) >= 0 &&
      computersChoice.search(paperRegex) >= 0)
  ) {
    winner = USER;
    displayStats(usersChoice, computersChoice, winner);
    return winner;
  }

  //is computer wins
  if (
    (computersChoice.search(rockRegex) >= 0 &&
      usersChoice.search(scissorRegex) >= 0) ||
    (computersChoice.search(paperRegex) >= 0 &&
      usersChoice.search(rockRegex) >= 0) ||
    (computersChoice.search(scissorRegex) >= 0 &&
      usersChoice.search(paperRegex) >= 0)
  ) {
    winner = COMPUTER;
    displayStats(usersChoice, computersChoice, winner);
    return winner;
  }

  // if Draw happens
  displayStats(usersChoice, computersChoice, winner);
  // replay the match
  winner = match();
  return winner;
}

function bestOfFive() {
  let usersPoint;
  let computersPoint;
  usersPoint = computersPoint = 0;
  let winner = null;

  // play match endlessly
  while (true) {
    winner = match();
    // for each match winner's point is increased by 1
    if (winner === USER) usersPoint++;
    else if (winner === COMPUTER) computersPoint++;

    // if any of the player wins 3 times or more end the game

    // if user wins
    if (usersPoint >= 3) {
      winner = USER;
      displayWinner(winner, usersPoint, computersPoint);
      break;
    }
    // if computer wins
    else if (computersPoint >= 3) {
      winner = COMPUTER;
      displayWinner(winner, usersPoint, computersPoint);
      break;
    }
  }
}

bestOfFive();
