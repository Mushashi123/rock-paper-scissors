function getComputersChoice() {
  // returns random number between 0 - 3
  let choice = Math.trunc(Math.random() * 3);

  //   each number between 0 - 3 is mapped with rock paper and scissor
  //   the random number determines which options gets returned
  switch (choice) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissor";
  }
}

function getUsersChoice() {
  let usersChoice = prompt("Rock, Paper or Scissor ?");
  let rockRegex = /rock/i;
  let paperRegex = /paper/i;
  let scissorRegex = /scissor/i;

  //if users closes promt
  if (!usersChoice) {
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
    alert("Invalid Input");
    // tell user to enter value once again
    usersChoice = getUsersChoice();
  }

  return usersChoice;
}
