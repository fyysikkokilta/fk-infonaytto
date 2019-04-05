//TODO: hide 'processing request' etc. in lower left corner, for firefox: https://support.mozilla.org/en-US/questions/1196927
//TODO: lörinää
//TODO: käyttäjäystävällinen tapa lisätä urleja/contenttia (esim kuvia/gifejä?) -- config tiedosto?
//TODO: telegram-viestejä jostain???
//~TODOx: lörisevämpiä transitioita
//TODO: kellonajan / viikonpäivän (perjantai) / vuodenajan (esim. wappu) mukaan muovautuvaa contenttia
//TODO: random transition fx
//TODO: lisää lörinää
//TODO: generaattori + CSS countdown.html:lle
//TODO: ohjeet readme:hen
//TODO: muisti vuotaa... ks. https://stackoverflow.com/questions/18644462/avoiding-memory-leaks-loading-content-into-an-iframe -- ainakin HSL sivu aiheuttaa (jos mahdolliset urlit naytto2.html ja hslURLGenerator niin muisti vuotaa)
//TODO: ruokalistat
//TODO: 'kiltiksellä soi nyt' -- ks https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/ http://kylebrumm.com/spotifyCurrentlyPlaying.js/
//TODO: tgpost.html on joskus tyhjä
//TODO: kahvibot
var index = 0;
var topIframe = document.getElementById("topIframe");
var botIframe = document.getElementById("botIframe");
var currentIframeIsTop = true;
var fadeTime = 500;
var loadWaitTime = 500; // wait this long for pages to load in background
var urlManager = new URLManager();
topIframe.src = urlManager.getURL();
botIframe.src = urlManager.getURL();

function newSite() {
    var url = urlManager.getURL();

    var targetFrame = currentIframeIsTop ? botIframe : topIframe;
    targetFrame.src = "about:blank";
    targetFrame.src = url;
    //console.log("loading", url);

    setTimeout(function() {
        // TODO: consider using $(...).load(...) instead of this,
        // see https://stackoverflow.com/questions/164085/javascript-callback-when-iframe-is-finished-loading
        var transition = weighted_choice(transitionEffectsWeighted);
        //console.log("transition: ", transition);
        if(currentIframeIsTop) {
            $(topIframe).hide(transition);
        } else {
            $(topIframe).show(transition);
        }
        currentIframeIsTop = !currentIframeIsTop;
    }, loadWaitTime);
}

//setInterval ( newSite, 10000);
