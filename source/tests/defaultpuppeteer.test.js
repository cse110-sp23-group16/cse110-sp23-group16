describe("Google Sanity Check Test Case", () => {
  beforeAll(async () => {
    await page.goto("https://google.com");
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch("Google");
  });
});

describe("Website Load Check", () => {
  beforeAll(async () => {
    await page.goto(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );
  });

  it("should be titled ", async () => {
    await expect(page.title()).resolves.toMatch("Landing Page");
  });
});
