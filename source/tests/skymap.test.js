describe("Skymap Usability Test", () => {
  let ratio;
  let minWidth = 0;
  let minHeight = 0;
  let maxWidth;
  let maxHeight;
  let screenWidth;
  let screenHeight;

  beforeAll(async () => {
    await page.goto("http://127.0.0.1:8080/source/pages/skymap_page/skymap.html");
    ratio = await setRatio();
  });

  async function setRatio(){
    let defaultWidth = 1920;
    let defaultHeight = 1080;
    let window = await page.viewport();
    screenWidth = window.width;
    screenHeight = window.height;
    maxWidth = screenWidth;
    maxHeight = screenHeight;
    let desiredWidth = screenWidth * 2;
    let desiredHeight = screenHeight * 2;
    return Math.max(
      Math.ceil(desiredHeight / defaultHeight),
      Math.ceil(desiredWidth / defaultWidth)
    );
  }
  
  async function modifiedClick(x, y){
    let midWidth = screenWidth / 2;
    let midHeight = screenHeight / 2;
    let modifiedX = x;
    let modifiedY = y;
    if (x < minWidth){
      //If x is left of current screen
      await page.mouse.move(midWidth, midHeight);
      await page.mouse.down();
      await page.mouse.move(midWidth + (minWidth - x), midHeight);
      await page.mouse.up();
      minWidth = minWidth + x;
      maxWidth = maxWidth + x;
      modifiedX = 0;
    }else if (x > maxWidth){
      //If x is right of current screen
      await page.mouse.move(midWidth, midHeight);
      await page.mouse.down();
      await page.mouse.move(midWidth - (x - maxWidth), midHeight);
      await page.mouse.up();
      minWidth = minWidth + (x - maxWidth);
      maxWidth = maxWidth + (x - maxWidth);
      modifiedX = maxWidth;
    }/*
    if (y < minHeight){
      //If y is above current scrren
      await page.mouse.move(midWidth, midHeight);
      await page.mouse.down();
      await page.mouse.move(midWidth, midHeight - y);
      await page.mouse.up();
      minHeight = minHeight - y;
      maxHeight = maxHeight - y;
      modifiedY = 0;
    }else if (y > maxHeight){
      //If y is below current screen
      await page.mouse.move(midWidth, midHeight);
      await page.mouse.down();
      await page.mouse.move(midWidth, midHeight + y);
      await page.mouse.up();
      minHeight = minHeight + y;
      maxHeight = maxHeight + y;
      modifiedY = maxHeight;
    }*/
    await page.mouse.click(modifiedX, modifiedY);
  }

  it('Checking the default screen size', async() =>{
    let window = await page.viewport();
    let screenWidth = window.width;
    let screenHeight = window.height;
    expect(screenWidth).toBe(800);
    expect(screenHeight).toBe(600);
  });

  it('User reads the tutorial and closes it', async() =>{
    const confirmButton = await page.$('#confirm');
    await confirmButton.click();
    await page.waitForSelector('dialog', { hidden: true });
    const isOpen = await page.$eval('dialog', dialog => dialog.hasAttribute('open'));
    expect(isOpen).toBe(false);
  });

  it('User chooses to hide the tutorial button', async() =>{
    const tutorialButton = await page.$('#tutorial');
    await tutorialButton.click();
    const hideButton = await page.$('#hide');
    await hideButton.click();
    await page.waitForSelector('#tutorial', { hidden: true });
    const isHidden = await page.$eval('#tutorial', button => button.getAttribute('hidden'));
    expect(isHidden).toBe('hidden');
  });

  it('Clicking stars for Canis Major and check the result', async () => {
    await page.mouse.click(132 * ratio, 222 * ratio);
    await page.mouse.click(214 * ratio, 223 * ratio);
    await page.mouse.click(240 * ratio, 296 * ratio);
    await page.mouse.click(276 * ratio, 82 * ratio);
    await page.mouse.click(242 * ratio, 128 * ratio);
    const nextButtonClassList = await page.$eval('#next-button', button => Array.from(button.classList));
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem('chosenConstellation');
    });
    expect(item).toBe('Canis Major');
  });
/*
  it('Clicking stars for Ophiuchus and check the result', async () =>{
    await page.goto("http://127.0.0.1:5500/source/pages/skymap_page/skymap.html")
    await page.mouse.click(276 * ratio, 82 * ratio);
    await page.mouse.click(307 * ratio, 114 * ratio);
    await page.mouse.click(231 * ratio, 213 * ratio);
    await page.mouse.click(242 * ratio, 128 * ratio);
    await page.mouse.click(214 * ratio, 223 * ratio);
    const nextButtonClassList = await page.$eval('#next-button', button => Array.from(button.classList));
    expect(nextButtonClassList.includes("hidden")).toBe(false);
    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem('chosenConstellation');
    });
    expect(item).toBe('Ophiuchus');
  });*/
});