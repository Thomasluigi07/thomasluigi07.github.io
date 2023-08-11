// sound manager

if (localStorage.getItem('soundEnabled') == null && localStorage.getItem('soundStyle') == null && localStorage.getItem('musicEnabled') == null) {
    localStorage.setItem('soundEnabled', "true");
    localStorage.setItem('soundStyle', "HL1");
    localStorage.setItem('musicEnabled', "false");
}

function playSound(audioId, secondAudioId) {
    if (localStorage.getItem('soundEnabled') == "true") {
        if (audioId !== null) {
            if (document.getElementById(audioId) !== null) {
                document.getElementById(audioId).currentTime = 0;
                document.getElementById(audioId).load();
                document.getElementById(audioId).play();
            } else {
                console.warn("Could not find audioId " + audioId + "!");
            }
            if (secondAudioId !== null) {
                if (document.getElementById(secondAudioId) !== null) {
                    document.getElementById(secondAudioId).currentTime = 0;
                    document.getElementById(secondAudioId).load();
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

function soundStyleManager(mode,style) {
    if (mode == "set") {
        if (style == 0) {
            localStorage.setItem('soundStyle', "HL1");
        } else if (style == 1) {
            localStorage.setItem('soundStyle', "XBOX360");
        } else if (style == 2) {
            localStorage.setItem('soundStyle', "XBOX360NXE");
        } else if (style == 3) {
            localStorage.setItem('soundStyle', "XBOX");
        } else if (style == 4) {
            localStorage.setItem('soundStyle', "GAMECUBE");
        } else {
            console.warn("Invalid Style!");
        }
    } else if (mode == "load") {
        var soundStyle = localStorage.getItem("soundStyle");
        if (document.getElementById("load") !== null) {
            document.getElementById("load").setAttribute("src","./sound/" + soundStyle + "/load.wav");
        }
        if (document.getElementById("select") !== null) {
            document.getElementById("select").setAttribute("src","./sound/" + soundStyle + "/select.wav");
        }
        if (document.getElementById("back") !== null) {
            document.getElementById("back").setAttribute("src","./sound/" + soundStyle + "/back.wav");
        }
        if (document.getElementById("invalid") !== null) {
            document.getElementById("invalid").setAttribute("src","./sound/" + soundStyle + "/invalid.wav");
        }
        if (document.getElementById("leavesite") !== null) {
            document.getElementById("leavesite").setAttribute("src","./sound/" + soundStyle + "/leavesite.wav");
        }
    } else {
        console.warn("Invalid mode!");
    }
}

function setSoundEnabled(enabled) {
    if (enabled == 0) {
        localStorage.setItem("soundEnabled", "true")
    } else if (enabled == 1) {
        localStorage.setItem("soundEnabled", "false")
    } else {
        console.warn("Invalid!");
    }
}


window.addEventListener('load', function () {
    soundStyleManager("load");
    playSound("load");
})
