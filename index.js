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
  return prompt("Rock, Paper or Scissor ?");
}
