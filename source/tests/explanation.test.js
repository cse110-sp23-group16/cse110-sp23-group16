//import {constellationList, chosenConstellationName, constellationTitle, constellationDesription, constellationImage, continueButton} from "../../source/pages/explanation_page/explanation.js"
const constel = require('../../source/pages/explanation_page/explanation.js');

describe("LocalStorage Test", () => {
  test("Get choosen constellation from local storage Test", () => {
    expect(constellationList.some(e => e.name === chosenConstellationName)).toBe(true);
  });
});

describe("Constellation Title Test", () => {
  test("Get choosen constellation from local storage Test", () => {
    expect(constellationList.some(e => e.name === chosenConstellationTitle.textContent)).toBe(true);
  });
});

describe("Constellation Description Test", () => {
  test("Get choosen constellation from local storage Test", () => {
    let text = false;
    if (chosenConstellationTitle.textContent !== null){
      text = true;
    }
    expect(text).toBe(true);
  });
});