const { test, expect } = require('@playwright/test')
const registerData = require('../fixtures/registerData.json')

test.describe('Esperas y Aserciones', async() =>{
    let randomNumber;
    let username;

    test.beforeEach(async({page}) =>{
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
        await expect(page.locator(`[id^="user_${username}_"]`)).toBeVisible({timeout:10000});
        await page.locator('#waitslink').click();
    })

    test('Deberia validar el primer mensaje', async ({page}) => {
        await page.locator('#wait').dblclick();
        await expect(page.locator('#message')).toHaveText('You have waited for ten seconds, CONGRATULATIONS', { timeout: 11000 });
    })
})