import { test, expect } from '@playwright/test';

// Тест 1: Нэвтрэх (Login) хуудасны үндсэн элементүүд харагдаж буйг шалгах
test('1 Нэвтрэх хуудас зөв ачаалагдах', async ({ page }) => {
  // Алхам 1: SauceDemo нэвтрэх хуудас руу хандах
  await page.goto('https://www.saucedemo.com/');

  // Алхам 2: Хэрэглэгчийн нэр (Username) оруулах талбар харагдаж буйг баталгаажуулах
  await expect(page.getByPlaceholder('Username')).toBeVisible();

  // Алхам 3: Нууц үг (Password) оруулах талбар харагдаж буйг баталгаажуулах
  await expect(page.getByPlaceholder('Password')).toBeVisible();

  // Алхам 4: "Login" товчлуур харагдаж буйг баталгаажуулах
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

// Тест 2: Буруу нууц үгээр нэвтрэх үед алдааны мэдэгдэл зөв гарч буйг шалгах
test('2 Буруу нууц үг оруулахад алдааны мессеж харуулах', async ({ page }) => {
  // Алхам 1: SauceDemo хуудсыг нээх
  await page.goto('https://www.saucedemo.com/');

  // Алхам 2: Хүчинтэй хэрэглэгчийн нэр ("standard_user") бөглөх
  await page.getByPlaceholder('Username').fill('standard_user');

  // Алхам 3: Санаатай буруу нууц үг оруулах
  await page.getByPlaceholder('Password').fill('wrong_password_123');

  // Алхам 4: "Login" товчлуур дээр дарж нэвтрэх үйлдэл илгээх
  await page.getByRole('button', { name: 'Login' }).click();

  // Алхам 5: Алдааны мессежийн элемент харагдаж буйг шалгах
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();

  // Алхам 6: Алдааны мессежийн текст зөв эсэхийг баталгаажуулах
  await expect(errorMessage).toContainText('Username and password do not match');
});

// Тест 3: Нэвтэрч бараа нэмэх, сагсны тоолуур шалгах болон гарах (Logout) урсгал
test('3 Сагсанд бараа нэмэх ба тоолуур шинэчлэгдэх', async ({ page }) => {
  // Алхам 1: SauceDemo хуудас руу орж, зөв нэвтрэх мэдээллээр нэвтрэх
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Алхам 2: Эхний барааны "Add to cart" товчлуур дээр дарж сагсанд нэмэх
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Алхам 3: Сагсны тоолуур (.shopping_cart_badge) харагдаж, утга нь '1' болсныг шалгах
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  // Алхам 4: Навигацын цэсийг нээж, Logout холбоос дээр дарж системээс гарах
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('#logout_sidebar_link').click();
});
