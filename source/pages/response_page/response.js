/*
The array of pre-defined answers.
*/
const answers = [
  "Luck is on your side. ",
  "Expect nothing but good fortune ahead. ",
  "You have every reason to be optimistic. ",
  "The universe is conspiring in your favor. ",
  "The future holds great potential for you. ",
  "Without a doubt, things are looking up. ",
  "The stars are aligned in your favor. ",
  "Most Certainly! Good things are coming your way. ",
];

/*
The dictionary of pre-defined interpretation paragraphs for
any given constellation.
*/
const interpretations = {
  Crux: [
    "Just as Crux, the Southern Cross, shines brightly in the night sky, positive changes are on the horizon for you. The universe is aligning in your favor, ready to bring forth transformative and uplifting experiences. Embrace the winds of change with an open heart and a positive mindset. Trust in your inner strength and intuition as you navigate through these changes. The cosmic energy supports your journey, guiding you towards greater joy, fulfillment, and growth. Embrace the blessings that are on their way and have faith that the universe has wonderful things in store for you.",
    "***placeholder text for testing***",
  ],
  Aries: [
    "Just as Aries, the courageous and determined ram, charges forward fearlessly, your current efforts are destined to yield positive outcomes. Your boldness, ambition, and unwavering spirit set the stage for success. Trust in your abilities and continue to persevere with passion and dedication. The universe recognizes your hard work and is aligning circumstances in your favor. Embrace the challenges as opportunities for growth and push forward with confidence. The path you're on is leading you to remarkable achievements. Believe in yourself, stay focused, and watch as the universe rewards your efforts with abundant blessings.",
    "***placeholder text for testing***",
  ],
  Orion: [
    "Just like Orion, the bold and fearless hunter of the skies, positive opportunities are destined to cross your path. The universe recognizes your strength, resilience, and determination. Embrace a mindset of abundance and openness, for the cosmos is conspiring in your favor. Be ready to seize the moments that present themselves and trust in your abilities to make the most of them. Your unwavering spirit will guide you towards new horizons and experiences that will bring fulfillment and joy. Believe in the power of positivity and embrace the journey that lies ahead, for it holds remarkable possibilities and promising outcomes.",
    "***placeholder text for testing***",
  ],
  CanisMajor: [
    "Just like Canis Major, the faithful companion in the night sky, positive changes are on the horizon for you. The universe is aligning to bring transformative and uplifting experiences into your life. Embrace the opportunities that present themselves and be open to new beginnings. Trust in the process of change and have faith in your ability to adapt and grow. The cosmic energy supports your journey, and as you embrace positivity and optimism, you'll witness the unfolding of beautiful moments and rewarding outcomes. Embrace the blessings that await you, for a brighter future is within your reach.",
    "***placeholder text for testing***",
  ],
};

/*
Once called, this function hides away the triggering button, displays 
the fortune teller response as well as the next page button.
*/
function toggleText() {
  let buttonClicked = document.getElementById("visibleButton");
  let text = document.getElementById("hiddenText");
  let button = document.getElementById("hiddenButton");
  buttonClicked.style.display = "none";
  text.style.display = "block";
  button.style.display = "block";

  /*
   Randomly selects one answer from the array of pre-defined answers.
   */
  const random1 = Math.floor(Math.random() * answers.length);
  const answer = answers[random1];
  const span1 = document.createElement("span");
  span1.textContent = answer;
  text.appendChild(span1);

  /*
   Randomly selects an interpretation for a given constellation within
   the dictionary.
   */
  const chosenConstellation = localStorage.getItem("chosenConstellation");
  const random2 = Math.floor(
    Math.random() * interpretations[chosenConstellation].length
  );
  const interpretation = interpretations[chosenConstellation][random2];
  const span2 = document.createElement("span");
  span2.textContent = interpretation;
  text.appendChild(span2);

  const questionInput = localStorage.getItem("questionInput");
}

/*
Once called, the window will be showing the thankyou page.
*/
function goToPage() {
  window.location.href = "../thankyou_page/thankyou.html";
}

/*
Returns a random constellation for testing purposes only.
*/
function getRandomKey() {
  const keyArray = Object.keys(interpretations);
  const randomIndex = Math.floor(Math.random() * 4);
  return keyArray[randomIndex];
}
