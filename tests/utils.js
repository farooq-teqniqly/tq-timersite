const isVisible = async (selector, page) => {
  if (!selector || typeof selector !== "string") {
    throw new TypeError("selector must be a string.");
  }

  if (!page || typeof page !== "object") {
    throw new TypeError("page must be an object.");
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

module.exports = { isVisible, getTextContent, getProperty, isEnabled };
