let randomNumber;
let lives;
let guessList = [];

function initGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  lives = 7;
  guessList = [];

  document.querySelector(".count").textContent = lives;
  document.getElementById("popup").textContent = "";
  document.getElementById("guessList").textContent = "None";
  document.querySelector(".user-input").value = "";
}

function makeGuess() {
  const input = document.querySelector(".user-input");
  const guess = parseInt(input.value);

  if (!guess || guess < 1 || guess > 100) {
    document.getElementById("popup").textContent = "⛔ Enter a valid number between 1 and 100.";
    return;
  }

  if (guessList.includes(guess)) {
    document.getElementById("popup").textContent = "⚠️ You already guessed that number!";
    return;
  }

  guessList.push(guess);
  document.getElementById("guessList").textContent = guessList.join(", ");

  if (guess === randomNumber) {
    document.getElementById("popup").textContent = `🎉 Correct! The number was ${randomNumber}.`;
    disableInput();
  } else {
    lives--;
    document.querySelector(".count").textContent = lives;

    if (lives === 0) {
      document.getElementById("popup").textContent = `💥 Game Over! The number was ${randomNumber}.`;
      disableInput();
    } else {
      if (guess < randomNumber) {
        document.getElementById("popup").textContent = "📈 Too low!";
      } else {
        document.getElementById("popup").textContent = "📉 Too high!";
      }
    }
  }

  input.value = "";
}

function disableInput() {
  document.querySelector(".user-input").disabled = true;
}

function resetGame() {
  document.querySelector(".user-input").disabled = false;
  initGame();
}

initGame();
