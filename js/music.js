var CanPlayAudio = true;

function soundTest() {
    try {
        var audioElement = document.createElement('audio');
        return !!(audioElement.canPlayType && audioElement.canPlayType('audio/mpeg;').replace(/no/, ''));
    }
    catch (err) {
        return false;
    }
}

function initMusic() {
    CanPlayAudio = soundTest();
    if (CanPlayAudio) {
        var music = document.getElementById('music');
        if (music) {
            var musicPlayer = document.createElement('audio');
            musicPlayer.id = "musicPlayer";
            musicPlayer.setAttribute("autoplay", "autoplay");
            musicPlayer.setAttribute("loop", "loop");
            musicPlayer.setAttribute("muted", "muted");
            musicPlayer.setAttribute("src", music.content);
            var table = document.createElement('td');
            var musicControl = document.createElement('img');
            musicControl.id = "musicControl";
            musicControl.className = "paused";
            musicControl.title = "Music off"
            musicControl.alt = "Music off"
            try {
                musicControl.onclick = function() {toggleMusic(musicPlayer,musicControl); playSoundEffect('sfx_select')};
            } catch {
                if(musicControl.addEventListener){
                    musicControl.addEventListener('click', function(){
                        toggleMusic(musicPlayer,musicControl);
                        playSoundEffect('sfx_select');
                    });
                } else if(musicControl.attachEvent){
                    musicControl.attachEvent('onclick', function(){
                        toggleMusic(musicPlayer,musicControl);
                        playSoundEffect('sfx_select');
                    });
                } else {
                    console.log("Couldn't set up music button properly")
                }
            }
            musicPlayer.pause();
            table.appendChild(musicControl);
            document.getElementById('container').appendChild(musicPlayer);
            document.getElementById('header').querySelector('tr').appendChild(table);
        }
    }
}

function createAudio(name,path) {
    var sfx = document.createElement('audio');
    sfx.id = name;
    sfx.setAttribute("src", path);
    if (document.getElementById('container')) {
        document.getElementById('container').appendChild(sfx);
    } else {
         console.log("Couldn't add sounds");
    }
    return sfx;
}

function initEffects() {
    if (CanPlayAudio) {
        var quicklinks = document.getElementById('quicklinks');
        var navigation = document.getElementById('navigation');
        var footer = document.getElementById('footer');
        var keyboard = document.getElementById('keyboard');
        var musicDir = music.content.substring(0, music.content.indexOf('/') + 1);
        if (musicDir == "../") {
            var musicDir = music.content.substring(0, music.content.indexOf('/') + 4);
            if (musicDir == "../../") {
                // This code sucks balls. God forbid I add more than 2 subdirectories in the future..
                var musicDir = music.content.substring(0, music.content.indexOf('/') + 7);
            }
        } else if (musicDir == "/") {
            // 404 page fix
            var musicDir = music.content.substring(0, music.content.indexOf('/') + 4);
        }
        if (quicklinks && musicDir) {
            var sfx_select = createAudio("sfx_select",musicDir+"select.mp3");
            var sfx_ok = createAudio("sfx_ok",musicDir+"ok.mp3");
            var sfx_hover0 = createAudio("sfx_hover0",musicDir+"hover0.mp3");
            var sfx_hover1 = createAudio("sfx_hover1",musicDir+"hover1.mp3");
            var sfx_hover2 = createAudio("sfx_hover2",musicDir+"hover2.mp3");
            var sfx_hover3 = createAudio("sfx_hover3",musicDir+"hover3.mp3");
            var sfx_hover4 = createAudio("sfx_hover4",musicDir+"hover4.mp3");
            const sfx_hovers = [sfx_hover0,sfx_hover1,sfx_hover2,sfx_hover3,sfx_hover4];
            if (quicklinks) {
                addSoundsToButtons(quicklinks.querySelector('tr'),sfx_hovers,false);
            }
            if (navigation) {
                addSoundsToButtons(navigation.querySelector('tr'),sfx_hovers,true);
            }
            if (footer) {
                addSoundsToButtons(footer.querySelector('p'),sfx_hovers,false);
            }
            var table = document.createElement('td');
            var soundControl = document.createElement('img');
            soundControl.id = "soundControl";
            if (localStorage.getItem("soundEnabled") == "false") {
                soundControl.className = "off";
                soundControl.title = "Sound off"
                soundControl.alt = "Sound off"

            } else {
                soundControl.className = "on";
                soundControl.title = "Sound on"
                soundControl.alt = "Sound on"
            }
            try {
                soundControl.onclick = function() {toggleSound(soundControl); playSoundEffect('sfx_select')};
            } catch {
                if(soundControl.addEventListener){
                    soundControl.addEventListener('click', function(){
                        toggleSound(soundControl);
                        playSoundEffect('sfx_select');
                    });
                } else if(soundControl.attachEvent){
                    soundControl.attachEvent('onclick', function(){
                        toggleSound(soundControl);
                        playSoundEffect('sfx_select');
                    });
                } else {
                    console.log("Couldn't set up music button properly");
                }
            }
            table.appendChild(soundControl);
            document.getElementById('header').querySelector('tr').appendChild(table);
        }
    }
}

