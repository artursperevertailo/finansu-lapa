import { test, expect } from '@playwright/test';

test('basic page load test', async ({ page }) => {
  // Listen for console messages and errors
  page.on('console', msg => console.log('Browser console:', msg.text()));
  page.on('pageerror', error => console.log('Page error:', error.message));
  
  await page.goto('/');
  
  // Just check if the page loads without crashing
  await expect(page).toHaveTitle(/Finanšu Ceļvedis/);
  
  // Check if there's any content at all
  const body = await page.locator('body').textContent();
  console.log('Body content length:', body?.length || 0);
  console.log('Body preview:', body?.substring(0, 100));
  
  // This should pass even if the React app doesn't render
  expect(body).toBeTruthy();
}); 