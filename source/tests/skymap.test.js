describe("Skymap Usability Test", () => {
  let ratio;

  beforeAll(async () => {
    await page.goto("http://127.0.0.1:8080/source/pages/skymap_page/skymap.html");
    ratio = await setRatio();
  });

  async function setRatio(){
    let defaultWidth = 1920;
    let defaultHeight = 1080;
    let window = await page.viewport();
    let screenWidth = window.width;
    let screenHeight = window.height;
    let desiredWidth = screenWidth * 2;
    let desiredHeight = screenHeight * 2;
    return Math.max(
      Math.ceil(desiredHeight / defaultHeight),
      Math.ceil(desiredWidth / defaultWidth)
    );
  }

  it('User reads the tutorial and closes it', async() =>{
    const confirmButton = await page.$('#confirm');
    await confirmButton.click();
    await page.waitForSelector('dialog', { hidden: true });
    const isOpen = await page.$eval('dialog', dialog => dialog.hasAttribute('open'));
    expect(isOpen).toBe(false);
  });

  it('clicking five stars and the continue button shows up', async () => {
    await page.mouse.click(132 * ratio, 222 * ratio);
    await page.mouse.click(214 * ratio, 223 * ratio);
    await page.mouse.click(226 * ratio, 328 * ratio);
    await page.mouse.click(276 * ratio, 82 * ratio);
    await page.mouse.click(242 * ratio, 128 * ratio);
    /*await page.mouse.click(132, 222);
    await page.mouse.click(214, 223);
    await page.mouse.click(226, 328);
    await page.mouse.click(276, 82);
    await page.mouse.click(242, 128);*/
    const nextButtonClassList = await page.$eval('#next-button', button => Array.from(button.classList));
    expect(nextButtonClassList.includes("hidden")).toBe(false);
  });
});
