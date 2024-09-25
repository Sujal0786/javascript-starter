const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const songImage = document.getElementById('song-image');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
let progress = document.getElementById('progress');
const songs = [
    { name: 'Who-They', artist: 'Karn Aujla', path: 'Music/song3.mp3', image: 'images/song3.jpg' },
    { name: 'Brown Rang', artist: 'Yo Yo Honey Singh', path: 'Music/song2.mp3', image: 'images/song2.jpg' },
    { name: 'Bitch im-Back', artist: 'Sidhu Mossewala', path: 'Music/song1.mp3', image: 'images/song1.png' }
];

let currentSongIndex = 0;

playButton.addEventListener('click', () => {
    if (audio.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});

nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

function playMusic() {
    audio.src = songs[currentSongIndex].path;
    audio.play();
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause');
    updateSongDetails();
}

function pauseMusic() {
    audio.pause();
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playMusic();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playMusic();
}

function updateSongDetails() {
    songImage.src = songs[currentSongIndex].image;
    title.textContent = songs[currentSongIndex].name;
    artist.textContent = songs[currentSongIndex].artist;
}

audio.onloadedmetadata = function() {
    progress.max = audio.duration;
    progress.value = audio.currentTime;
};

audio.ontimeupdate = function() {
    progress.value = audio.currentTime;
};

progress.addEventListener('input', function() {
    audio.currentTime = progress.value;
});