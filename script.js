// Generate a random number between 1 and 50
const randomNum = Math.floor(Math.random() * 50) + 1;
let guessCount = 6;

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Trigger the submit button click
    const submitButton = document.getElementById("submitButton");
    submitButton.click();
  }
});

function verifyNumber() {
  let userInput = document.getElementById("userInput").value.trim();
  let errorMessage = document.getElementById("errorMessage");
  let suggestion = document.getElementById("suggestion");
  let result = document.getElementById("result");
  let guessCountalert = document.getElementById("guessCountalert");

  // Clear previous messages
  errorMessage.classList.add("hidden");
  suggestion.textContent = "";
  result.textContent = "";
  guessCountalert.textContent = "";

  // Check if input is empty
  if (!userInput) {
    // Show error message with animation
    errorMessage.textContent = "Enter a guess!";
    errorMessage.classList.remove("hidden");
    errorMessage.classList.add("shake");

    // Remove animation class after it completes
    setTimeout(() => {
      errorMessage.classList.remove("shake");
    }, 300);
    return; // Stop further execution
  }

  const apUserInput = parseInt(userInput);

  // Validate if the input is not a number or out of range
  if (isNaN(apUserInput) || apUserInput < 1 || apUserInput > 50) {
    errorMessage.textContent = "Please enter a number between 1 and 50!";
    errorMessage.classList.remove("hidden");
    return;
  }

  // Decrease the guess count
  guessCount--;

  // Check if the guess is correct
  if (apUserInput === randomNum) {
    result.textContent = "🎉 You win!!";
    result.style.color = "green";

    suggestion.textContent = "Reloading in 3 seconds...";
    suggestion.style.color = "green";

    let countdown = 3;
    const interval = setInterval(() => {
      suggestion.textContent = `Reloading in ${countdown} seconds...`;
      countdown--;

      if (countdown < 0) {
        clearInterval(interval);
        location.reload(); // Reload the page when countdown reaches 0
      }
    }, 1000);

  } else {
    // Provide hints for incorrect guesses
    if (apUserInput < randomNum) {
      suggestion.textContent = "Guess Higher";
    } else {
      suggestion.textContent = "Guess Lower";
    }

    // Update the guess count or end the game
    if (guessCount > 0) {
      guessCountalert.textContent = `Only ${guessCount} chances remaining.`;
      guessCountalert.style.color = "red";
    } else {
      result.textContent = "You lost!";
      result.style.color = "red";

      suggestion.textContent = "Reloading in 3 seconds...";
      suggestion.style.color = "red";

      document.getElementById("userInput").disabled = true;

      let countdown = 3;
      const interval = setInterval(() => {
        suggestion.textContent = `Reloading in ${countdown} seconds...`;
        countdown--;

        if (countdown < 0) {
          clearInterval(interval);
          location.reload(); // Reload the page when countdown reaches 0
        }
      }, 1000);
    }
  }
  document.getElementById("userInput").value = '';
}
