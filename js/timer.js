import { formatTime, toggleClass } from "./utils.js";
import { TimerUIContext, StoppedState, RunningState, PausedState } from "./state.js";

export class Timer {
  constructor({ display, buttons, inputs }) {
    this.display = display;
    this.buttons = buttons;
    this.inputs = inputs;

    this.originalDuration = 30;
    this.remainingTime = 30;
    this.interval = null;

    this.ui = new TimerUIContext({ buttons, inputs });
    this.ui.transitionTo(StoppedState);
  }

  setInitialDuration() {
    const { hoursInput, minutesInput, secondsInput } = this.inputs;
    const hours = Math.min(parseInt(hoursInput.value, 10) || 0, 5);
    const minutes = Math.min(parseInt(minutesInput.value, 10) || 0, 59);
    const seconds = Math.min(parseInt(secondsInput.value, 10) || 0, 59);
    let total = hours * 3600 + minutes * 60 + seconds;

    if (total === 0) {
      total = 30;
    }

    this.originalDuration = Math.min(total, 5 * 3600);
    this.remainingTime = this.originalDuration;
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.textContent = formatTime(this.remainingTime);
  }

  start() {
    if (this.remainingTime <= 0) {
      toggleClass(this.display, "text-secondary");
      this.setInitialDuration();
    }

    this.interval = setInterval(() => {
      this.remainingTime--;
      this.updateDisplay();

      if (this.remainingTime <= 0) {
        clearInterval(this.interval);
        this.interval = null;
        toggleClass(this.display, "text-secondary");
        this.ui.transitionTo(StoppedState);
      }
    }, 1000);

    this.ui.transitionTo(RunningState);
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
    this.ui.transitionTo(PausedState);
  }

  reset() {
    clearInterval(this.interval);
    this.interval = null;
    this.remainingTime = this.originalDuration;
    this.updateDisplay();
    this.ui.transitionTo(StoppedState);
  }
}
