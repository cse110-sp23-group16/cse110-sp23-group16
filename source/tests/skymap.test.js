describe("Skymap Usability Test", () => {
  let ratio;
  let screenWidth;
  let screenHeight;
  let leftX;
  let rightX;
  let upY;
  let downY;

  beforeAll(async () => {
    await page.goto(
      "http://127.0.0.1:8080/source/pages/skymap_page/skymap.html"
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

  it("Checking the default screen size", async () => {
    let window = await page.viewport();
    let screenWidth = window.width;
    let screenHeight = window.height;
    expect(screenWidth).toBe(800);
    expect(screenHeight).toBe(600);
  });

  it("User reads the tutorial and closes it", async () => {
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await page.waitForSelector("dialog", { hidden: true });
    const isOpen = await page.$eval("dialog", (dialog) =>
      dialog.hasAttribute("open")
    );
    expect(isOpen).toBe(false);
  });

  it("User chooses to hide the tutorial button", async () => {
    const tutorialButton = await page.$("#tutorial");
    await tutorialButton.click();
    const hideButton = await page.$("#hide");
    await hideButton.click();
    await page.waitForSelector("#tutorial", { hidden: true });
    const isHidden = await page.$eval("#tutorial", (button) =>
      button.getAttribute("hidden")
    );
    expect(isHidden).toBe("hidden");
  });

  it("Clicking stars for Canis Major and check the result", async () => {
    await page.mouse.click(132 * ratio, 222 * ratio);
    await page.mouse.click(214 * ratio, 223 * ratio);
    await page.mouse.click(240 * ratio, 296 * ratio);
    await page.mouse.click(276 * ratio, 82 * ratio);
    await page.mouse.click(242 * ratio, 128 * ratio);
    const nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Canis Major");
  });

  it("Clicking stars for Ophiuchus and check the result", async () => {
    await page.reload();
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await page.mouse.click(276 * ratio, 82 * ratio);
    await page.mouse.click(307 * ratio, 114 * ratio);
    await page.mouse.click(231 * ratio, 213 * ratio);
    await page.mouse.click(242 * ratio, 128 * ratio);
    await page.mouse.click(214 * ratio, 223 * ratio);
    const nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Ophiuchus");
  });

  it("Clicking stars for Ophiuchus, and also de-select the stars for some times, and check the result", async () => {
    await page.reload();
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await page.mouse.click(276 * ratio, 82 * ratio);
    await page.mouse.click(276 * ratio, 82 * ratio);
    await page.mouse.click(307 * ratio, 114 * ratio);
    await page.mouse.click(231 * ratio, 213 * ratio);
    await page.mouse.click(242 * ratio, 128 * ratio);
    await page.mouse.click(214 * ratio, 223 * ratio);
    let nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(true);
    await page.mouse.click(276 * ratio, 82 * ratio);
    nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Ophiuchus");
  });

  //This test can be used by itself, without any other modifying function
  it("Clicking stars for Crux and check the result", async () => {
    await page.reload();
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await page.mouse.click(276 * ratio, 82 * ratio);
    await page.mouse.click(307 * ratio, 114 * ratio);
    await page.mouse.move(500, 300);
    await page.mouse.down();
    await page.mouse.move(100, 300);
    await page.mouse.up();
    await page.mouse.move(500, 300);
    await page.mouse.down();
    await page.mouse.move(100, 300);
    await page.mouse.up();
    await page.mouse.move(500, 200);
    await page.mouse.down();
    await page.mouse.move(500, 100);
    await page.mouse.up();
    await page.mouse.click(718 * ratio - 800, 112 * ratio - 100);
    await page.mouse.click(587 * ratio - 800, 204 * ratio - 100);
    await page.mouse.click(793 * ratio - 800, 255 * ratio - 100);
    const nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Crux");
  });

  it("Clicking stars for Orion and check the result", async () => {
    await page.reload();
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
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
  });

  it("Clicking stars for Armadillo Dragon and check the result", async () => {
    await page.reload();
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await modifiedClick(1595 * ratio, 260 * ratio);
    await modifiedClick(1760 * ratio, 391 * ratio);
    await modifiedClick(1640 * ratio, 563 * ratio);
    await modifiedClick(1463 * ratio, 430 * ratio);
    await modifiedClick(1247 * ratio, 212 * ratio);
    const nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Armadillo Dragon");
    resetXY();
  });
  //This test attempts to use the modifying function.
  it("Clicking stars for Aries and check the result", async () => {
    await page.reload();
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await modifiedClick(1348 * ratio, 373 * ratio);
    await modifiedClick(1450 * ratio, 287 * ratio);
    await modifiedClick(1602 * ratio, 166 * ratio);
    await modifiedClick(1651 * ratio, 210 * ratio);
    await modifiedClick(1285 * ratio, 225 * ratio);
    const nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Aries");
    resetXY();
  });

  it("Clicking stars for Carina and check the result", async () => {
    await page.reload();
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await modifiedClick(840 * ratio, 295 * ratio);
    await modifiedClick(869 * ratio, 327 * ratio);
    await modifiedClick(1135 * ratio, 367 * ratio);
    await modifiedClick(983 * ratio, 377 * ratio);
    await modifiedClick(1029 * ratio, 245 * ratio);
    const nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Carina");
    resetXY();
  });

  it("Clicking stars for Ursa Major and check the result", async () => {
    await page.reload();
    const confirmButton = await page.$("#confirm");
    await confirmButton.click();
    await modifiedClick(1285 * ratio, 225 * ratio);
    await modifiedClick(1353 * ratio, 185 * ratio);
    await modifiedClick(1415 * ratio, 190 * ratio);
    await modifiedClick(1348 * ratio, 373 * ratio);
    await modifiedClick(1450 * ratio, 287 * ratio);
    const nextButtonClassList = await page.$eval("#next-button", (button) =>
      Array.from(button.classList)
    );
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Ursa Major");
    resetXY();
  });
});
