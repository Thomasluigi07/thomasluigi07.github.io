var CanPlayMusic = true;

function soundTest() {
    try {
        var audioElement = document.createElement('audio');
        return !!(audioElement.canPlayType && audioElement.canPlayType('audio/mpeg;').replace(/no/, ''));
    }
    catch {
        return false;
    }
}

function initAudio() {
    CanPlayMusic = soundTest();
    if (CanPlayMusic) {
        var music = document.getElementById('music');
        if (music) {
            var musicPlayer = document.createElement('audio');
            musicPlayer.id = "musicPlayer";
            musicPlayer.setAttribute("autoplay", "autoplay");
            musicPlayer.setAttribute("loop", "loop");
            musicPlayer.setAttribute("muted", "muted");
            musicPlayer.setAttribute("src", music.content);
            var musicControl = document.createElement('img');
            musicControl.id = "musicControl";
            musicControl.className = "paused";
            try {
                musicControl.onclick = function() {toggleMusic(musicPlayer,musicControl);};
            } catch {
                if(musicControl.addEventListener){
                    musicControl.addEventListener('click', function(){
                        toggleMusic(musicPlayer,musicControl);
                    });
                } else if(musicControl.attachEvent){
                    musicControl.attachEvent('onclick', function(){
                        toggleMusic(musicPlayer,musicControl);
                    });
                } else {
                    console.log("Couldn't set up onclick")
                }
            }
            musicPlayer.pause();
            var a = document.getElementsByClassName('header');
            var header = a[0];
            document.querySelector('container').appendChild(musicPlayer);
            document.querySelector('footer').children[0].appendChild(musicControl);
        }
    }
}

function toggleMusic(musicPlayer,musicControl) {
    if (musicPlayer) {
        if (musicPlayer.paused) {
            musicPlayer.play();
            musicPlayer.muted = false;
            if (musicControl) {
                musicControl.className = "playing";
            }
        } else {
            musicPlayer.pause();
            musicPlayer.muted = true;
            if (musicControl) {
                musicControl.className = "paused";
            }
        }
    }
}

if(window.addEventListener){
    window.addEventListener('load', function(){
        initAudio();
    });
} else if(window.attachEvent){
    window.attachEvent('onload', function(){
        initAudio();
    });
}
