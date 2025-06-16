// sound manager

// init LocalStorage for settings
if (localStorage.getItem('soundEnabled') == null) {
    localStorage.setItem('soundEnabled', "true");
}
//if (localStorage.getItem('soundStyle') == null) { Leftover stuff
//    localStorage.setItem('soundStyle', "HL1");
//}
//if (localStorage.getItem('musicEnabled') == null) {
//    localStorage.setItem('musicEnabled', "false");
//}

// play sound from audio id
function playSound(audioId, secondAudioId) {
    if (localStorage.getItem('soundEnabled') == "true") {
        if (audioId !== null) {
            if (document.getElementById(audioId) !== null) {
                document.getElementById(audioId).play();
            } else {
                console.warn("Could not find audioId " + audioId + "!");
            }
            if (secondAudioId !== null) {
                if (document.getElementById(secondAudioId) !== null) {
                    document.getElementById(secondAudioId).play();
                } else {
                    if (secondAudioId !== undefined) {
                        console.warn("Could not find secondary audioId " + secondAudioId + "!");
                    }
                }
            } else {
                console.log("No secondary audioId specified!");
            }
        } else {
            console.warn("No audioId specified!");
        }
    }
}

// set/reload sound style
function soundStyleManager(mode, style) {
    if (mode == "set") {
        if (style == 0) {
            console.warn("While the soundStyle has been set, this code is not functional anymore.");
            localStorage.setItem('soundStyle', "HL1");
        } else {
           console.warn("Invalid Style!");
        }
    } else if (mode == "load") {
        console.warn("Loading the soundStyle will break sounds locally. Do not use this function anymore.");
        var soundStyle = "HL1";
        if (document.getElementById("load") !== null) {
            document.getElementById("load").setAttribute("src", "/sound/" + soundStyle + "/load.wav");
            document.getElementById("load").preload = 'auto';
        }
        if (document.getElementById("select") !== null) {
            document.getElementById("select").setAttribute("src", "/sound/" + soundStyle + "/select.wav");
            document.getElementById("load").preload = 'auto';
        }
        if (document.getElementById("back") !== null) {
            document.getElementById("back").setAttribute("src", "/sound/" + soundStyle + "/back.wav");
            document.getElementById("load").preload = 'auto';
        }
        if (document.getElementById("invalid") !== null) {
            document.getElementById("invalid").setAttribute("src", "/sound/" + soundStyle + "/invalid.wav");
            document.getElementById("load").preload = 'auto';
        }
        if (document.getElementById("leavesite") !== null) {
            document.getElementById("leavesite").setAttribute("src", "/sound/" + soundStyle + "/leavesite.wav");
            document.getElementById("load").preload = 'auto';
        }
    } else {
        console.warn("Invalid mode!");
    }
}

// set sound enabled
function setSoundEnabled(enabled) {
    if (enabled == 0) {
        localStorage.setItem("soundEnabled", "true")
    } else if (enabled == 1) {
        localStorage.setItem("soundEnabled", "false")
    } else {
        console.warn("Invalid!");
    }
}

// if this runs it works!!! :)
window.addEventListener('load', function () {
    // soundStyleManager("load"); Not needed anymore as it just is hardcoded to use HL1 now.
    playSound("load");
})
