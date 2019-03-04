// this many of the last displayed urls are discarded when selecting the next one.
const MAX_RECENT_URLS = 4;

// This list can have either strings or functions that generate an URL string.
// The URLManager.getURL method takes care of finding out which is the case and
// calling the function if needed.
var urls = [
    "https://fyysikkokilta.fi",
    "https://www.example.com",
    "naytto2.html", // local file
    "inspirobot.html",
    HSLTimetableURLGenerator,
    "https://en.wikipedia.org/wiki/Special:Random",
    "tgpost.html",
    "countdown.html?title=Aikaa wappuun&timestamp=1556658000", // TODO: generate timestamp based on year, weight by time until wappu
];

var maxRecentUrls = Math.min(MAX_RECENT_URLS, urls.length - 1);

class URLManager {
    constructor() {
        this.index = 0;
        this.recentUrls = [0];
    }
    getURL() {
        var i;
        do {
            i = randint(urls.length);
        } while (i == undefined || i == this.index || this.recentUrls.includes(i));

        if(this.recentUrls.length >= maxRecentUrls) {
            this.recentUrls.shift(); // pop first element
        }
        this.index = i;
        this.recentUrls.push(i);
        var url = urls[this.index];
        if(typeof(url) === "function") {
            // if it's a generator, generate
            url = url();
        }
        //console.log("url:", url, "index:", i, "recents:", this.recentUrls);
        return url;
    }
};

