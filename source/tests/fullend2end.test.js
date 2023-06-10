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
        await page.goto("http://127.0.0.1:8080/source/pages/landing_page/landing.html");
    });

    it("should be titled ", async () => {
        await expect(page.title()).resolves.toMatch("Landing Page");
    });
});

describe("Landing Page Tests", () => {
    beforeAll(async () => {
      await page.goto("http://127.0.0.1:8080/source/pages/landing_page/landing.html");
    });
  
    it("Click start, click health, click next, local storage should be health", async () => {
      // Reset the page
      await page.evaluate(() => {
        localStorage.clear();
      });
      await page.reload();
  
      // check if page is landing page
      const landingURL = await page.url();
      expect(landingURL).toBe("http://127.0.0.1:8080/source/pages/landing_page/landing.html");

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
      await page.waitForTimeout(100);
      await page.waitForSelector("canvas");

      // check if page is skymap page
      const skymapURL = await page.url();
      expect(skymapURL).toBe("http://127.0.0.1:8080/source/pages/skymap_page/skymap.html");
    });

    it("Click start, click health, click next, local storage should be health", async () => {

        // check if page is skymap page
        const skymapURL = await page.url();
        expect(skymapURL).toBe("http://127.0.0.1:8080/source/pages/skymap_page/skymap.html");
        
        // Navigate through the landing page to get to skymap
        /*
        const confirmbutton = await page.$("#confirm");
        await confirmbutton.click();
        await page.waitForTimeout(100);
        const tutorialbutton = await page.$("#tutorial");
        await tutorialbutton.click();
        await page.waitForTimeout(100);
        const nextbutton = await page.$("#next-button");
        await nextbutton.click();
        //await page.waitForSelector("canvas");
        */
    
        // click to hide tutorial
        const hideButton = await page.$("#hide");
        await hideButton.click();
        await page.waitForTimeout(100);
    
        await page.evaluate(() => {
            localStorage.setItem("chosenConstellation", "Canis Major");
        });

    });

    it("Check if chosen constellation in local storage is Canis Major, click next to go to response page", async () => {
        await page.goto("http://127.0.0.1:8080/source/pages/explanation_page/explanation.html");

        // check if page is explanation page
        const pageURL = await page.url();
        expect(pageURL).toBe("http://127.0.0.1:8080/source/pages/explanation_page/explanation.html");
    
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
        expect(chosenConstellation).not.toBe("");
    
        // check that title is Canis Major
        await page.waitForSelector("h1");
        const textContent = await page.evaluate(
          () => document.querySelector("h1").textContent
        );
    
        expect(textContent).toBe("Canis Major");

        // check that explanation is not null
        await page.waitForSelector("p");
        const explanation = await page.evaluate(
          () => document.querySelector("p").textContent
        );
        expect(explanation).not.toBe("");

        // check that image is not empty
        let serachElemnt='img_container';
        let checkForElement = await page.evaluate((sel)=>{
            let elementCheck =Array.from(document.querySelectorAll(sel));
            if(elementCheck.length){
                return true
            }else return false;

        },serachElemnt);
        console.log(checkForElement);
    
        //click continue to go to next page
        const continueButton = await page.$("#continue-button");
        await continueButton.click();
        await page.waitForTimeout(100);

        // check if page is response page
        const responseURL = await page.url();
        expect(responseURL).toBe("http://127.0.0.1:8080/source/pages/response_page/response.html");
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
        await page.waitForTimeout(100);

        // check if on thank you page
        const thankyouURL = await page.url();
        expect(thankyouURL).toBe("http://127.0.0.1:8080/source/pages/thankyou_page/thankyou.html");
    });

    it("Click Home to go back to landing page", async () => {
        // check if on thank you page
        const thankyouURL = await page.url();
        expect(thankyouURL).toBe("http://127.0.0.1:8080/source/pages/thankyou_page/thankyou.html");
    
        const homeButton = await page.$('button');
        await homeButton.click();
        await page.waitForTimeout(100);
    
        const landingURL = await page.url();
        expect(landingURL).toBe("http://127.0.0.1:8080/source/pages/landing_page/landing.html");
    });
});