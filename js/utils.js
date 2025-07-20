export function showElement(element) {
  if (!(element instanceof Element)) {
    throw new TypeError("Parameter must be a DOM element.");
  }

  element.classList.remove("d-none");
}

export function hideElement(element) {
  if (!(element instanceof Element)) {
    throw new TypeError("Parameter must be a DOM element.");
  }

  element.classList.add("d-none");
}

export function enableElement(element) {
  if (!(element instanceof Element)) {
    throw new TypeError("Parameter must be a DOM element.");
  }

  element.disabled = false;
}

export function disableElement(element) {
  if (!(element instanceof Element)) {
    throw new TypeError("Parameter must be a DOM element.");
  }

  element.disabled = true;
}

export function toggleClass(element, className) {
  if (!(element instanceof Element)) {
    throw new TypeError("Parameter must be a DOM element.");
  }

  if (typeof className !== "string") {
    throw new TypeError("Second argument must be a string.");
  }

  element.classList.toggle(className);
}

export function formatTime(seconds) {
  if (typeof seconds !== "number") {
    throw new TypeError("Seconds must be a number.");
  }

  if (!Number.isFinite(seconds)) {
    throw new TypeError("Seconds must be a finite number.");
  }

  if (!Number.isInteger(seconds)) {
    throw new TypeError("Seconds must be an integer.");
  }

  if (seconds < 0) {
    throw new RangeError("Seconds cannot be less than zero.");
  }

  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;

  const pad = (num) => String(num).padStart(2, "0");

  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const displaySeconds = seconds % SECONDS_IN_MINUTE;

  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(displaySeconds);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
