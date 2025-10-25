const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Teemu Kinnunen',
        username: 'teki',
        password: 'salainen'
      },
    })

    await page.goto('/')
  })

 test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'teki', 'salainen')
      await expect(page.getByText('Teemu Kinnunen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'teki', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await loginWith(page, 'teki', 'salainen')
  })

  test('a new blog can be created', async ({ page }) => {
    await createBlog(page, 'a blog created by playwright', 'playwright author', 'http://playwright.blog')
    await expect(page.getByText('a blog created by playwright playwright author')).toBeVisible()
  })

  test('user can like a blog', async ({ page }) => {
    await createBlog(page, 'a blog to be liked', 'test author', 'http://like.blog')
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('likes: 1')).toBeVisible()
  })

    test('user can delete a blog', async ({ page }) => {
    await createBlog(page, 'a blog to be deleted', 'test author', 'http://delete.blog')
    await page.getByRole('button', { name: 'view' }).click()
    page.on('dialog', async dialog => {
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'delete' }).click()
    await expect(page.getByText('a blog to be deleted test author')).not.toBeVisible()
    })

    test('only creator can see delete button', async ({ page, request }) => {
    await createBlog(page, 'a blog to test delete button', 'test author', 'http://deletebutton.blog')
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()
    await page.getByRole('button', { name: 'logout' }).click()

    await request.post('/api/users', {
      data: {
        name: 'Another User',
        username: 'another',
        password: 'salainen'
      }
    })

+   await page.getByLabel('username').fill('another')
+   await page.getByLabel('password').fill('salainen')
+   await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
  })
})
})