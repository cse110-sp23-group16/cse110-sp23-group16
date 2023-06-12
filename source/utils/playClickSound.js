// play click sound, optional callback function to be called after sound ends
export default function playClickSound(
  clickSound,
  category,
  bgMusicPlayTime = 0,
  callback = null
) {
  const categoryToSoundPath = {
    daily: "../../assets/music/dailyClick.mp3",
    relationship: "../../assets/music/relationshipClick.mp3",
    career: "../../assets/music/careerClick.mp3",
    health: "../../assets/music/healthClick.mp3",
  };
  clickSound.src = categoryToSoundPath[category];
  if (callback !== null) {
    clickSound.onended = callback;
  }
  localStorage.setItem("musicPlayTime", bgMusicPlayTime);
  clickSound.play().catch((err) => {
    // if play() fails, just call callback without playing sound
    if (callback !== null) callback();
  });
}
