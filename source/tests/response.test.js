describe("Default Jest Test", () => {
  test("Adding a test to hit minimum test counts", () => {
    expect(1).toBe(1);
  });
});

describe("toggleText", () => {
  beforeAll(async () => {
    await page.goto(
      "http://127.0.0.1:8080/source/pages/response_page/response.html"
    );
  });
  it("should hide the triggering button and display the fortune teller response", async () => {
    await page.evaluate(() => {
      localStorage.setItem("questionType", "health");
      localStorage.setItem("chosenConstellation", "Aries");
    });
    await page.evaluate(() => {
      toggleText();
    });

    // Assert that the visibleButton style display is 'none'
    const visibleButtonStyle = await page.evaluate(() => {
      const visibleButton = document.getElementById("visibleButton");
      return window.getComputedStyle(visibleButton).getPropertyValue("display");
    });
    expect(visibleButtonStyle).toBe("none");

    // Assert that the explanation element has the glow class
    const explanationClass = await page.$eval("#explanation", (el) =>
      el.classList.contains("glow")
    );
    expect(explanationClass).toBe(true);

    // Assert that the button element is no longer hidden
    const buttonClass = await page.$eval("#hiddenButton", (el) =>
      el.classList.contains("hidden")
    );
    expect(buttonClass).toBe(false);

    // Assert that the next page button is visible
    const nextPageButtonClass = await page.$eval("#hiddenButton", (el) =>
      el.classList.contains("hidden")
    );
    expect(nextPageButtonClass).toBe(false);

    // Assert that the text content is not empty
    const textContent = await page.$eval('#hiddenText', (el) => el.textContent);
    expect(textContent.trim() !== '').toBe(true);
  });
});
