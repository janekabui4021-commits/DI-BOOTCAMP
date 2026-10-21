// Exercise 1: Timer
const timerContainer = document.getElementById("timerContainer") || document.getElementById("container");
const clearButton = document.getElementById("clear");

if (timerContainer && clearButton) {
  let paragraphCount = 0;
  let timerIntervalId = null;

  setTimeout(() => {
    alert("Hello World");
  }, 2000);

  setTimeout(() => {
    const paragraph = document.createElement("p");
    paragraph.textContent = "Hello World";
    timerContainer.appendChild(paragraph);
  }, 2000);

  function addHelloWorldParagraph() {
    const paragraph = document.createElement("p");
    paragraph.textContent = "Hello World";
    timerContainer.appendChild(paragraph);
    paragraphCount += 1;

    if (paragraphCount >= 5) {
      clearInterval(timerIntervalId);
    }
  }

  timerIntervalId = setInterval(addHelloWorldParagraph, 2000);

  clearButton.addEventListener("click", () => {
    clearInterval(timerIntervalId);
  });
}

// Exercise 2: Move the box
const box = document.getElementById("animate");
const containerBox = document.getElementById("moveContainer") || document.getElementById("container");

if (box && containerBox) {
  let position = 0;
  let moveIntervalId = null;

  function myMove() {
    clearInterval(moveIntervalId);
    position = 0;
    box.style.left = "0px";

    moveIntervalId = setInterval(() => {
      const maxPosition = containerBox.offsetWidth - box.offsetWidth;

      if (position >= maxPosition) {
        clearInterval(moveIntervalId);
        return;
      }

      position += 1;
      box.style.left = `${position}px`;
    }, 1);
  }

  window.myMove = myMove;
}
