import { test, expect } from '@playwright/test';
  test.describe('SauceDemo UI Автомат Тестүүд (Lab 01)', () => {
  test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com'); });
  test('1 Амжилттай нэвтрэх ба Logout хийх', async ({ page }) => {
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

await expect(page.getByText('Products')).toBeVisible();
await expect(page).toHaveURL(/.*inventory.html/);

await page.getByRole('button', { name: 'Open Menu' }).click();
await page.locator('#logout_sidebar_link').click();
await expect(page.getByRole('button', { name: 'Login' })).toBeVisible(); });

test('2 Буруу нууц үг оруулахад алдааны мессеж харуулах', async ({ page }) => {
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('wrong_password_123');
await page.getByRole('button', { name: 'Login' }).click();

const errorMessage = page.locator('[data-test="error"]');
await expect(errorMessage).toBeVisible();
await expect(errorMessage).toContainText('Username and password do not match');
});

test('3 Сагсанд бараа нэмэх ба тоолуур шинэчлэгдэх', async ({ page }) => {
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

await page.getByRole('button', { name: 'Add to cart' }).first().click();

const cartBadge = page.locator('.shopping_cart_badge');
await expect(cartBadge).toBeVisible();
await expect(cartBadge).toHaveText('1');

await page.getByRole('button', { name: 'Open Menu' }).click();
await page.locator('#logout_sidebar_link').click(); }); });
