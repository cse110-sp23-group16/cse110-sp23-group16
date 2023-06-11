import * as analyticsManager from "../analyticsmanager.js";
import { setShootingStars } from "../shootingStar.js";
import playClickSound from "../../utils/playClickSound.js";
import playBgMusic from "../../utils/playBgMusic.js";

const analyticsPageName = "explanation";
const analyticsStatus = 1;
let synthExist;
analyticsManager.defaultPageAnalytics(analyticsPageName, analyticsStatus);

/**
 * @property {Function} init retrieves info from previous page
 * @property {Function} initializeConstellation initalize constellations
 * @property {Function} stopTalkWhenReload stop voice over when reload/back a page
 * @property {Function} stopSpeechSynthesis stop voice over
 */

// array of constellations - name, description, constellation image link, myth image link
let constellationList = [
  {
    name: "Aries",
    description:
      "In Greek mythology, the constellation Aries is associated with the story of the Golden Fleece and the heroic adventures of Jason and the Argonauts. To save the children of the king of Boeotia from murder, a divine golden ram was sent by the gods to whisk the siblings away. Although one child was lost, the other, Phrixus, rode the ram to land of Colchis, upon which he sacrificed the ram's fleece to its king, hanging it on a sacred oak tree and tasking a dragon who never slept to guard it. Later, Jason and his crew known as the Argonauts set sail to find the magical fleece, in hopes of using its royal pedigree to claim his throne in Thessaly. Through cunning, guile, and charisma, Jason completed his quest, and returned home to celebration with the divine artifact. As a commemoration of the ram that carried the boy to safety and the Golden Fleece itself, the constellation Aries was created in the sky. From the myths of Jason and Phryxis, is associated with determination, leadership, and adventure.",
    imageLink: "../../assets/constellations/Aries-explanation.png",
    mythLink: "../../assets/myths/Aries-myth.jpeg",
  },
  {
    name: "Canis Major",
    description:
      "Canis Major is associated with the Greek tale of the hunter Orion, and his loyal hunting dog, Sirius. The pair were a peerless team, having tracked and defeated a menagerie of wondrous beasts. Boastful of his unmatched strength and prowess against all creatures of Earth, the gods sent a might scorpion to challenge the hunter. Orion and Sirius tracked down the beast, and although the pair fought hard, they could not defeat the formidable scorpion. After recieving a fatal sting, Orion succumbed to the venom. Despite this, Sirius continued to fight, guarding the body of his partner, until the brave dog too was slain. Wanting to honor both hunter and hound, Zeus immortalized the pair among the stars, Orion with his belt and weapon raised high, and his loyal companion astride next to him, one of the most prominent celestial bodies in the night sky. The story of Sirius and Orion reminds us of the enduring beauty of our friendships, as as such Canis Major represents loyalty, protection, and trust.",
    imageLink: "../../assets/constellations/CanisMajor-explanation.png",
    mythLink: "../../assets/myths/CanisMajor-myth.jpeg",
  },
  {
    name: "Crux",
    description:
      "The constellation Crux, although not tied to single tale, is represented by the guidance and spirituality found in many cultures. One such fable is from the Maori poeple of New Zealand. Known as Te Punga, or The Anchor, Crux was a guiding light to the legendary sailor Maui as he venture to find the mythical islands of Hawaiki. The Australian Aboriginal myth speak of Crux as a representation of different celestials, from the sky deity Mirrabooka, to a great stingray, to the Emu in the Sky. In Tonga it is called the Toloa, the duck, in Somoa it is called Sumu, the triggerfish. Cultures all across the southern hemisphere view the shining cross as a sign of guidance, inner spiritualism, and a portent of significant transformation through its connection to creation and deities.",
    imageLink: "../../assets/constellations/Crux-explanation.png",
    mythLink: "../../assets/myths/Crux-myth.jpeg",
  },
  {
    name: "Orion",
    description:
      "In Greek mythology, the constellation Orion represents the legendary hunter of the same name, famed for his strength, skill, and daring exploits. The son of the sea god Poseidon and the renowned huntress Euryale, Orion grew to be an exceptional hunter, tracking and slaying a whole host of formidable creatures from every forest and plain, to even the Underworld. Boasting of his skills, the gods send a giant scorpion to challenge him, and perhaps quell his arrogant antics. After a fierce battle, Orion strength gave out, and he succumbed to the scorpion's venom. Impressed with his courage and prowess, the king of the gods Zeus immortalized Orion and his loyal hunting dog as constellations among the stars, an eternal hunter with his belt and weapon raised high. From the tales of this legendary hunter, the constellation Orion signifies strength, valor, and the pursuit of great achievements, especially if it involves new experiences and pushing boundaries.",
    imageLink: "../../assets/constellations/Orion-explanation.png",
    mythLink: "../../assets/myths/Orion-myth.jpeg",
  },
  {
    name: "Armadillo Dragon",
    description:
      "The Armadillo Dragon constellation represents a mythical creature blending the qualities of an armadillo and a dragon. Legend has it that this celestial guardian possessed an impenetrable armor-like shell, symbolizing protection and resilience, while embodying the power, wisdom, and mysticism of dragons. In ancient tales, adventurers embarked on quests to find the Armadillo Dragon, believed to safeguard hidden treasures of great value—both material and spiritual. This constellation serves as a reminder to embrace challenges, cultivate inner strength, and embark on personal quests for growth and self-discovery, symbolizing resilience, adaptability, and the pursuit of wisdom.",
    imageLink: "../../assets/constellations/ArmadilloDragon-explanation.png",
    mythLink: "../../assets/myths/ArmadilloDragon-myth.jpeg",
  },
  {
    name: "Carina",
    description:
      "In Greek mythology, the constellation Carina represents the hull of the famous ship Argo Navis, the vessel that carried Jason and the Argonauts on their legendary quest to find the Golden Fleece in Colchis. According to the myth, the ship Argo was constructed by the skilled shipwright Argus, with the guidance of the sagacious goddess Athena. Although often overlooked, the ship Argo played a crucial role in the success of its infamous crew. The ship sailed through treacherous waters, encountered various deadly challenges and divine obstacles, and still reached far-off lands in the search of the sacred artifact. Despite the encounters with mythical creatures, navigational challenges from catastrophic weather, and the antics of its crew, the Argo safely delivered Jason back to Thessaly, truimphant with the completion of his quest. The constellation Carina symbolizes the vessel that carried these heroes on their adventure, and symbolizes exploration, reliability, and perserverence.",
    imageLink: "../../assets/constellations/Carina-explanation.png",
    mythLink: "../../assets/myths/Carina-myth.jpeg",
  },
  {
    name: "Ophiuchus",
    description:
      "The constellation Ophiuchus represents Asclepius, the Greek god of healing and medicine. According to the myth, Asclepius was the son of Apollo and a mortal woman named Coronis. As he grew, Asclepius' skill with medicine became legendary, becoming renowned with his ability to cure the sick and even bring the dead back to life. Although this brought much love among mortals, the god of the Underworld, Hades, grew upset that Asclepius disturbed the cosmic balance between life and death. For this transgression, Zeus was forced to strike down the great healer, as punishment for his interference with the natural order. Yet, even Zeus recognized his accomplishments and contribution to mankind, as honored him by making Asclepius an eternal constellation. Ophiuchus, represented as a serpent held in the arms of the peerless healer, signifies healing and medecine, and is often used a symbol of such today. It represents the balance between life and death, and the pursuit of knowledge for the common good.",
    imageLink: "../../assets/constellations/Ophiuchus-explanation.png",
    mythLink: "../../assets/myths/Ophiuchus-myth.jpeg",
  },
  {
    name: "Ursa Major",
    description:
      "The constellation Ursa Major, the Great Bear, represents the tragic Greek tale of the goddess Callisto. Once a nymph, and an ardent follower of the hunter goddess Artemis, her life took a dark turn when she attracted the attention of Zeus. Disguising himself as Artemis, she decieved and seduced Callisto. Upon learning of Callisto's pregnancy, Artemis exiled her from their hunting band. Callisto would give birth to a son, Arcas, but thereafter transformed into a bear by Zeus' wife, Hera. Arcas grew to be an exceptional hunter, but would one day encounter his mother as a wild bear. As the two prepared to find, Zeus intervened to avoid further tragedy, and placed both mother and son in the sky above as constellations: Callisto as Ursa Major, Arcas as Ursa Minor. One of the most distinctive constellations, Ursa Major is associated with themes of love, betrayal, and transformation, as well as a reminder of the consequences of ones actions.",
    imageLink: "../../assets/constellations/UrsaMajor-explanation.png",
    mythLink: "../../assets/myths/UrsaMajor-myth.jpeg",
  },
];
let backgroundMusic;

