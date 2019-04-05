// this many of the last displayed urls are discarded when selecting the next one.
const MAX_RECENT_URLS = 3;

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
    ["html/countdown/countdown_ullis.html?title=Aikaa wappuun&timestamp=1556658000", 1.], // TODO: generate timestamp based on year, weight by time until wappu
    [PerjantaiURL, 0.2],
    //["https://kanttiinit.fi", 2], //TODO: see https://kitchen.kanttiinit.fi/menus?lang=fi&restaurants=52,12&days=2019-04-05
    //["https://www.inkubio.fi/kiltiscam/", 0.5],
    //["https://www.inkubio.fi/kiltiscam/kiltahuone.jpg", 0.5], //TODO: own html file for this to fit image
];

// -2 because of PerjantaiURL which can be invalid on certain days
var maxRecentUrls = Math.min(MAX_RECENT_URLS, urlsWeighted.length - 2);

class URLManager {
    constructor() {
        this.index = 0;
        this.recentUrls = [0];
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
        if(i == this.index) return false;
        if(this.recentUrls.includes(i)) return false;

        var url = urlsWeighted[i][0];
        if(url == PerjantaiURL && (new Date()).getDay() != 5) return false;

        return true;
    }
};
