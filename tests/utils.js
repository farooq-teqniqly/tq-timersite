const { SELECTORS } = require("./constants");

const { TIMER_DISPLAY } = SELECTORS;

const isVisible = async (selector, page) => {
  if (!selector || typeof selector !== "string") {
    throw new TypeError("selector must be a string.");
  }

  if (!page || typeof page.locator !== "function") {
    throw new TypeError("page must be a Puppeteer Page.");
  }

  return await page
    .locator(selector)
    .map((el) => !el.classList.contains("d-none"))
    .wait();
};

const getTextContent = async (selector, page) => {
  if (!selector || typeof selector !== "string") {
    throw new TypeError("selector must be a string.");
  }

  if (!page || typeof page !== "object") {
    throw new TypeError("page must be an object.");
  }

  return await page.$eval(selector, (el) => el.textContent.trim());
};

const getProperty = async (elementHandle, property) => {
  if (!elementHandle || typeof elementHandle.getProperty !== "function") {
    throw new TypeError("elementHandle must be a Puppeteer ElementHandle.");
  }

  if (!property || typeof property !== "string") {
    throw new TypeError("property must be a string.");
  }

  return (await elementHandle.getProperty(property)).jsonValue();
};

const isEnabled = async (elementHandle) => {
  if (!elementHandle || typeof elementHandle.getProperty !== "function") {
    throw new TypeError("elementHandle must be a Puppeteer ElementHandle.");
  }

  return !(await getProperty(elementHandle, "disabled"));
};

const clickButton = async (selector, page) => {
  if (!selector || typeof selector !== "string") {
    throw new TypeError("selector must be a string.");
  }

  if (!page || typeof page.locator !== "function") {
    throw new TypeError("page must be a Puppeteer Page.");
  }

  await page.locator(selector).click();
};

const getElementHandle = async (selector, page) => {
  if (!selector || typeof selector !== "string") {
    throw new TypeError("selector must be a string.");
  }

  if (!page || typeof page.locator !== "function") {
    throw new TypeError("page must be a Puppeteer Page.");
  }

  return await page.$(selector);
};

const getTimerDisplayText = async (page) => {
  if (!page || typeof page.locator !== "function") {
    throw new TypeError("page must be a Puppeteer Page.");
  }

  return await getTextContent(TIMER_DISPLAY, page);
};

const waitFor = async (delay) => new Promise((resolve) => setTimeout(resolve, delay));

module.exports = {
  isVisible,
  getTextContent,
  getProperty,
  isEnabled,
  clickButton,
  getElementHandle,
  getTimerDisplayText,
  waitFor,
};
