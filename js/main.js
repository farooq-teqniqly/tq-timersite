import { Timer } from "./timer.js";

const display = document.getElementById("timerDisplay");

const buttons = {
  pauseButton: document.getElementById("pauseButton"),
  resetButton: document.getElementById("resetButton"),
  startButton: document.getElementById("startButton"),
};

const inputs = {
  hoursInput: document.getElementById("hoursInput"),
  minutesInput: document.getElementById("minutesInput"),
  secondsInput: document.getElementById("secondsInput"),
};

const timer = new Timer({ display, buttons, inputs });

buttons.startButton.addEventListener("click", () => {
  if (!timer.interval) {
    if (timer.remainingTime === timer.originalDuration) {
      timer.setInitialDuration();
    }
    timer.start();
  }

  if (timer.remainingTime === timer.originalDuration) {
    timer.setInitialDuration();
  }
});

buttons.pauseButton.addEventListener("click", () => timer.pause());
buttons.resetButton.addEventListener("click", () => timer.reset());

timer.updateDisplay();