let synth;
window.addEventListener("DOMContentLoaded", init);
/**
 * Retrieves info from previous page
 */
function init() {
  backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic);

  initializeConstellation();
  // get chosen voice from localstorage
  const chosenVoice = localStorage.getItem("voiceChoice");
  synth = window.speechSynthesis;
  let utterance = new SpeechSynthesisUtterance();
  let list;
  //Start speaking
  if (chosenVoice != -1) {
    synth.addEventListener("voiceschanged", () => {
      list = synth.getVoices();
      utterance.voice = list[chosenVoice];
      utterance.text = document.getElementById("description").textContent;
      synth.speak(utterance);
      synthExist = 1;
    });
  } else {
    synthExist = -1;
  }
}

/**
 * Initialize the info from the previuos page
 */
function initializeConstellation() {
  // get chosen constellation from localStorage
  const chosenConstellationName = localStorage.getItem("chosenConstellation");
  const chosenConstellation =
    constellationList[
      constellationList.findIndex(
        (item) => item.name === chosenConstellationName
      )
    ];
  console.log(chosenConstellation);

  // set title/description/images of constellation explanation to chosen constellation
  const constellationTitle = document.querySelector("h1");
  constellationTitle.textContent = chosenConstellation["name"];
  const constellationDesription = document.getElementById("description");
  constellationDesription.textContent = chosenConstellation["description"];
  const constellationImage = document.getElementById("constellation-image");
  constellationImage.src = chosenConstellation.imageLink;
  const mythImage = document.getElementById("myth-image");
  mythImage.src = chosenConstellation["mythLink"];
}

const continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click", function () {
  playClickSound(
    document.getElementById("clickSound"),
    localStorage.getItem("questionType"),
    backgroundMusic.currentTime,
    () => (window.location.href = "../response_page/response.html")
  );
  stopSpeechSynthesis();
});

new setShootingStars(document);
stopTalkWhenReload();
/**
 * voiceover stops when page reloaded/goes to previuos page.
 */
function stopTalkWhenReload() {
  //These event listeners stop the voicing when user reload or navigate back to previous page.
  window.addEventListener("beforeunload", stopSpeechSynthesis);
  window.addEventListener("unload", stopSpeechSynthesis);
}

/**
 * stops speech
 */
function stopSpeechSynthesis() {
  if (synthExist == 1 && synth.speaking) {
    synth.cancel();
  }
}
