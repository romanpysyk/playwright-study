import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test('Navigate to form page @smoke', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
})

test('Parametrized methods', async ({page}) => {
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pm.navigateTo().formLayoutsPage();
    await argosScreenshot(page, 'Forms layouts page');
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2');
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'});
    // const buffer = await page.screenshot();
    // console.log(buffer.toString('base64'));
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);
   //  await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'});
    // await page.waitForTimeout(5000);
    await pm.navigateTo().datePickerPage();
    await argosScreenshot(page, 'datepocker page');
    // await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(10);
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(10, 15);
})

