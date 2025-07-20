const { Given, When, Then, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const assert = require("assert");
const puppeteer = require("puppeteer");

let browser, page;

BeforeAll(async function () {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

AfterAll(async () => {
  await browser.close();
});

Given("I open the timer app", async function () {
  await page.goto("http://localhost:8080"); // change to your app's URL
});

When("I click the start button", async function () {
  await page.locator("#startButton").click();
});

Then("the timer should count down by at least 1 second", async function () {
  const initialText = await page.$eval("#timerDisplay", (el) => el.textContent);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const afterText = await page.$eval("#timerDisplay", (el) => el.textContent);
  assert.notStrictEqual(afterText, initialText);
});

Then("the start button should not be visible", async function () {
  const visible = await page
    .locator("#startButton")
    .map((el) => !el.classList.contains("d-none"))
    .wait();

  assert.strictEqual(visible, false, "Start button should not be visible");
});

Then("the pause button should be visible", async function () {
  const visible = await page
    .locator("#pauseButton")
    .map((el) => !el.classList.contains("d-none"))
    .wait();

  assert.strictEqual(visible, true, "Pause button should be visible");
});

Then("the reset button should be visible", async function () {
  const visible = await page
    .locator("#resetButton")
    .map((el) => !el.classList.contains("d-none"))
    .wait();

  assert.strictEqual(visible, true, "Reset button should be visible");
});

When("I click the pause button", async function () {
  await page.locator("#pauseButton").click();
});

Then("the timer should not change after 2 seconds", async function () {
  const timeBefore = await page.$eval("#timerDisplay", (el) => el.textContent);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const timeAfter = await page.$eval("#timerDisplay", (el) => el.textContent);
  assert.strictEqual(timeBefore, timeAfter, "Timer should not change when paused");
});

Then("the pause button should not be visible", async function () {
  const visible = await page
    .locator("#pauseButton")
    .map((el) => !el.classList.contains("d-none"))
    .wait();

  assert.strictEqual(visible, false, "Pause button should not be visible");
});

Then("the start button should be visible", async function () {
  const visible = await page
    .locator("#startButton")
    .map((el) => !el.classList.contains("d-none"))
    .wait();

  assert.strictEqual(visible, true, "Start button should be visible");
});

When("I click the reset button", async function () {
  await page.locator("#resetButton").click();
});

Then("the reset button should not be visible", async function () {
  const visible = await page
    .locator("#resetButton")
    .map((el) => !el.classList.contains("d-none"))
    .wait();

  assert.strictEqual(visible, false, "Reset button should be visible");
});

Then("the timer display should show {string}", async (expected) => {
  const text = await page
    .locator("#timerDisplay")
    .map((el) => el.textContent.trim())
    .wait();

  assert.strictEqual(text, expected);
});

Then("the hours input should be enabled and show {string}", async function (expected) {
  const hoursInput = await page.$("#hoursInput");
  const disabled = await (await hoursInput.getProperty("disabled")).jsonValue();
  const inputValue = await (await hoursInput.getProperty("value")).jsonValue();

  assert.strictEqual(disabled, false, "Hours input should be enabled");
  assert.strictEqual(inputValue, expected, "Hours input should show correct value");
});

Then("the minutes input should be enabled and show {string}", async function (expected) {
  const minutesInput = await page.$("#minutesInput");
  const disabled = await (await minutesInput.getProperty("disabled")).jsonValue();
  const inputValue = await (await minutesInput.getProperty("value")).jsonValue();

  assert.strictEqual(disabled, false, "Minutes input should be enabled");
  assert.strictEqual(inputValue, expected, "Minutes input should show correct value");
});

Then("the seconds input should be enabled and show {string}", async function (expected) {
  const secondsInput = await page.$("#secondsInput");
  const disabled = await (await secondsInput.getProperty("disabled")).jsonValue();
  const inputValue = await (await secondsInput.getProperty("value")).jsonValue();

  assert.strictEqual(disabled, false, "Seconds input should be enabled");
  assert.strictEqual(inputValue, expected, "Seconds input should show correct value");
});
