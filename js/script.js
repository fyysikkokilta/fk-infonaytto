//TODO: hide 'processing request' etc. in lower left corner, for firefox: https://support.mozilla.org/en-US/questions/1196927
//TODO: lörinää
//TODO: telegram-viestejä jostain???
//~TODOx: lörisevämpiä transitioita
//~TODOx: kellonajan / viikonpäivän (perjantai) / vuodenajan (esim. wappu) mukaan muovautuvaa contenttia
//TODO: lisää lörinää
//TODO: generaattori + CSS countdown.html:lle
//~TODOx: muisti vuotaa... ks. https://stackoverflow.com/questions/18644462/avoiding-memory-leaks-loading-content-into-an-iframe -- ainakin HSL sivu aiheuttaa (jos mahdolliset urlit naytto2.html ja hslURLGenerator niin muisti vuotaa)
//TODO: ruokalistat
//TODO: 'kiltiksellä soi nyt' -- ks https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/ http://kylebrumm.com/spotifyCurrentlyPlaying.js/ https://www.inkubio.fi/kiltiscam/
//TODO: tgpost.html on joskus tyhjä
//TODO: kahvibot
//TODO: 'haluatko viestisi tähän?'/palaute -slide

var topIframe = document.getElementById("topIframe");
var botIframe = document.getElementById("botIframe");
var currentIframeIsTop = true;
var urlManager = new URLManager();
botIframe.src = urlManager.getURL();
topIframe.src = urlManager.getURL();

function newSite() {
    var url = urlManager.getURL();

    var targetFrame = currentIframeIsTop ? botIframe : topIframe;
    targetFrame.src = "about:blank"; // this prevents memory leak (maybe)
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
    }, LOAD_WAIT_TIME);
}

setInterval ( newSite, TRANSITION_INTERVAL*1e3);
