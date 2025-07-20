const { Given, When, Then, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const assert = require("assert");
const puppeteer = require("puppeteer");
const { TEST_CONFIG, SELECTORS } = require("../constants.js");

const {
  isVisible,
  getProperty,
  isEnabled,
  clickButton,
  getElementHandle,
  getTimerDisplayText,
  waitFor,
} = require("../utils");

let browser, page;
const { LOCAL_URL } = TEST_CONFIG;

const { START_BUTTON, PAUSE_BUTTON, RESET_BUTTON, HOURS_INPUT, MINUTES_INPUT, SECONDS_INPUT } =
  SELECTORS;

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
  await clickButton(START_BUTTON, page);
});

Then("the timer should count down by at least 1 second", async function () {
  const initialText = await getTimerDisplayText(page);
  await waitFor(1500);
  const afterText = await getTimerDisplayText(page);

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
  await clickButton(PAUSE_BUTTON, page);
});

Then("the timer should not change after 2 seconds", async function () {
  const timeBefore = await getTimerDisplayText(page);
  await waitFor(2000);
  const timeAfter = await getTimerDisplayText(page);

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
  await clickButton(RESET_BUTTON, page);
});

Then("the reset button should not be visible", async function () {
  const visible = await isVisible(RESET_BUTTON, page);

  assert.strictEqual(visible, false, "Reset button should be visible");
});

Then("the timer display should show {string}", async (expected) => {
  const text = await getTimerDisplayText(page);

  assert.strictEqual(text, expected);
});

Then("the hours input should be enabled and show {string}", async function (expected) {
  const hoursInput = await getElementHandle(HOURS_INPUT, page);
  const enabled = await isEnabled(hoursInput);
  const inputValue = await getProperty(hoursInput, "value");

  assert.strictEqual(enabled, true, "Hours input should be enabled");
  assert.strictEqual(inputValue, expected, "Hours input should show correct value");
});

Then("the minutes input should be enabled and show {string}", async function (expected) {
  const minutesInput = await getElementHandle(MINUTES_INPUT, page);
  const enabled = await isEnabled(minutesInput);
  const inputValue = await getProperty(minutesInput, "value");

  assert.strictEqual(enabled, true, "Minutes input should be enabled");
  assert.strictEqual(inputValue, expected, "Minutes input should show correct value");
});

Then("the seconds input should be enabled and show {string}", async function (expected) {
  const secondsInput = await getElementHandle(SECONDS_INPUT, page);
  const enabled = await isEnabled(secondsInput);
  const inputValue = await getProperty(secondsInput, "value");

  assert.strictEqual(enabled, true, "Seconds input should be enabled");
  assert.strictEqual(inputValue, expected, "Seconds input should show correct value");
});

Then("the hours input should be disabled", async function () {
  const hoursInput = await getElementHandle(HOURS_INPUT, page);
  const enabled = await isEnabled(hoursInput);

  assert.strictEqual(enabled, false, "Hours input should be disabled");
});

Then("the minutes input should be disabled", async function () {
  const minutesInput = await getElementHandle(MINUTES_INPUT, page);
  const enabled = await isEnabled(minutesInput);

  assert.strictEqual(enabled, false, "Minutes input should be disabled");
});

Then("the seconds input should be disabled", async function () {
  const secondsInput = await getElementHandle(SECONDS_INPUT, page);
  const enabled = await isEnabled(secondsInput);

  assert.strictEqual(enabled, false, "Seconds input should be disabled");
});
