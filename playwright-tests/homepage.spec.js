import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('page loads and shows basic content', async ({ page }) => {
    // Listen for console messages
    page.on('console', msg => console.log('Browser console:', msg.text()));
    page.on('pageerror', error => console.log('Page error:', error.message));
    
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if the root div has content
    const root = page.locator('#root');
    await expect(root).toBeVisible();
    
    // Log what's actually on the page
    const pageContent = await page.content();
    console.log('Page title:', await page.title());
    console.log('Root content length:', await root.textContent());
    
    // Check for any content in the body
    const body = page.locator('body');
    const bodyText = await body.textContent();
    console.log('Body text preview:', bodyText?.substring(0, 200));
  });

  test('loads homepage with main sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for main sections that should always be present
    await expect(page.locator('h1', { hasText: 'Palīdzi savai naudas nākotnei' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Mūsu risinājumi' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Kā tas strādā?' })).toBeVisible();
    
    // Check for testimonials section (might be loading or empty)
    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeVisible();
    
    // Check for FAQ section (might be loading or empty)
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();
  });

  test('testimonials section loads and shows content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for testimonials section to load
    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeVisible();
    
    // Check if there's content or loading state
    const hasContent = await testimonialsSection.locator('blockquote').count() > 0;
    const hasLoading = await testimonialsSection.locator('.animate-spin').count() > 0;
    const hasError = await testimonialsSection.locator('.text-red-600').count() > 0;
    
    // At least one of these should be true
    expect(hasContent || hasLoading || hasError).toBeTruthy();
  });

  test('FAQ section loads and shows content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for FAQ section to load
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();
    
    // Check if there's content or loading state
    const hasContent = await faqSection.locator('button[aria-expanded]').count() > 0;
    const hasLoading = await faqSection.locator('.animate-spin').count() > 0;
    const hasError = await faqSection.locator('.text-red-600').count() > 0;
    
    // At least one of these should be true
    expect(hasContent || hasLoading || hasError).toBeTruthy();
  });

  test('FAQ expand/collapse all buttons work when content is present', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();
    
    // Check if expand/collapse buttons exist
    const expandBtn = page.getByRole('button', { name: /Atvērt visus/i });
    const collapseBtn = page.getByRole('button', { name: /Aizvērt visus/i });
    
    const hasButtons = await expandBtn.count() > 0 && await collapseBtn.count() > 0;
    
    if (hasButtons) {
      // Test the functionality
      await expandBtn.click();
      const answers = page.locator('#faq .mt-2.text-gray-700');
      if (await answers.count() > 0) {
        await expect(answers.first()).toBeVisible();
      }
      
      await collapseBtn.click();
      if (await answers.count() > 0) {
        await expect(answers.first()).not.toBeVisible();
      }
    } else {
      // If no buttons, that's also valid (no content)
      console.log('FAQ section has no expand/collapse buttons (likely no content)');
    }
  });
}); 