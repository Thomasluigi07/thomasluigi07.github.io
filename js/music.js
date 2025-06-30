var DontEvenBother = true;

function check() {
    try {
        var ThisIsNotUsedLmao = window.crossOriginIsolated;
        DontEvenBother = false;
    }
    catch {
        // Use alerts. Remove iframe.
        DontEvenBother = true;
        return
    }
}
