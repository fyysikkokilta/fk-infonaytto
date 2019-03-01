/*
 * TODO: hide 'processing request' etc. in lower left corner
 * instructions for firefox: https://support.mozilla.org/en-US/questions/1196927
 */
var index = 0;
var urls = [
    "https://fyysikkokilta.fi",
    "https://www.example.com",
    "naytto2.html", // local file
    "http://hsl.trapeze.fi/traveller/web?command=fullscreen&id=FyyKiOK&title=lors&cols=2&extracolumn=stop",
    "https://giphy.com/explore/random"
];
var topIframe = document.getElementById("topIframe");
var botIframe = document.getElementById("botIframe");
var currentIframeIsTop = false;
var fadeTime = 500;
var loadWaitTime = 500; // wait this long for pages to load in background

//currentIframe.src = urls[]

function newSite() {
    //currentIframe = otherIframe;
    //iframeIdx = 1 - iframeIdx;
    //otherIframe = iframes[iframeIdx];

    //otherIframe.src = urls[index];
    index = (index + 1) % urls.length;
    var url = urls[index];

    //currentIframe.style["display"] = "block";
    //$(otherIframe).fadeOut(500)
    if(currentIframeIsTop) {
        console.log("setting top url to " + url);
        topIframe.src = url;
    } else {
        console.log("setting bottom url to " + url);
        botIframe.src = url;
    }

    setTimeout(function() {
        // TODO: consider using $(...).load(...) instead of this,
        // see https://stackoverflow.com/questions/164085/javascript-callback-when-iframe-is-finished-loading
        if(currentIframeIsTop) {
            console.log("fade in");
            $(topIframe).fadeIn(fadeTime);
        } else {
            console.log("fade out");
            $(topIframe).fadeOut(fadeTime);
        }
        console.log("flipping variable");
        currentIframeIsTop = !currentIframeIsTop;
    }, loadWaitTime);
}

setInterval ( newSite, 5000);
