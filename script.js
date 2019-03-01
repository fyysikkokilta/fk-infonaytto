var index = 0;
var urls = ["https://fyysikkokilta.fi", "https://www.example.com"];
var iframes = document.getElementsByClassName("myIframe"); // TODO: rename class
console.log(iframes);
var iframeIdx = 0;
var currentIframe = iframes[iframeIdx];
var otherIframe = iframes[1 - iframeIdx];

function newSite() {
    currentIframe = otherIframe;
    iframeIdx = 1 - iframeIdx;
    otherIframe = iframes[iframeIdx];

    currentIframe.src = urls[index];
    index = (index + 1) % urls.length;

    currentIframe.style["display"] = "block";
    $(otherIframe).fadeOut(500)
}

setInterval ( newSite, 5000);
