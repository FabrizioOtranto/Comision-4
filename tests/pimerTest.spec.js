const { test, expect } = require('@playwright/test')
const registerData = require('../fixtures/registerData.json')

test.describe('Playwright', () => {
    let randomNumber;
    let username;

    test.beforeAll(async() =>{
        await console.log('before all');
    });

    test.beforeEach(async ({ page }) => {
        randomNumber = Math.ceil(Math.random() * 10000);
        username = registerData.username + randomNumber;
        await page.goto('');
        await page.locator('#user').fill(username);
        await page.locator('#pass').fill(registerData.password);
        await page.locator(`[value="${registerData.gender}"]`).check({ force: true });
        await page.locator('#day').selectOption(registerData.day);
        await page.locator('#month').selectOption({ label: registerData.month });
        await page.locator('#year').selectOption(registerData.year);
        await page.locator('//button[text()="Register"]').click();
        await expect(page.locator(`[id^="user_${username}_"]`)).toBeVisible({ timeout: 10000 });
        await page.locator('#todolistlink').click();
    });

    test("Deberia agregar una nueva tarea", async ({ page }) => {
        await page.locator('#task').fill('Task');
        await page.locator('#sendTask').click();
    });

    test("Deberia agregar una nueva tarea 2", async ({ page }) => {
        await page.locator('#task').fill('Task');
        await page.locator('#sendTask').click();
    });

    test.afterEach(async() =>{
        await console.log('after Each');
    });

    test.afterAll(async() =>{
        await console.log("After all");
    });
});