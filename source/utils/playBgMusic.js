// get the music play time of the last page from local storage, then play at that time
export default function playBgMusic(backgroundMusic) {
  backgroundMusic.currentTime = localStorage.getItem("musicPlayTime") | 0;
  backgroundMusic.muted = false;
  backgroundMusic.play().catch((error) => {
    console.error(error);
  });
}
