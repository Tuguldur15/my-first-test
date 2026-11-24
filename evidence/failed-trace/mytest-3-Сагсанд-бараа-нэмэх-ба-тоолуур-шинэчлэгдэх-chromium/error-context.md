# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mytest.spec.ts >> 3 Сагсанд бараа нэмэх ба тоолуур шинэчлэгдэх
- Location: tests/mytest.spec.ts:41:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.shopping_cart_badge')
Expected: "999"
Received: "1"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('.shopping_cart_badge') with timeout 5000ms
  - waiting for locator('.shopping_cart_badge')
    14 × locator resolved to <span class="shopping_cart_badge" data-test="shopping-cart-badge">1</span>
       - unexpected value "1"

```

```yaml
- text: "1"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Тест 1: Нэвтрэх (Login) хуудасны үндсэн элементүүд харагдаж буйг шалгах
  4  | test('1 Нэвтрэх хуудас зөв ачаалагдах', async ({ page }) => {
  5  |   // Алхам 1: SauceDemo нэвтрэх хуудас руу хандах
  6  |   await page.goto('https://www.saucedemo.com/');
  7  | 
  8  |   // Алхам 2: Хэрэглэгчийн нэр (Username) оруулах талбар харагдаж буйг баталгаажуулах
  9  |   await expect(page.getByPlaceholder('Username')).toBeVisible();
  10 | 
  11 |   // Алхам 3: Нууц үг (Password) оруулах талбар харагдаж буйг баталгаажуулах
  12 |   await expect(page.getByPlaceholder('Password')).toBeVisible();
  13 | 
  14 |   // Алхам 4: "Login" товчлуур харагдаж буйг баталгаажуулах
  15 |   await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  16 | });
  17 | 
  18 | // Тест 2: Буруу нууц үгээр нэвтрэх үед алдааны мэдэгдэл зөв гарч буйг шалгах
  19 | test('2 Буруу нууц үг оруулахад алдааны мессеж харуулах', async ({ page }) => {
  20 |   // Алхам 1: SauceDemo хуудсыг нээх
  21 |   await page.goto('https://www.saucedemo.com/');
  22 | 
  23 |   // Алхам 2: Хүчинтэй хэрэглэгчийн нэр ("standard_user") бөглөх
  24 |   await page.getByPlaceholder('Username').fill('standard_user');
  25 | 
  26 |   // Алхам 3: Санаатай буруу нууц үг оруулах
  27 |   await page.getByPlaceholder('Password').fill('wrong_password_123');
  28 | 
  29 |   // Алхам 4: "Login" товчлуур дээр дарж нэвтрэх үйлдэл илгээх
  30 |   await page.getByRole('button', { name: 'Login' }).click();
  31 | 
  32 |   // Алхам 5: Алдааны мессежийн элемент харагдаж буйг шалгах
  33 |   const errorMessage = page.locator('[data-test="error"]');
  34 |   await expect(errorMessage).toBeVisible();
  35 | 
  36 |   // Алхам 6: Алдааны мессежийн текст зөв эсэхийг баталгаажуулах
  37 |   await expect(errorMessage).toContainText('Username and password do not match');
  38 | });
  39 | 
  40 | // Тест 3: Нэвтэрч бараа нэмэх, сагсны тоолуур шалгах болон гарах (Logout) урсгал
  41 | test('3 Сагсанд бараа нэмэх ба тоолуур шинэчлэгдэх', async ({ page }) => {
  42 |   // Алхам 1: SauceDemo хуудас руу орж, зөв нэвтрэх мэдээллээр нэвтрэх
  43 |   await page.goto('https://www.saucedemo.com/');
  44 |   await page.getByPlaceholder('Username').fill('standard_user');
  45 |   await page.getByPlaceholder('Password').fill('secret_sauce');
  46 |   await page.getByRole('button', { name: 'Login' }).click();
  47 | 
  48 |   // Алхам 2: Эхний барааны "Add to cart" товчлуур дээр дарж сагсанд нэмэх
  49 |   await page.getByRole('button', { name: 'Add to cart' }).first().click();
  50 | 
  51 |   // Алхам 3: Сагсны тоолуур (.shopping_cart_badge) харагдаж, утга нь '1' болсныг шалгах
  52 |   const cartBadge = page.locator('.shopping_cart_badge');
  53 |   await expect(cartBadge).toBeVisible();
> 54 |   await expect(cartBadge).toHaveText('999');
     |                           ^ Error: expect(locator).toHaveText(expected) failed
  55 | 
  56 |   // Алхам 4: Навигацын цэсийг нээж, Logout холбоос дээр дарж системээс гарах
  57 |   await page.getByRole('button', { name: 'Open Menu' }).click();
  58 |   await page.locator('#logout_sidebar_link').click();
  59 | });
  60 | 
```