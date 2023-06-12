// play click sound, optional callback function to be called after sound ends
export default function playClickSound(
  clickSound,
  category,
  bgMusicPlayTime = null,
  callback = null
) {
  if (callback === null) {
    return null;
  } else {
    return callback();
  }
  const categoryToSoundPath = {
    daily: "../../assets/music/dailyClick.mp3",
    relationship: "../../assets/music/relationshipClick.mp3",
    career: "../../assets/music/careerClick.mp3",
    health: "../../assets/music/healthClick.mp3",
  };
  clickSound.src = categoryToSoundPath[category];
  clickSound.onended = callback;
  localStorage.setItem("musicPlayTime", bgMusicPlayTime);
  clickSound.play().catch((err) => callback());
}
