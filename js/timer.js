import { formatTime, toggleClass } from "./utils.js";
import { TimerUIContext, StoppedState, RunningState, PausedState } from "./state.js";
import { constants } from "./constants.js";

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

    const parseAndClamp = (value, max) => Math.min(parseInt(value, 10) || 0, max);

    const { SECONDS_IN_HOUR, SECONDS_IN_MINUTE, MAX_HOURS, INITIAL_DURATION } = constants;

    const hours = parseAndClamp(hoursInput.value, MAX_HOURS);
    const minutes = parseAndClamp(minutesInput.value, 59);
    const seconds = parseAndClamp(secondsInput.value, 59);

    let total = hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;

    if (total === 0) {
      total = INITIAL_DURATION;
    }

    this.originalDuration = Math.min(total, MAX_HOURS * SECONDS_IN_HOUR);
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
    }, constants.TIMER_INTERVAL);

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
