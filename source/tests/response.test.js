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
  it("should hide the triggering button and unhide next button", async () => {
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

    // Assert that the next page button is visible
    const nextPageButtonClass = await page.$eval("#hiddenButton", (el) =>
      el.classList.contains("hidden")
    );
    expect(nextPageButtonClass).toBe(false);
  });
});
