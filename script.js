const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


const TipoKakuzu = {
    songName: 'Ninja Rico - Tipo Kakuzu',
    artist: 'MHRAP',
    file: 'Ninja_Rico_Tipo_Kakuzu',
    liked: false,
};
const Tipoakatsuki1 = {
    songName: 'Tipo Akatsuki 1',
    artist: 'MHRAP',
    file: 'Tipo_akatsuki_1',
    liked: false,
};
const Tipoakatsuki2 = {
    songName: 'Tipo Akatsuki 2',
    artist: 'MH',
    file: 'Tipo_akatsuki_2',
    liked: false,
};
const TipoHashirama = {
    songName: 'Tipo Hashirama',
    artist: 'MHRAP',
    file: 'Tipo Hashirama',
    liked: false,
};
const TipoJiraya = {
    songName: 'Tipo Jiraya',
    artist: 'MHRAP',
    file: 'Tipo Jiraya',
    liked: false,
};
const TipoMinato = {
    songName: 'Tipo Minato',
    artist: 'MHRAP',
    file: 'Tipo Minato',
    liked: false,
};
const TipoShikamaru = {
    songName: 'Tipo Shikamaru',
    artist: 'MHRAP',
    file: 'Tipo Shikamaru',
    liked: false,
};
const TipoTobi = {
    songName: 'Tipo Tobi',
    artist: 'MHRAP',
    file: 'Tipo Tobi',
    liked: false,
};

const DeathNote = {
    songName: 'Death Note',
    artist: '7 minutoz',
    file: 'Death Note',
    liked: false,
};

const SuperHerois = {
    songName: 'Super Heróis',
    artist: '7 minutoz',
    file: 'Super Heróis',
    liked: false,
};
const ValeDoFim = {
    songName: 'Vale do Fim',
    artist: '7 minutoz',
    file: 'Vale Do Fim',
    liked: false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;


const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [TipoKakuzu, Tipoakatsuki1, Tipoakatsuki2, TipoHashirama, TipoJiraya, TipoMinato, TipoShikamaru, TipoTobi, DeathNote, SuperHerois, ValeDoFim];
let sortedPlaylist = [...originalPlaylist];


let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }
}
function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }
    else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function inicializeSong() {
    cover.src = `/Estudo JS/img/${sortedPlaylist[index].file}.webp`;
    song.src = `/Estudo JS/Songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    inicializeSong();
    playSong();
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    inicializeSong();
    playSong();
}

function upgradeprogress() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);

}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpTotime = (clickPosition / width) * song.duration;
    song.currentTime = jumpTotime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');

    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');

    }

}

function likeButtoncliked() {
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    }
    else {
        playSong();
    }
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

inicializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', upgradeprogress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtoncliked);