function addSoundsToButtons(parent,hovers,alt) {
    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].querySelector('a')) {
            var btn = parent.children[i].children[0];
        } else if (parent.tagName == "P") {
            var btn = parent.children[i]
        } else {
            return
        }
        // Selection sounds. Fuck this code.
        try {
            if (alt) {
                btn.onclick = function() {playSoundEffect(sfx_ok);};
            } else {
                btn.onclick = function() {playSoundEffect(sfx_select);};
            }
        } catch {
            if(btn.addEventListener){
                btn.addEventListener('click', function(){
                    if (alt) {
                        playSoundEffect(sfx_ok);
                    } else {
                        playSoundEffect(sfx_select);
                    }
                });
            } else if(btn.attachEvent){
                btn.attachEvent('onclick', function(){
                    if (alt) {
                        playSoundEffect(sfx_ok);
                    } else {
                        playSoundEffect(sfx_select);
                    }
                });
            } else {
                console.log("Couldn't set up select sound effect");
            }
        }
        // Hover sounds. Fuck this code even more.
        try {
            btn.onmouseover = function() {playSoundEffect(hovers[i]);};
        } catch {
            if(btn.addEventListener){
                btn.addEventListener('mouseover', function(){
                    playSoundEffect(hovers[i]);
                });
            } else if(btn.attachEvent){
                btn.attachEvent('onmouseover', function(){
                    playSoundEffect(hovers[i]);
                });
            } else {
                console.log("Couldn't set up hover sound effect");
            }
        }
    }
}

function playSoundEffect(sound) {
    if (localStorage.getItem("soundEnabled") == "true" || localStorage.getItem("soundEnabled") == null) {
        if (typeof sound === 'string' || sound instanceof String) {
            var snd = document.getElementById(sound)
            if (snd) {
                snd.currentTime = 0;
                snd.play();
            } else {
                console.log("Couldn't find sound "+snd+" in DOM");
            }
        } else {
            sound.currentTime = 0;
            sound.play();
        }
    }
}

function toggleMusic(musicPlayer,musicControl) {
    if (musicPlayer) {
        if (musicPlayer.paused) {
            musicPlayer.play();
            musicPlayer.muted = false;
            if (musicControl) {
                musicControl.title = "Music on";
                musicControl.alt = "Music on";
                musicControl.className = "playing";
            }
        } else {
            musicPlayer.pause();
            musicPlayer.muted = true;
            if (musicControl) {
                musicControl.title = "Music off";
                musicControl.alt = "Music off";
                musicControl.className = "paused";
            }
        }
    }
}

function toggleSound(soundControl) {
    if (soundControl) {
        if (localStorage.getItem("soundEnabled") == "true") {
            soundControl.alt = "Sound off";
            soundControl.className = "off";
            soundControl.title = "Sound off";
            localStorage.setItem("soundEnabled", false);
        } else if (localStorage.getItem("soundEnabled") == "false") {
            soundControl.title = "Sound on";
            soundControl.alt = "Sound on";
            soundControl.className = "on";
            localStorage.setItem("soundEnabled", true);
        } else {
            soundControl.alt = "Sound off"
            soundControl.className = "off";
            soundControl.title = "Sound off"
            localStorage.setItem("soundEnabled", false);
        }
    }
}


if(window.addEventListener){
    window.addEventListener('load', function(){
        initMusic();
        initEffects();
    });
} else if(window.attachEvent){
    window.attachEvent('onload', function(){
        initMusic();
        initEffects();
    });
}
