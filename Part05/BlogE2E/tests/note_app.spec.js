const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data:{
        username: 'Kieran',
        name: 'Kieran',
        password: 'Pp120397!',
      }
    })
    await page.goto('http://localhost:5173')
  })

  test(' 5.17 Login form is shown', async ({ page }) => {
   
    // await page.getByTestId('username').fill('Curtis')
    // await page.getByTestId('password').fill('Prasad')
    // await page.getByRole('button', {name: 'login'}).click()

    // await expect(page.getByText('Curtisd logged in')).toBeVisible()
    const locator = await page.getByRole("heading", { name: "Login into application" });
    await expect(locator).toBeVisible();
  })

  describe('5.18 Login', () => {
    test('succeeds with correct credentials', async({ page }) => {
      await page.getByTestId('username').fill('Kieran')
      await page.getByTestId('password').fill('Pp120397!')
      await page.getByRole('button', {name: 'login'}).click()
      await expect(page.getByText('Kieran logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
      await page.getByTestId('username').fill('Kieran')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  
  })

  describe('5.19 when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('Kieran')
      await page.getByTestId('password').fill('Pp120397!')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new Blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByTestId('title-input').fill('a blog playwright')
      // await page.getByTestId('author-input').fill('Kieran')
      await page.getByTestId('url-input').fill('google.com')
      await page.getByRole("button", { name: "Create" }).click();
      await expect(page.getByText('created')).toBeVisible()
    })

    test('5.20 a blog can be liked', async ({page}) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByTestId('title-input').fill('Exercise 5.20')
      await page.getByTestId('url-input').fill('google.com')
      await page.getByRole("button", { name: "Create" }).click();
      await page.getByRole("button", { name: "View" }).first().click();
      await page.getByRole("button", { name: "likes", exact: true }).click();
      await expect(page.getByText('Blog Exercise 5.20 by Kieran updated')).toBeVisible()
    })

    test('5.21 creator of the blog is able to delete it ',async ({page}) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByTestId('title-input').fill('a blog playwright')
      await page.getByTestId('url-input').fill('google.com')
      await page.getByRole("button", { name: "Create" }).click();
      await page.getByRole("button", { name: "View" }).first().click();
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Are you sure you want to delete this blog?');
        await dialog.accept();
      });
      await page.getByRole("button", {name: "remove", exact: true}).click()
      await expect(page.locator('text=a blog playwright')).toHaveCount(0);
    })

    test("5.22 creator of blog sees delete button", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByTestId("title-input").fill("delete blog");
      await page.getByTestId("url-input").fill("google.com");
      await page.getByRole("button", { name: "Create" }).click();
      await page.getByText("View").last().click();
      await expect(page.getByRole("button", { name: "remove", exact: true })).toBeVisible();
    });
    
  })  
})