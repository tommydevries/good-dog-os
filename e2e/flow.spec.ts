import { test, expect } from '@playwright/test'

test('onboard, generate a plan, draw a card, and track progress', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /train your dog/i })).toBeVisible()

  // Onboarding
  await page.getByRole('link', { name: 'Build my plan' }).click()
  await page.locator('#dog-name').fill('Tracker')
  await page.locator('#dog-age').fill('7')
  await page.getByRole('button', { name: 'Next' }).click() // step 1
  await page.getByRole('button', { name: 'Next' }).click() // step 2
  await page.getByRole('button', { name: /Counter-surfing and stealing food/ }).click()
  await page.getByRole('button', { name: 'Next' }).click() // step 3
  await page.getByRole('button', { name: 'Generate plan' }).click()

  // Plan generated and personalized (young large breed -> growth-plate note)
  await expect(page.getByRole('heading', { name: /training plan/i })).toBeVisible()
  await expect(page.getByText(/growth plate/i).first()).toBeVisible()

  // Draw a training card and complete it
  await page.getByRole('link', { name: 'Draw a training card' }).click()
  await expect(page.getByRole('heading', { name: 'Training cards' })).toBeVisible()
  await page.getByRole('button', { name: 'Did it' }).click()

  // Tracker reflects progress
  await page.getByRole('link', { name: 'Progress' }).click()
  await expect(page.getByRole('heading', { name: /progress/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Program weeks' })).toBeVisible()
})
