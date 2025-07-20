import { hideElement, showElement, enableElement, disableElement } from "./utils.js";

export class TimerState {
  constructor(context) {
    if (!context) {
      throw new TypeError("Context is required.");
    }

    if (typeof context !== "object") {
      throw new TypeError("Context must be an object.");
    }

    if (!context.buttons || typeof context.buttons !== "object") {
      throw new TypeError("Context must have a buttons object.");
    }

    if (!context.inputs || typeof context.inputs !== "object") {
      throw new TypeError("Context must have a inputs object.");
    }

    if (typeof context.transitionTo !== "function") {
      throw new TypeError("Context must have a transitionTo function.");
    }

    this.buttons = context.buttons;
    this.inputs = context.inputs;
  }

  enter() {
    const { startButton, pauseButton, resetButton } = this.buttons;
    const { hoursInput, minutesInput, secondsInput } = this.inputs;

    if (!(startButton instanceof Element)) {
      throw new TypeError("startButton must be a DOM element.");
    }

    if (!(pauseButton instanceof Element)) {
      throw new TypeError("pauseButton must be a DOM element.");
    }

    if (!(resetButton instanceof Element)) {
      throw new TypeError("resetButton must be a DOM element.");
    }

    if (!(hoursInput instanceof Element)) {
      throw new TypeError("hoursInput must be a DOM element.");
    }

    if (!(minutesInput instanceof Element)) {
      throw new TypeError("minutesInput must be a DOM element.");
    }

    if (!(secondsInput instanceof Element)) {
      throw new TypeError("secondsInput must be a DOM element.");
    }
  }
}

export class StoppedState extends TimerState {
  constructor(context) {
    super(context);
  }

  enter() {
    super.enter();

    showElement(this.buttons.startButton);
    hideElement(this.buttons.pauseButton);
    hideElement(this.buttons.resetButton);

    enableElement(this.inputs.hoursInput);
    enableElement(this.inputs.minutesInput);
    enableElement(this.inputs.secondsInput);
  }
}

export class RunningState extends TimerState {
  constructor(context) {
    super(context);
  }

  enter() {
    super.enter();

    hideElement(this.buttons.startButton);
    showElement(this.buttons.pauseButton);
    showElement(this.buttons.resetButton);

    disableElement(this.inputs.hoursInput);
    disableElement(this.inputs.minutesInput);
    disableElement(this.inputs.secondsInput);
  }
}

export class PausedState extends TimerState {
  constructor(context) {
    super(context);
  }

  enter() {
    super.enter();

    showElement(this.buttons.startButton);
    hideElement(this.buttons.pauseButton);
    showElement(this.buttons.resetButton);

    disableElement(this.inputs.hoursInput);
    disableElement(this.inputs.minutesInput);
    disableElement(this.inputs.secondsInput);
  }
}

export class TimerUIContext {
  constructor({ buttons, inputs }) {
    this.buttons = buttons;
    this.inputs = inputs;
    this.state = null;
  }

  transitionTo(StateClass) {
    this.state = new StateClass(this);
    this.state.enter();
  }
}
