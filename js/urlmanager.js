// URL manager class

// This list can have either strings or functions that generate an URL string.
// The URLManager.getURL method takes care of finding out which is the case and
// calling the function if needed.
var urlsWeighted = [
    //["example.com", 9999], // local file
    //["html/naytto2.html", 9999], // local file
    ["html/inspirobot.html", 0.1],
    [HSLTimetableURLGenerator, 2],
    ["https://en.wikipedia.org/wiki/Special:Random", 0.1], // TODO: consider https://github.com/patelnav/wiki-embed
    ["html/tgpost.html", 0.5],
    ["html/wappu/countdown_ullis.html?title=Aikaa wappuun&timestamp=1556658000", 1.], // TODO: generate timestamp based on year, weight by time until wappu
    [PerjantaiURLGenerator, 0.2],
    //["html/kanttiinit.html", 2], //TODO
    //["https://www.inkubio.fi/kiltiscam/", 0.5],
    //["https://www.inkubio.fi/kiltiscam/kiltahuone.jpg", 0.5], //TODO: own html file for this to fit image
];

// -2 because PerjantaiURLGenerator can be invalid on certain days
const maxRecentUrls = Math.min(MAX_RECENT_URLS, urlsWeighted.length - 2);

class URLManager {
    constructor() {
        this.index = -1;
        this.recentUrls = [];
    }
    getURL() {
        var i;
        do {
            i = weighted_choice(urlsWeighted, true);
        } while (!this.check_index(i));

        if(this.recentUrls.length >= maxRecentUrls) {
            this.recentUrls.shift(); // pop first element
        }
        this.index = i;
        this.recentUrls.push(i);
        var url = urlsWeighted[this.index][0];
        if(typeof(url) === "function") {
            // if it's a generator, generate
            url = url();
        }
        //console.log("url:", url, "index:", i, "recents:", this.recentUrls);
        return url;
    }

    check_index(i) {
        // check whether a given index leads to a valid url
        if(i == undefined) return false;
        if(i == this.index && maxRecentUrls >= 1) return false;
        if(this.recentUrls.includes(i) && maxRecentUrls >= 1) return false;

        // some url generators such as PerjantaiURLGenerator return null or undefined or false if they're not applicable right now
        var url = urlsWeighted[i][0];
        url = typeof(url) == "function" ? url() : url;
        if(!Boolean(url)) return false;

        return true;
    }
};
