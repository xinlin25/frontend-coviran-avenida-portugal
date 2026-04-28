import { test, expect } from '@playwright/test';

test('abre la app', async ({ page }) => {
  await page.goto('https://frontend-coviran-avenida-portugal.vercel.app/');

  await expect(page).toHaveTitle(/.*/);
});
