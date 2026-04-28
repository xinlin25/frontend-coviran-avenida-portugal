import { test, expect } from '@playwright/test';

test('login correcto', async ({ page }) => {
  await page.goto('https://frontend-coviran-avenida-portugal.vercel.app/inicio-sesion');

  await page.fill('input[placeholder="Correo electrónico*"]', 'usuario1@demo.com');
  await page.fill('input[placeholder="Contraseña*"]', '12345678');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
});

test('login incorrecto muestra error', async ({ page }) => {
  await page.goto('https://frontend-coviran-avenida-portugal.vercel.app/inicio-sesion');

  await page.fill('input[placeholder="Correo electrónico*"]', 'usuario@test.com');
  await page.fill('input[placeholder="Contraseña*"]', '12345678');

  await page.click('button[type="submit"]');

  await expect(page.getByText('Correo o contraseña incorrectos')).toBeVisible({
    timeout: 15000,
  });
});
