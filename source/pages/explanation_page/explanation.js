// array of constellations - name, description, imageLink, (myth image later)
let constellationList = [
  {
    name: "Aries",
    description:
      "Aries draws its astrological meaning from the mythological tale of the Golden Ram. Individuals influenced by Aries embody courage, initiative, and ambition. They fearlessly charge ahead like the ram, displaying unwavering bravery and a pioneering spirit. Aries individuals are natural-born leaders, inspiring others with their boldness and determination. Aries symbolizes initiation and new beginnings. Those aligned with this constellation possess a strong drive to start projects and ventures, fearlessly embracing new opportunities with confidence and vitality. They thrive in situations that require taking the first steps and leading the way for others. Aries individuals are ambitious and assertive, propelled by a burning desire to achieve their goals and rise to the top. Aries' astrological meaning is rooted in the myth of the Golden Ram, representing courage, initiative, and ambition. Individuals influenced by Aries fearlessly lead the way, initiating new beginnings and inspiring others to follow suit. Their unwavering bravery and assertiveness drive them toward success, as they fearlessly embrace challenges and set the stage for personal and collective achievements.",
    imageLink: "../../assets/pictures/constellations/Aries.png",
  },
  {
    name: "Canis Major",
    description:
      "Canis Major's astrological meaning is derived from its mythology, particularly associated with the faithful hunting dog Laelaps or Sirius, the brightest star in the night sky. Canis Major represents loyalty, courage, and protection. Individuals influenced by this constellation embody unwavering loyalty and devotion, showing great courage and determination in pursuing their goals. They serve as protectors and guardians, providing a sense of security to those around them. The mythology of Canis Major emphasizes the importance of loyalty and faithfulness. Those aligned with this constellation possess a strong sense of duty and are dedicated to their loved ones. They stand by their commitments and exhibit unwavering loyalty in both personal and professional relationships. Canis Major individuals are known for their courage, fearlessly facing challenges and persevering until they achieve success. Astrologically, Canis Major symbolizes protection and guardianship. Those influenced by this constellation possess a natural instinct to protect and defend. Their presence brings a sense of security and comfort to others, as they serve as reliable protectors. Canis Major individuals are willing to go to great lengths to ensure the well-being and happiness of their loved ones, earning their trust and respect.",
    imageLink: "../../assets/pictures/constellations/CanisMajor.png",
  },
  {
    name: "Crux",
    description:
      "Crux, also known as the Southern Cross, holds astrological significance rooted in its mythology. While it does not have an extensive mythological background, Crux represents guidance, spirituality, and inner transformation. Individuals influenced by this constellation embark on a profound spiritual journey, guided by its symbolism. Crux symbolizes a guiding light on the path of self-discovery. Those aligned with this constellation possess a deep connection to their inner selves and are driven to explore spiritual realms. They seek truth and meaning beyond the surface level of existence, acting as beacons of wisdom and enlightenment for others. Furthermore, Crux represents transformation and rebirth. Individuals connected to this constellation have the ability to undergo significant personal and spiritual transformations throughout their lives. They embrace change and shed old patterns and beliefs that no longer serve them, emerging as stronger and more authentic versions of themselves.",
    imageLink: "../../assets/pictures/constellations/Crux.png",
  },
  {
    name: "Orion",
    description:
      "Orion, a prominent constellation in the night sky, carries astrological significance derived from its rich mythology. In astrology, Orion represents strength, bravery, and the pursuit of greatness. Individuals influenced by this constellation embody these qualities, displaying great courage and determination in their endeavors. Mythologically, Orion was a mighty hunter, known for his exceptional physical strength. Astrologically, those aligned with Orion possess a strong inner strength and resilience. They face challenges head-on, demonstrating unwavering bravery and a never-give-up attitude. Orion individuals are driven by a desire for greatness and are willing to put in the necessary effort and perseverance to achieve their goals. Additionally, Orion represents a quest for adventure and exploration. Like the hunter in mythology, those connected to this constellation possess an adventurous spirit, always seeking new experiences and pushing boundaries. They are not afraid to take risks and venture into uncharted territory, embracing the unknown with enthusiasm and curiosity.",
    imageLink: "../../assets/pictures/constellations/Orion.png",
  },
];

// replace literal string with constellation chosen from skymap page
//const chosenConstellation = constellationList[constellationList.findIndex(item => item.name === "Crux")];

// randomized selected constellation, can remove once transfer of info from skymap page is implemented
const chosenConstellation =
  constellationList[Math.floor(Math.random() * constellationList.length)];

// set title/description of constellation explanation to chosen constellation
const constellationTitle = document.querySelector("h1");
constellationTitle.textContent = chosenConstellation["name"];
const constellationDesription = document.getElementById("description");
constellationDesription.textContent = chosenConstellation["description"];
const constellationImage = document.getElementById("constellation-image");
constellationImage.src = chosenConstellation.imageLink;

const continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click", function () {
  window.location.href = "../response_page/response.html";
});
