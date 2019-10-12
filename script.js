// Global variables
let round = 1;
let computerScore = 0;
let playerScore = 0;
const choices = ["Rock", "Paper", "Scissors"];
const buttons = document.querySelectorAll('button');
const div = document.querySelector('.results');
const endDiv = document.querySelector('.game-end');
// Starting text
div.textContent = "Choose Your Weapon!"
// get computer's choice
function getComputerSelection() {
    let choice = Math.floor(Math.random() * choices.length);
    return choices[choice];
};
// play a round
function playRound(playerSelection, computerSelection) {
    // Prepare game text
    const playerWin = `Round: ${round} - You Win! ${playerSelection} beats ${computerSelection}`;
    const computerWin = `Round: ${round} - You Lose! ${computerSelection} beats ${playerSelection}`;
    const tie = `Round: ${round} - It's a Tie! You both chose ${playerSelection}`;
    // choose which game text to use based on winner
    if (playerSelection === "Rock") {
        switch (computerSelection) {
            case "Rock":
                return tie;
                break;
            case "Paper":
                computerScore++
                return computerWin;
                break;
            case "Scissors":
                playerScore++
                return playerWin;
                break;
        }
    } else if (playerSelection === "Paper") {
        switch (computerSelection) {
            case "Rock":
                playerScore++
                return playerWin;
                break;
            case "Paper":
                return tie;
                break;
            case "Scissors":
                computerScore++
                return computerWin;
                break;
        }
    } else if (playerSelection === "Scissors") {
        switch (computerSelection) {
            case "Rock":
                computerScore++
                return computerWin;
                break;
            case "Paper":
                playerScore++
                return playerWin;
                break;
            case "Scissors":
                return tie;
                break;
        }
    } else {
        return "There appears to be a glitch in the matrix, please choose 'Rock', 'Paper' or 'Scissors'"
    }
};
// Create reset button & reset game on click
function resetGame() {
    const reset = document.createElement('button');
    reset.id = 'reset';
    reset.textContent = 'Play again?';
    endDiv.appendChild(reset);
    reset.addEventListener('click', (e) => {
        div.textContent = "Choose Your Weapon!";
        round = 1;
        endDiv.textContent = '';
        buttons.forEach((button) => {
            button.disabled = false;
        });
    });
}
// Play round each time a weapon is chosen
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        div.textContent = `${playRound(e.target.id, getComputerSelection())}`
        round++;
        if (round > 5) {
            if (playerScore > computerScore) {
                endDiv.textContent = `Congratulations you beat the computer with a score of ${playerScore} to ${computerScore}`;
            } else if (playerScore < computerScore) {
                endDiv.textContent = `Oh no you lost! The computer beat you with a score of ${computerScore} to ${playerScore}`;
            } else {
                endDiv.textContent = "Tie game!";
            }
            buttons.forEach((button) => {
                button.disabled = true;
            });
            resetGame();
        }
    });
});
