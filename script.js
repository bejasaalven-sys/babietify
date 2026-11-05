
const songs = [
  { title: "My Song 1", src: "music1.mp3" },
  { title: "My Song 2", src: "music2.mp3" },
  { title: "My Song 3", src: "music3.mp3" }
];

const audio = document.getElementById("audio");
const player = document.getElementById("musicPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const trackName = document.getElementById("trackName");
const trackStatus = document.getElementById("trackStatus");

let current = 0;

function loadSong(index) {
  current = (index + songs.length) % songs.length;  // loops around
  audio.src = songs[current].src;
  trackName.textContent = songs[current].title;
}

function playSong() {
  audio.play()
    .then(() => {
      player.classList.add("playing");
      playBtn.textContent = "⏸";
      trackStatus.textContent = "Now playing";
    })
    .catch(() => {
      // happens if the file name/path is wrong
      trackStatus.textContent = "File not found";
    });
}

function pauseSong() {
  audio.pause();
  player.classList.remove("playing");
  playBtn.textContent = "▶";
  trackStatus.textContent = "Paused";
}

playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});

nextBtn.addEventListener("click", () => { loadSong(current + 1); playSong(); });
prevBtn.addEventListener("click", () => { loadSong(current - 1); playSong(); });

// when a song finishes, play the next one automatically
audio.addEventListener("ended", () => { loadSong(current + 1); playSong(); });

loadSong(0);

/* ---------- ACTIVE NAV LINK WHILE SCROLLING ---------- */
const navLinks = document.querySelectorAll(".nav-bar a");
const sections = document.querySelectorAll("#home, #features, #gallery, #about");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));