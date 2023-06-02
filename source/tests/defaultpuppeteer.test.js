describe('Google Sanity Check Test Case', () => {
    beforeAll(async () => {
        await page.goto('https://google.com');
    });
  
    it('should be titled "Google"', async () => {
        await expect(page.title()).resolves.toMatch('Google');
    });
});

describe('Website Load Check', () => {
    beforeAll(async () => {
        await page.goto('https://localhost:4444/source/pages/landing_page/landing.html');
    });
  
    it('should be titled ', async () => {
        await expect(page.title()).resolves.toMatch('Landing Page');
    });
});