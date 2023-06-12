describe("Thank You Page Tests", () => {
  beforeAll(async () => {
    await page.goto(
      "http://127.0.0.1:8080/source/pages/thankyou_page/thankyou.html"
    );
  });

  it("Click Home to go back to landing page", async () => {
    // check if on thank you page
    const thankyouURL = await page.url();
    expect(thankyouURL).toBe(
      "http://127.0.0.1:8080/source/pages/thankyou_page/thankyou.html"
    );

    // click on home button
    const homeButton = await page.$("button");
    await homeButton.click();
    await page.waitForTimeout(3000);

    const landingURL = await page.url();
    expect(landingURL).toBe(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );
  });
});
