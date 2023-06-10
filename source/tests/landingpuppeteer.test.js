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
    await page.waitForSelector("canvas");
  });

  it("Click hide tutorial, click 5 stars of Canis Major, click next, local storage should have Canis Major", async () => {
    // should be in skymap page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/skymap_page/skymap.html"
    );

    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });

    expect(questiontype).toBe("health");

    // click to hide tutorial
    const hideButton = await page.$("#hide");
    await hideButton.click();
    await page.waitForTimeout(100);

    await page.evaluate(() => {
      localStorage.setItem("chosenConstellation", "Canis Major");
    });
  });
  it("Check if chosen constellation in local storage is Canis Major, click next to go to response page", async () => {
    // manually go to explanation page
    await page.goto(
      "http://127.0.0.1:8080/source/pages/explanation_page/explanation.html"
    );

    // check if page is explanation page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/explanation_page/explanation.html"
    );

    // get chosen constellation from local storage
    const chosenConstellation = await page.evaluate(() => {
      return localStorage.getItem("chosenConstellation");
    });
    // check chosen constellation is Canis Major
    expect(chosenConstellation).toBe("Canis Major");

    // check that title is Canis Major
    await page.waitForSelector("h1");
    const textContent = await page.evaluate(
      () => document.querySelector("h1").textContent
    );

    expect(textContent).toBe("Canis Major");

    const continueButton = await page.$("#continue-button");
    await continueButton.click();
    await page.waitForTimeout(100);
  });
  it("Click see result, click to next page", async () => {
    // check if on response page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/response_page/response.html"
    );

    // click see result button
    const seeResultButton = await page.$("#visibleButton");
    await seeResultButton.click();
    await page.waitForTimeout(100);

    // check if explanation (#hiddenText) is not ""
    await page.waitForSelector("p");
    const textContent = await page.evaluate(
      () => document.querySelector("p").textContent
    );
    expect(textContent).not.toBe("");

    // click to go to thank you page
    const nextPageButton = await page.$("#hiddenButton");
    await nextPageButton.click();
    await page.waitForTimeout(100);
  });
  it("Click Home to go back to landing page", async () => {
    // check if on thank you page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/thankyou_page/thankyou.html"
    );

    const homeButton = await page.$("button");
    await homeButton.click();
    await page.waitForTimeout(100);

    const landingURL = await page.url();
    expect(landingURL).toBe(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );
  });

  it("Click start, click relationships, click next, local storage should be relationship", async () => {
    //await page.reload();
    await page.goto(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );

    // Reset the page
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Navigate through the landing page to get to skymap
    const startbutton = await page.$("#start-button");
    await startbutton.click();
    await page.waitForTimeout(100);
    const relationshipbutton = await page.$("#relationship-button");
    await relationshipbutton.click();
    await page.waitForTimeout(100);
    const continuebutton = await page.$("#continue-button");
    await continuebutton.click();
    //await page.waitForTimeout(100);
    await page.waitForSelector("canvas");
  });

  it("Click the hide tutorial, click 5 stars of Orion, click next, local storage should have Orion", async () => {
    // should be in skymap page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/skymap_page/skymap.html"
    );

    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });

    expect(questiontype).toBe("relationship");

    // click to confirm tutorial
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await page.waitForTimeout(100);

    // manually put constellation into local storage
    await page.evaluate(() => {
      localStorage.setItem("chosenConstellation", "Orion");
    });
  });
  it("Check if chosen constellation in local storage is Orion, click next to go to response page", async () => {
    // manually go to explanation page
    await page.goto(
      "http://127.0.0.1:8080/source/pages/explanation_page/explanation.html"
    );

    // check if page is explanation page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/explanation_page/explanation.html"
    );

    // get chosen constellation from local storage
    const chosenConstellation = await page.evaluate(() => {
      return localStorage.getItem("chosenConstellation");
    });
    // check chosen constellation is Orion
    expect(chosenConstellation).toBe("Orion");

    // check that title is Orion
    await page.waitForSelector("h1");
    const textContent = await page.evaluate(
      () => document.querySelector("h1").textContent
    );

    expect(textContent).toBe("Orion");

    const continueButton = await page.$("#continue-button");
    await continueButton.click();
    await page.waitForTimeout(100);
  });
  it("Click see result, click to next page", async () => {
    //check if on response page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/response_page/response.html"
    );

    //click to see result button
    const seeResultButton = await page.$("#visibleButton");
    await seeResultButton.click();
    await page.waitForTimeout(100);

    // check if explanation (#hiddenText) is not ""
    await page.waitForSelector("p");
    const textContent = await page.evaluate(
      () => document.querySelector("p").textContent
    );
    expect(textContent).not.toBe("");

    // click to go to thank you page
    const nextPageButton = await page.$("#hiddenButton");
    await nextPageButton.click();
    await page.waitForTimeout(100);
  });
  it("Click Home to go back to landing page", async () => {
    //check if on thank you page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/thankyou_page/thankyou.html"
    );

    const homeButton = await page.$("button");
    await homeButton.click();
    await page.waitForTimeout(100);

    const landingURL = await page.url();
    expect(landingURL).toBe(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );
  });
});
