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
  getProgressBarWidth,
  getProgressBarValueNow,
} = require("../utils");

let browser, page;
const { LOCAL_URL } = TEST_CONFIG;

const { START_BUTTON, PAUSE_BUTTON, RESET_BUTTON, HOURS_INPUT, MINUTES_INPUT, SECONDS_INPUT } =
  SELECTORS;

BeforeAll(async function () {
  browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  page = await browser.newPage();
});

AfterAll(async () => {
  await browser.close();
});

Given("I open the timer app", async function () {
  await page.goto(LOCAL_URL);
});

When("I set the hours input to {string}", async function (value) {
  await page.focus(HOURS_INPUT);
  await page.evaluate((selector) => (document.querySelector(selector).value = ""), HOURS_INPUT);
  await page.type(HOURS_INPUT, value);
});

When("I set the minutes input to {string}", async function (value) {
  await page.focus(MINUTES_INPUT);
  await page.evaluate((selector) => (document.querySelector(selector).value = ""), MINUTES_INPUT);
  await page.type(MINUTES_INPUT, value);
});

When("I set the seconds input to {string}", async function (value) {
  await page.focus(SECONDS_INPUT);
  await page.evaluate((selector) => (document.querySelector(selector).value = ""), SECONDS_INPUT);
  await page.type(SECONDS_INPUT, value);
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

Then("the progress bar should be at {int}%", async function (percentage) {
  const width = await getProgressBarWidth(page);
  const valuenow = await getProgressBarValueNow(page);

  assert.strictEqual(width, `${percentage}%`, `Progress bar width should be ${percentage}%`);
  assert.strictEqual(
    valuenow,
    String(percentage),
    `Progress bar aria-valuenow should be ${percentage}`
  );
});

Then("the progress bar should start decreasing", async function () {
  const initialWidth = await getProgressBarWidth(page);
  await waitFor(1500); // Wait for the timer to update
  const newWidth = await getProgressBarWidth(page);

  // Extract numeric values from percentages for comparison
  const initialValue = parseInt(initialWidth, 10);
  const newValue = parseInt(newWidth, 10);

  assert.ok(newValue < initialValue, "Progress bar should decrease");
});

Then("the progress bar should visually represent the remaining time", async function () {
  // Get timer display time in seconds
  const displayText = await getTimerDisplayText(page);
  const [hours, minutes, seconds] = displayText.split(":").map((num) => parseInt(num, 10));
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Initial duration is 30 seconds by default
  const initialDuration = 30;
  const expectedPercentage = Math.floor((totalSeconds / initialDuration) * 100);

  // Allow small difference due to timing of test execution
  const actualWidth = parseInt((await getProgressBarWidth(page)).replace("%", ""), 10);
  const difference = Math.abs(actualWidth - expectedPercentage);

  assert.ok(
    difference <= 5,
    `Progress bar percentage (${actualWidth}%) should be close to expected (${expectedPercentage}%)`
  );
});

Then("the progress bar should stop updating", async function () {
  const initialWidth = await getProgressBarWidth(page);
  await waitFor(1500); // Wait to confirm no change
  const newWidth = await getProgressBarWidth(page);

  assert.strictEqual(initialWidth, newWidth, "Progress bar should not change when paused");
});

Then("the progress bar should continue decreasing", async function () {
  const initialWidth = await getProgressBarWidth(page);
  await waitFor(1500); // Wait for the timer to update
  const newWidth = await getProgressBarWidth(page);

  // Extract numeric values from percentages for comparison
  const initialValue = parseInt(initialWidth, 10);
  const newValue = parseInt(newWidth, 10);

  assert.ok(newValue < initialValue, "Progress bar should continue decreasing");
});

Then("the progress bar should reset to {int}%", async function (percentage) {
  const width = await getProgressBarWidth(page);
  const valuenow = await getProgressBarValueNow(page);

  assert.strictEqual(width, `${percentage}%`, `Progress bar width should be ${percentage}%`);
  assert.strictEqual(
    valuenow,
    String(percentage),
    `Progress bar aria-valuenow should be ${percentage}`
  );
});
