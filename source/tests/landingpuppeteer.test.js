describe("Landing Page Tests", () => {
  beforeAll(async () => {
    await page.goto(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );
  });

  it("Click start, click health, click next, local storage should be health", async () => {
    // Reset the page
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();

    // Navigate through the landing page to get to skymap
    const startbutton = await page.$("#start-button");
    await startbutton.click();
    await page.waitForTimeout(100);
    const healthbutton = await page.$("#health-button");
    await healthbutton.click();
    await page.waitForTimeout(100);
    const continuebutton = await page.$("#continue-button");
    await continuebutton.click();
    await page.waitForTimeout(100);

    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });

    expect(questiontype).toBe("health");
  });

  it("Click start, click relationships, click next, local storage should be relatiohsip", async () => {
    // Reset the page
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();

    // Navigate through the landing page to get to skymap
    const startbutton = await page.$("#start-button");
    await startbutton.click();
    await page.waitForTimeout(100);
    const relationshipbutton = await page.$("#relationship-button");
    await relationshipbutton.click();
    await page.waitForTimeout(100);
    const continuebutton = await page.$("#continue-button");
    await continuebutton.click();
    await page.waitForTimeout(100);

    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });

    expect(questiontype).toBe("relationship");
  });

  it("Click start, click daily horoscope, click next, local storage should be daily", async () => {
    // Reset the page
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();

    // Navigate through the landing page to get to skymap
    const startbutton = await page.$("#start-button");
    await startbutton.click();
    await page.waitForTimeout(100);
    const relationshipbutton = await page.$("#daily-horoscope-button");
    await relationshipbutton.click();
    await page.waitForTimeout(100);
    const continuebutton = await page.$("#continue-button");
    await continuebutton.click();
    await page.waitForTimeout(100);

    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });

    expect(questiontype).toBe("daily");
  });

  it("Click start, click career, click next, local storage should be career", async () => {
    // Reset the page
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();

    // Navigate through the landing page to get to skymap
    const startbutton = await page.$("#start-button");
    await startbutton.click();
    await page.waitForTimeout(100);
    const relationshipbutton = await page.$("#career-button");
    await relationshipbutton.click();
    await page.waitForTimeout(100);
    const continuebutton = await page.$("#continue-button");
    await continuebutton.click();
    await page.waitForTimeout(100);

    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });

    expect(questiontype).toBe("career");
  });
});
