//TODO: hide 'processing request' etc. in lower left corner, for firefox: https://support.mozilla.org/en-US/questions/1196927 (not trivial)
//TODO: lörinää
//~TODOx: kellonajan / viikonpäivän (perjantai) / vuodenajan (esim. wappu) mukaan muovautuvaa contenttia
//TODO: lisää lörinää
//TODO: kahvibot (yhdistä yllä olevaan?)
//TODO: 'haluatko viestisi tähän?'/palaute -slide -- comic sans + välkkyviä sateenkaaria + delfiinejä
//TODO: sää

var topIframe = document.getElementById("topIframe");
var botIframe = document.getElementById("botIframe");
var currentIframeIsTop = true;
var urlManager = new URLManager();
var initialUrlObj = urlManager.getURL();
botIframe.src = initialUrlObj.url;
topIframe.src = urlManager.getURL().url;

function newSite() {
    var urlObj = urlManager.getURL(); // see urlmanager.js
    var url = urlObj.url;
    var duration = urlObj.duration;

    var targetFrame = currentIframeIsTop ? botIframe : topIframe;
    //targetFrame.src = "about:blank"; // this prevents memory leak (maybe)
    $(targetFrame).empty();
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

    return setTimeout(newSite, duration * 1e3);
}

setTimeout(newSite, initialUrlObj.duration);
