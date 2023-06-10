describe("Response page tests", () => {
  beforeAll(async () => {
    await page.goto(
      "http://127.0.0.1:8080/source/pages/response_page/response.html"
    );
  });

  it("should have correct response for health and Aries", async () => {
    await page.evaluate(() => {
      localStorage.setItem("questionType", "health");
      localStorage.setItem("chosenConstellation", "Aries");
    });
    const visiblebutton = await page.$("#visibleButton");
    await visiblebutton.click();
    await page.waitForTimeout(10000);

    const content = await page.evaluate(() => {
      const pTag = document.querySelector("#hiddenText");
      return pTag.textContent;
    });

    const array = [
      "The constellation Aries illuminates your health and well-being with its vibrant energy. Embrace this dynamic force and channel it towards nurturing your physical and mental health. Aries encourages you to take charge of your well-being, adopt a proactive approach, and make positive lifestyle choices. Prioritize regular exercise, nourish your body with wholesome foods, and practice self-care to enhance your vitality. With the energetic influence of Aries, your health will thrive, and you will experience a renewed sense of strength and vitality.",
      "Under the influence of the constellation Aries, your health is infused with a powerful surge of energy and resilience. Trust in your body's innate ability to heal and rejuvenate. This is a time to focus on self-care and prioritize your well-being. Engage in activities that bring you joy, manage stress effectively, and maintain a balanced lifestyle. Aries reminds you to listen to the needs of your body and take proactive steps to ensure its vitality. Embrace the invigorating energy of Aries, and your health will flourish, allowing you to lead a vibrant and fulfilling life.",
      "The presence of the constellation Aries in your health sector signifies a period of vitality and rejuvenation. Aries encourages you to embrace an active and adventurous approach to your well-being. Engage in physical activities that you enjoy, try new forms of exercise, and nourish your body with nutritious foods. Embrace the spirit of Aries to cultivate a positive mindset and resilience in the face of challenges. Trust in the dynamic energy of Aries to empower you on your health journey, leading to improved well-being and a zestful life.",
    ];

    let iscorrect = false;
    if (array.includes(content.trim())) {
      iscorrect = true;
    }
    expect(iscorrect).toBe(true);
  }, 15000);

  it("should have correct response for career and Crux", async () => {
    await page.evaluate(() => {
      localStorage.setItem("questionType", "career");
      localStorage.setItem("chosenConstellation", "Crux");
    });
    await page.reload();
    const visiblebutton = await page.$("#visibleButton");
    await visiblebutton.click();
    await page.waitForTimeout(10000);

    const content = await page.evaluate(() => {
      const pTag = document.querySelector("#hiddenText");
      return pTag.textContent;
    });

    const array = [
      "The constellation Crux reveals that your career path is aligned with your true purpose. Just as Crux stands as a guiding beacon in the night sky, your professional journey will lead you towards success and fulfillment. Trust in your unique talents and abilities, and seize the opportunities that come your way. With determination and perseverance, you will soar to new heights and achieve the professional recognition you deserve.",
      "Like the stars of Crux shining brightly, your career is about to experience a significant breakthrough. The celestial alignment indicates that a door of opportunity is about to open, propelling you towards a path of advancement and growth. Embrace this moment with confidence and courage, and be ready to take on new challenges and responsibilities. Success awaits you, and your hard work will be rewarded handsomely.",
      "The constellation Crux illuminates your career with its radiant energy. It signifies that you are on the right track and that your efforts will yield positive results. Have faith in your abilities and trust the path you have chosen. As you navigate the professional realm, remember to stay true to yourself and your values. Your authenticity will shine brightly, attracting opportunities and success. Keep moving forward with passion and determination, and you will achieve remarkable accomplishments in your chosen field.",
    ];

    let iscorrect = false;
    if (array.includes(content.trim())) {
      iscorrect = true;
    }
    expect(iscorrect).toBe(true);
  }, 15000);

  it("should have correct response for relationship and Orion", async () => {
    await page.evaluate(() => {
      localStorage.setItem("questionType", "relationship");
      localStorage.setItem("chosenConstellation", "Orion");
    });
    await page.reload();
    const visiblebutton = await page.$("#visibleButton");
    await visiblebutton.click();
    await page.waitForTimeout(10000);

    const content = await page.evaluate(() => {
      const pTag = document.querySelector("#hiddenText");
      return pTag.textContent;
    });

    const array = [
      "The celestial presence of Orion bestows upon your relationship a sense of unity and strength. Just as Orion stands tall and unwavering in the night sky, so too shall your bond endure the tests of time. Trust in the deep connection you share with your partner, and let your love radiate like the stars. Embrace open communication, support each other's dreams, and create a foundation built on trust and mutual understanding. With the guidance of Orion, your relationship will flourish, shining brightly as a beacon of love and harmony.",
      "The constellation Orion signifies a period of passion and adventure in your relationship. Allow the dynamic energy of Orion to inspire you and your partner to embark on new journeys together. Explore new experiences, nurture shared interests, and embrace spontaneity. This is a time for deepening your connection through excitement and mutual exploration. Trust in the strength of your bond, and let the guiding light of Orion guide you towards a relationship filled with love, joy, and memorable adventures.",
      "Under the celestial influence of Orion, your relationship is set to experience a profound sense of balance and harmony. Just as the stars in Orion's belt align perfectly, so too shall you and your partner find equilibrium in your union. Embrace the qualities of understanding, compromise, and respect. Listen to each other's needs and support one another's growth. Trust that the cosmic energy of Orion will guide you towards a relationship filled with mutual love, deep connection, and lasting happiness.",
    ];

    let iscorrect = false;
    if (array.includes(content.trim())) {
      iscorrect = true;
    }
    expect(iscorrect).toBe(true);
  }, 15000);

  it("should have correct response for daily horoscope and Canis Major", async () => {
    await page.evaluate(() => {
      localStorage.setItem("questionType", "daily");
      localStorage.setItem("chosenConstellation", "Canis Major");
    });
    await page.reload();
    const visiblebutton = await page.$("#visibleButton");
    await visiblebutton.click();
    await page.waitForTimeout(10000);

    const content = await page.evaluate(() => {
      const pTag = document.querySelector("#hiddenText");
      return pTag.textContent;
    });

    const array = [
      "Under the celestial influence of Canis Major, today may bring challenges and obstacles that test your patience and resilience. It is important to approach the day with caution and be prepared for unexpected setbacks or disappointments. Stay grounded and maintain a realistic perspective, as things may not unfold as you had hoped. However, remember that challenges can be valuable lessons in disguise, providing opportunities for personal growth and self-reflection.",
      "The presence of Canis Major suggests a day of uncertainty and unpredictability in your daily horoscope. Plans may change abruptly, and circumstances may not align with your expectations. It is crucial to remain flexible and adapt to the changing situations. Avoid making impulsive decisions and take the time to assess the options before taking action. Remember that even in challenging times, you have the inner strength to navigate through difficulties and find your way forward.",
      "Under the influence of Canis Major, your daily horoscope indicates a period of low energy and potential setbacks. You may encounter obstacles or face a lack of motivation and enthusiasm. It is important to take care of yourself and prioritize self-care during this time. Be patient and gentle with yourself, allowing for rest and rejuvenation. While today may not bring the desired outcomes, remember that each day is an opportunity for growth and renewal. Use this time to reflect on your goals and realign your intentions for a more positive future.",
    ];

    let iscorrect = false;
    if (array.includes(content.trim())) {
      iscorrect = true;
    }
    expect(iscorrect).toBe(true);
  }, 15000);

  it("should have correct response for relationship and Ophiuchus", async () => {
    await page.evaluate(() => {
      localStorage.setItem("questionType", "relationship");
      localStorage.setItem("chosenConstellation", "Ophiuchus");
    });
    await page.reload();
    const visiblebutton = await page.$("#visibleButton");
    await visiblebutton.click();
    await page.waitForTimeout(10000);

    const content = await page.evaluate(() => {
      const pTag = document.querySelector("#hiddenText");
      return pTag.textContent;
    });

    const array = [
      "Under the influence of Ophiuchus, your relationship may experience periods of mistrust and power struggles. Be cautious of manipulative behaviors or hidden agendas that could disrupt the harmony. Communication breakdowns and unresolved conflicts may arise, requiring careful navigation to maintain the relationship's stability.",
      "The Ophiuchus constellation warns of challenges and conflicts in your relationship. Emotional distance and a lack of understanding may strain the connection between you and your partner. It is crucial to address the underlying issues and engage in open and honest communication to restore harmony. However, be prepared for difficult conversations and potential compromises.",
      "Under the influence of Ophiuchus, your relationship may encounter periods of instability and uncertainty. Trust issues and a lack of compatibility may surface, causing doubts about the long-term prospects. It is important to have realistic expectations and be willing to reassess the relationship's dynamics. This period may require personal growth and introspection to find a resolution.",
    ];

    let iscorrect = false;
    if (array.includes(content.trim())) {
      iscorrect = true;
    }
    expect(iscorrect).toBe(true);
  }, 15000);
});
