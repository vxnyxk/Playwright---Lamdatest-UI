import { test, expect } from '@playwright/test';
require('dotenv').config();

let remoteBrowser; 
let remoteContext; 

test.beforeAll(async ({ browser }) => {
  const capabilities = {
    browserName: 'Chrome',
    browserVersion: 'latest',
    platform: 'Windows 10',
    name: 'Login Function Test',
    build: 'Playwright-LambdaTest-Demo-PreSalesHackathon',
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
  };

  const browserType = browser.browserType();
  remoteBrowser = await browserType.connect(
    `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  );

  remoteContext = await remoteBrowser.newContext();
});

test('Login Function', async () => {
  const remotePage = await remoteContext.newPage();

  await remotePage.goto('https://the-internet.herokuapp.com/login');
  await remotePage.locator('#username').fill('tomsmith');
  await remotePage.locator('#password').fill('SuperSecretPassword!');
  await remotePage.getByRole('button', { name: 'Login' }).click();

 
});

test.afterAll(async () => {
  await remoteBrowser.close();
});