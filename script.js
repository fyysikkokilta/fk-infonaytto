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
//TODO: HSL aikataulu ei aina toimi
var index = 0;
var topIframe = document.getElementById("topIframe");
var botIframe = document.getElementById("botIframe");
var currentIframeIsTop = true;
var fadeTime = 500;
var loadWaitTime = 500; // wait this long for pages to load in background
var urlManager = new URLManager();

//TODO: lörssiä tähän, star-wars tyyliset star wipet, övereimmät powerpoint spinnaukset
//TODO: consider moving to separate file
var transitionEffectsWeighted = [
    [{effect: "blind", duration: "slow"},                       1],
    [{effect: "bounce", distance: 100, times: 5, duration: 1000},   1],
    [{effect: "clip", duration: "slow"},                        1],
    [{effect: "drop", direction: "left", duration: "slow"},     0.25],
    [{effect: "drop", direction: "right", duration: "slow"},    0.25],
    [{effect: "drop", direction: "up",   duration: "slow"},     0.25],
    [{effect: "drop", direction: "down", duration: "slow"},     0.25],
    //[{effect: "explode", duration: "slow"},   1], // doesn't work with 100% scale iframes, see https://stackoverflow.com/questions/13290086/jquery-explode-effect-not-working-with-percentage-width-height
    [{effect: "fade", duration: "slow"},                        1],
    [{effect: "fold", size: "10%", horizFirst: true, duration: "slow"},     0.5],
    [{effect: "fold", size: "10%", horizFirst: false, duration: "slow"},    0.5],
    //[{effect: "highlight", duration: "slow"}, 1], // doesn't seem to work really well
    //[{effect: "puff", percent: 200, duration: "slow"},      1], // doesn't work with 100% widths..
    [{effect: "pulsate", times: 10, duration: 1000},   0.1], // MAXIMUM EPILEPSY, good idea?
    //[{effect: "shake", direction: "left", distance: 100, duration: "slow"},     1], // pretty dumb
    //[{effect: "shake", direction: "up", distance: 100, duration: "slow"},     1], // pretty dumb
    // effect: "size" is ~the same as effect: "scale"
    [{effect: "size", scale: "box", origin: ["top", "left"], duration: "slow"},         0.2],
    [{effect: "size", scale: "box", origin: ["top", "right"], duration: "slow"},        0.2],
    [{effect: "size", scale: "box", origin: ["bottom", "right"], duration: "slow"},     0.2],
    [{effect: "size", scale: "box", origin: ["bottom", "left"], duration: "slow"},      0.2],
    [{effect: "size", scale: "box", origin: ["middle", "center"], duration: "slow"},    0.2],
    [{effect: "slide", direction: "left", duration: "slow"},    0.25],
    [{effect: "slide", direction: "right", duration: "slow"},   0.25],
    [{effect: "slide", direction: "up",   duration: "slow"},    0.25],
    [{effect: "slide", direction: "down", duration: "slow"},    0.25],
];

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
        var transition = weighted_choice(transitionEffectsWeighted);
        //console.log("transition: ", transition.effect);
        if(currentIframeIsTop) {
            $(topIframe).hide(transition);
        } else {
            $(topIframe).show(transition);
        }
        currentIframeIsTop = !currentIframeIsTop;
    }, loadWaitTime);
}

setInterval ( newSite, 10000);
