// this many of the last displayed urls are discarded when selecting the next one.
const MAX_RECENT_URLS = 4;

// This list can have either strings or functions that generate an URL string.
// The URLManager.getURL method takes care of finding out which is the case and
// calling the function if needed.
var urlsWeighted = [
    //["example.com", 9999], // local file
    //["naytto2.html", 9999], // local file
    ["inspirobot.html", 0.5],
    [HSLTimetableURLGenerator, 2],
    ["https://en.wikipedia.org/wiki/Special:Random", 0.1],
    ["tgpost.html", 0.5],
    ["countdown_ullis.html?title=Aikaa wappuun&timestamp=1556658000", 1.], // TODO: generate timestamp based on year, weight by time until wappu
];

var maxRecentUrls = Math.min(MAX_RECENT_URLS, urlsWeighted.length - 1);

class URLManager {
    constructor() {
        this.index = 0;
        this.recentUrls = [0];
    }
    getURL() {
        var i;
        do {
            i = weighted_choice(urlsWeighted, true);
        } while (i == undefined || i == this.index || this.recentUrls.includes(i));

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
};
