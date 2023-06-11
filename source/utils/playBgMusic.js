// get the music play time of the last page from local storage, then play at that time
export default function playBgMusic(backgroundMusic){
  try {
    backgroundMusic.currentTime = localStorage.getItem("musicPlayTime") | 0;
    backgroundMusic.play();
  } catch (e) {
    console.error(e);
  }
}