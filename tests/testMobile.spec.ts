import { test, expect } from '@applitools/eyes-playwright/fixture';

test('input fields', async ({ page }, testInfo) => {
    await page.goto('/');
    if(testInfo.project.name == 'mobile') {
    await page.locator('.sidebar-toggle').click();
    }
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    if(testInfo.project.name == 'mobile') {
    await page.locator('.sidebar-toggle').click();
    }
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" });
    await usingTheGridEmailInput.fill('test@test.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test@test.com', /*{ delay: 500 }*/);
})