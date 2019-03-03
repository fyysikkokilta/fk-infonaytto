//TODO: hide 'processing request' etc. in lower left corner, for firefox: https://support.mozilla.org/en-US/questions/1196927
//TODO: eka iframe näkyy liian kauan (?) -- selvitä mitä siinä tapahtuu
//TODO: vaihteleva otsikko aikataulunäytölle
//TODO: modularisointi, urlit jostain tämän filun ulkopuolelta
//TODO: lörinää
//TODO: käyttäjäystävällinen tapa lisätä urleja/contenttia (esim kuvia/gifejä?) -- config tiedosto?
//TODO: telegram-viestejä jostain???
//TODO: lörisevämpiä transitioita
//TODO: kellonajan / viikonpäivän (perjantai) / vuodenajan (esim. wappu) mukaan muovautuvaa contenttia
//TODO: random transition fx
//TODO: lisää lörinää
//TODO: piilota scroll barit iframeista
//TODO: HSL aikataulu ei aina toimi
var index = 0;
var topIframe = document.getElementById("topIframe");
var botIframe = document.getElementById("botIframe");
var currentIframeIsTop = true;
var fadeTime = 500;
var loadWaitTime = 500; // wait this long for pages to load in background
var urlManager = new URLManager();

function newSite() {
    var url = urlManager.getURL();

    if(currentIframeIsTop) {
        botIframe.src = url;
    } else {
        topIframe.src = url;
    }

    setTimeout(function() {
        // TODO: consider using $(...).load(...) instead of this,
        // see https://stackoverflow.com/questions/164085/javascript-callback-when-iframe-is-finished-loading
        if(currentIframeIsTop) {
            //$(topIframe).fadeIn(fadeTime);
            $(topIframe).hide("fold");
        } else {
            $(topIframe).show("drop", {}, "slow");
        }
        currentIframeIsTop = !currentIframeIsTop;
    }, loadWaitTime);
}

setInterval ( newSite, 10000);
