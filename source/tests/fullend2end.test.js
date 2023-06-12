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

describe("End to end test: select Health, Orion", () => {
  let ratio;
  let screenWidth;
  let screenHeight;
  let leftX;
  let rightX;
  let upY;
  let downY;

  beforeAll(async () => {
    await page.goto(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );
    ratio = await setRatio();
  });

  async function modifiedClick(x, y) {
    //First drag the screen so that x and y are within the viewport size.
    if (x <= leftX) {
      while (x <= leftX) {
        await page.mouse.move(100, 50);
        await page.mouse.down();
        await page.mouse.move(200, 50);
        await page.mouse.up();
        leftX = leftX - 100;
        rightX = rightX - 100;
      }
    } else if (x >= rightX) {
      while (x >= rightX) {
        await page.mouse.move(200, 50);
        await page.mouse.down();
        await page.mouse.move(100, 50);
        await page.mouse.up();
        leftX = leftX + 100;
        rightX = rightX + 100;
      }
    }
    if (y >= downY) {
      //if y is below the screen
      while (y >= downY) {
        await page.mouse.move(50, 200);
        await page.mouse.down();
        await page.mouse.move(50, 100);
        await page.mouse.up();
        upY = upY + 100;
        downY = downY + 100;
      }
    } else if (y <= upY) {
      //if y is above the screen
      while (y <= upY) {
        await page.mouse.move(50, 100);
        await page.mouse.down();
        await page.mouse.move(50, 200);
        await page.mouse.up();
        upY = upY - 100;
        downY = downY - 100;
      }
    }
    await page.mouse.click(x - leftX, y - upY);
  }

  async function setRatio() {
    let defaultWidth = 1920;
    let defaultHeight = 1080;
    let window = await page.viewport();
    screenWidth = window.width;
    screenHeight = window.height;
    leftX = 0;
    rightX = screenWidth;
    upY = 0;
    downY = screenHeight;
    let desiredWidth = screenWidth * 2;
    let desiredHeight = screenHeight * 2;
    return Math.max(
      Math.ceil(desiredHeight / defaultHeight),
      Math.ceil(desiredWidth / defaultWidth)
    );
  }

  async function resetXY() {
    let window = await page.viewport();
    screenWidth = window.width;
    screenHeight = window.height;
    leftX = 0;
    rightX = screenWidth;
    upY = 0;
    downY = screenHeight;
  }

  it("Click start, click health, click next, local storage should be health", async () => {
    // Reset the page
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();

    // check if page is landing page
    const landingURL = await page.url();
    expect(landingURL).toBe(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );

    // Navigate through the landing page to get to skymap
    const startbutton = await page.$("#start-button");
    await startbutton.click();
    await page.waitForTimeout(100);

    //choose the type (daily horoscope, relationship, career, health)
    const dailybutton = await page.$("#daily-horoscope-button");
    await dailybutton.click();
    await page.waitForTimeout(100);
    const relationshipbutton = await page.$("#relationship-button");
    await relationshipbutton.click();
    await page.waitForTimeout(100);
    const careerbutton = await page.$("#career-button");
    await careerbutton.click();
    await page.waitForTimeout(100);
    const healthbutton = await page.$("#health-button");
    await healthbutton.click();
    await page.waitForTimeout(100);

    //click continue to go to next page
    const continuebutton = await page.$("#continue-button");
    await continuebutton.click();
    await page.waitForTimeout(3000);
    await page.waitForSelector("canvas");

    // check if page is skymap page
    const skymapURL = await page.url();
    expect(skymapURL).toBe(
      "http://127.0.0.1:8080/source/pages/skymap_page/skymap.html"
    );
  });

  it("Checking the default screen size", async () => {
    let window = await page.viewport();
    let screenWidth = window.width;
    let screenHeight = window.height;
    expect(screenWidth).toBe(800);
    expect(screenHeight).toBe(600);
  });

  it("Should be in skymap page, click to hide tutorial", async () => {
    // check if page is skymap page
    const skymapURL = await page.url();
    expect(skymapURL).toBe(
      "http://127.0.0.1:8080/source/pages/skymap_page/skymap.html"
    );

    // click to hide tutorial
    const hideButton = await page.$("#hide");
    await hideButton.click();
    await page.waitForTimeout(100);
  });

  it("Clicking stars for Orion and check the result, go to explanation page", async () => {
    //await page.reload();
    //const confirmButton = await page.$("#confirm");
    //await confirmButton.click();
    await modifiedClick(945 * ratio, 41 * ratio);
    await modifiedClick(1065 * ratio, 337 * ratio);
    await modifiedClick(1136 * ratio, 249 * ratio);
    await modifiedClick(1242 * ratio, 241 * ratio);
    await modifiedClick(1247 * ratio, 212 * ratio);
    const nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Orion");
    resetXY();

    const nextButton = await page.$("#next-button");
    await nextButton.click();
    await page.waitForTimeout(3000);
  });

  it("Check if Health and Orion in local storage, check explanation/image, click next to go to response page", async () => {
    // check if page is explanation page
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "http://127.0.0.1:8080/source/pages/explanation_page/explanation.html"
    );

    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });

    expect(questiontype).toBe("health");

    // get chosen constellation from local storage
    const chosenConstellation = await page.evaluate(() => {
      return localStorage.getItem("chosenConstellation");
    });
    // check chosen constellation is Canis Major
    expect(chosenConstellation).toBe("Orion");

    // check that title is Canis Major
    await page.waitForSelector("h1");
    const textContent = await page.evaluate(
      () => document.querySelector("h1").textContent
    );

    expect(textContent).toBe("Orion");

    // check that explanation is not null
    await page.waitForSelector("p");
    const explanation = await page.evaluate(
      () => document.querySelector("p").textContent
    );
    expect(explanation).not.toBe("");

    // check that image is not empty
    let serachElemnt = "img_container";
    let checkForElement = await page.evaluate((sel) => {
      let elementCheck = Array.from(document.querySelectorAll(sel));
      if (elementCheck.length) {
        return true;
      } else return false;
    }, serachElemnt);
    console.log(checkForElement);

    //click continue to go to next page
    const continueButton = await page.$("#continue-button");
    await continueButton.click();
    await page.waitForTimeout(3000);

    // check if page is response page
    const responseURL = await page.url();
    expect(responseURL).toBe(
      "http://127.0.0.1:8080/source/pages/response_page/response.html"
    );
  });

  it("Click see result, click to next page", async () => {
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
    await page.waitForTimeout(3000);

    // check if on thank you page
    const thankyouURL = await page.url();
    expect(thankyouURL).toBe(
      "http://127.0.0.1:8080/source/pages/thankyou_page/thankyou.html"
    );
  });

  it("Click Home to go back to landing page", async () => {
    // check if on thank you page
    const thankyouURL = await page.url();
    expect(thankyouURL).toBe(
      "http://127.0.0.1:8080/source/pages/thankyou_page/thankyou.html"
    );

    const homeButton = await page.$("button");
    await homeButton.click();
    await page.waitForTimeout(3000);

    const landingURL = await page.url();
    expect(landingURL).toBe(
      "http://127.0.0.1:8080/source/pages/landing_page/landing.html"
    );
  });
});
