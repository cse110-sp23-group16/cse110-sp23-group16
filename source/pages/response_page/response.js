import { setShootingStars } from "../shootingStar.js";
let synth;
const categories = ["relationship", "career", "health", "daily"];
const constellations = [
  "Crux",
  "Aries",
  "Orion",
  "Canis Major",
  "Ursa Major",
  "Carnia",
  "Ophiuchus",
  "Armadillo Dragon",
];
const errorMsg =
  "Please try again later by selecting both your question and your constellation. You will now be taken to the home page.";

const openingSentences = [
  "Welcome, seeker of destiny! Step into the realm of possibilities.",
  "Greetings, curious soul! Let me unveil the secrets that lie ahead.",
  "Welcome, traveler of fate! Allow me to guide you on your journey.",
  "Enter, brave adventurer! Your future awaits in the palm of my hand.",
  "Ah, welcome, seeker of truth! Let me weave the tapestry of your fate.",
  "Step into my parlor, weary wanderer! Let me illuminate the path ahead.",
  "Welcome, inquisitive one! Prepare to unravel the enigma of your destiny.",
  "Ah, you've arrived! Brace yourself for a glimpse into the universe's secrets.",
  "Greetings, seeker of answers! Trust in the whispers of the universe that brought you here.",
  "Welcome, dear one! Let the dance of divination commence.",
];

/*
Once called, this function hides away the triggering button, displays 
the fortune teller response as well as the next page button.
*/
function toggleText() {
  let buttonClicked = document.getElementById("visibleButton");
  let explanation = document.getElementById("explanation");
  let text = document.getElementById("hiddenText");
  let button = document.getElementById("hiddenButton");
  explanation.classList.add("glow");
  buttonClicked.classList.add("removed");

  const chosenConstellation = localStorage.getItem("chosenConstellation");
  const questionInput = localStorage.getItem("questionType");

  explanation.classList.remove("hidden");
  button.classList.remove("hidden");

  if (chosenConstellation && questionInput) {
    fetchResponses(questionInput, chosenConstellation)
      .then((answer) => {
        animateText(answer, text);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    const answer = errorMsg;
    displayText(answer, text);
    setTimeout(() => {
      redirectToPage("../landing_page/landing.html");
    }, 5000);
  }
}

/**
 * Function to fetch response from the JSON file.
 *
 * @param {string} questionInput - The question input.
 * @param {string} chosenConstellation - The chosen constellation.
 * @returns {Promise<string>} A promise that resolves with the fetched response.
 */
function fetchResponses(questionInput, chosenConstellation) {
  return fetch("all_responses.json")
    .then((response) => response.json())
    .then((data) => {
      return data[questionInput][chosenConstellation][
        Math.floor(Math.random() * 3)
      ];
    });
}

/**
 * Function to show the response text word by word.
 *
 * @param {string} answer - The response answer.
 * @param {HTMLElement} textElement - The text element to animate.
 */
function animateText(answer, textElement) {
  let index = 0;
  let interval;
  const words = answer.split(" ");
  speak(answer);
  interval = setInterval(showNextCharacter, 100);

  function showNextCharacter() {
    if (index < words.length) {
      textElement.textContent += words[index] + " ";
      index++;
    } else {
      clearInterval(interval);
      explanation.classList.remove("glow");
    }
  }
}

/**
 * Function to display text.
 *
 * @param {string} answer - The text to display.
 * @param {HTMLElement} textElement - The text element to display the text in.
 */
function displayText(answer, textElement) {
  textElement.textContent = answer;
}

/**
 * Function to redirect to a page.
 *
 * @param {string} url - The URL of the page to redirect to.
 */
function redirectToPage(url) {
  window.location.href = url;
}

/*
Once called, the window will be showing the thankyou page.
*/
function goToPage() {
  window.location.href = "../thankyou_page/thankyou.html";
  synth.cancel();
}

function speak(text) {
  const chosenVoice = localStorage.getItem("voiceChoice");
  if (chosenVoice == -1) {
    return;
  }
  let utterance = new SpeechSynthesisUtterance();
  let list;
  synth = window.speechSynthesis;
  synth.addEventListener("voiceschanged", () => {
    list = synth.getVoices();
    utterance.voice = list[chosenVoice];
    utterance.text = text;
    synth.speak(utterance);
  });
}
/*
Main section rising up to its position (animated transition)
*/
window.addEventListener("load", function () {
  var mainContent = document.querySelector("main");
  var desiredPosition = 0;

  setTimeout(function () {
    mainContent.style.top = desiredPosition + "px";
  }, 100);

  const h2Element = document.getElementById("fortune-opening");
  const randomSentence =
    openingSentences[Math.floor(Math.random() * openingSentences.length)];
  h2Element.textContent = randomSentence;

  new setShootingStars(document);

  window.toggleText = toggleText;
  window.goToPage = goToPage;
});

//These event listeners stop the voicing when user reload or navigate back to the previous page
window.addEventListener("beforeunload", stopSpeechSynthesis);

function stopSpeechSynthesis() {
  synth.cancel();
}
