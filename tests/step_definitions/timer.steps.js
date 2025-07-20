const { Given, When, Then, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const assert = require("assert");
const puppeteer = require("puppeteer");
const { TEST_CONFIG, SELECTORS } = require("../constants.js");
const { isVisible, getTextContent, getProperty, isEnabled } = require("../utils");

let browser, page;
const { LOCAL_URL } = TEST_CONFIG;

const {
  START_BUTTON,
  PAUSE_BUTTON,
  RESET_BUTTON,
  TIMER_DISPLAY,
  HOURS_INPUT,
  MINUTES_INPUT,
  SECONDS_INPUT,
} = SELECTORS;

BeforeAll(async function () {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

AfterAll(async () => {
  await browser.close();
});

Given("I open the timer app", async function () {
  await page.goto(LOCAL_URL);
});

When("I click the start button", async function () {
  await page.locator(START_BUTTON).click();
});

Then("the timer should count down by at least 1 second", async function () {
  const initialText = await getTextContent(TIMER_DISPLAY, page);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const afterText = await getTextContent(TIMER_DISPLAY, page);
  assert.notStrictEqual(afterText, initialText);
});

Then("the start button should not be visible", async function () {
  const visible = await isVisible(START_BUTTON, page);

  assert.strictEqual(visible, false, "Start button should not be visible");
});

Then("the pause button should be visible", async function () {
  const visible = await isVisible(PAUSE_BUTTON, page);

  assert.strictEqual(visible, true, "Pause button should be visible");
});

Then("the reset button should be visible", async function () {
  const visible = await isVisible(RESET_BUTTON, page);

  assert.strictEqual(visible, true, "Reset button should be visible");
});

When("I click the pause button", async function () {
  await page.locator(PAUSE_BUTTON).click();
});

Then("the timer should not change after 2 seconds", async function () {
  const timeBefore = await getTextContent(TIMER_DISPLAY, page);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const timeAfter = await getTextContent(TIMER_DISPLAY, page);
  assert.strictEqual(timeBefore, timeAfter, "Timer should not change when paused");
});

Then("the pause button should not be visible", async function () {
  const visible = await isVisible(PAUSE_BUTTON, page);

  assert.strictEqual(visible, false, "Pause button should not be visible");
});

Then("the start button should be visible", async function () {
  const visible = await isVisible(START_BUTTON, page);

  assert.strictEqual(visible, true, "Start button should be visible");
});

When("I click the reset button", async function () {
  await page.locator(RESET_BUTTON).click();
});

Then("the reset button should not be visible", async function () {
  const visible = await isVisible(RESET_BUTTON, page);

  assert.strictEqual(visible, false, "Reset button should be visible");
});

Then("the timer display should show {string}", async (expected) => {
  const text = await getTextContent(TIMER_DISPLAY, page);

  assert.strictEqual(text, expected);
});

Then("the hours input should be enabled and show {string}", async function (expected) {
  const hoursInput = await page.$(HOURS_INPUT);
  const enabled = await isEnabled(hoursInput);
  const inputValue = await getProperty(hoursInput, "value");

  assert.strictEqual(enabled, true, "Hours input should be enabled");
  assert.strictEqual(inputValue, expected, "Hours input should show correct value");
});

Then("the minutes input should be enabled and show {string}", async function (expected) {
  const minutesInput = await page.$(MINUTES_INPUT);
  const enabled = await isEnabled(minutesInput);
  const inputValue = await getProperty(minutesInput, "value");

  assert.strictEqual(enabled, true, "Minutes input should be enabled");
  assert.strictEqual(inputValue, expected, "Minutes input should show correct value");
});

Then("the seconds input should be enabled and show {string}", async function (expected) {
  const secondsInput = await page.$(SECONDS_INPUT);
  const enabled = await isEnabled(secondsInput);
  const inputValue = await getProperty(secondsInput, "value");

  assert.strictEqual(enabled, true, "Seconds input should be enabled");
  assert.strictEqual(inputValue, expected, "Seconds input should show correct value");
});
