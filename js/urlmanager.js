// URL manager class

/*
 * This list can have either strings or functions that generate an URL string.
 * The URLManager.getURL method takes care of finding out which is the case and
 * calling the function if needed. The list contains lists of the form [url,
 * weight, duration], where weight affects how probably the page will be shown
 * and the optional duration tells for how long. If duration is missing,
 * DEFAULT_TRANSITION_INTERVAL will be used instead.
*/
var urlsWeighted = [
    //["example.com", 9999], // local file
    //["html/naytto2.html", 9999], // local file
    ["html/inspirobot.html", 0.05, 10],
    [HSLTimetableURLGenerator, 2, 40],
    ["https://en.wikipedia.org/wiki/Special:Random", 0.1], // TODO: consider something like https://github.com/patelnav/wiki-embed (<- this one doesn't work)
    [WappuURLGenerator, 0.1, 30], //TODO: increase probability as wappu approaches
    [PerjantaiURLGenerator, 0.2],
    //["html/kanttiinit.html", 2], //TODO
    [TelegramURLGenerator, 0.5, 40],
    ["html/calendar/calendar.html", 1],
    //["https://kanttiinit.fi", 2], //TODO: see https://kitchen.kanttiinit.fi/menus?lang=fi&restaurants=52,12&days=2019-04-05
    ["html/ruokalistat/kanttiinit.html?page=1", 2.5, 60],
    ["html/ruokalistat/kanttiinit.html?page=2", 2.5, 60],
    ["html/ruokalistat/kanttiinit.html?page=3", 2.5, 60],
    ["html/spotify.html", 2.5, 20],
    //["https://www.inkubio.fi/kiltiscam/", 0.5],
    //["https://www.inkubio.fi/kiltiscam/kiltahuone.jpg", 0.5], //TODO: own html file for this to fit image
];

// -3 because two generators can be invalid on certain days
const maxRecentUrls = Math.min(MAX_RECENT_URLS, urlsWeighted.length - 3);

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

        var urlTuple = urlsWeighted[this.index]; //NOTE: should be object and not array...
        //console.log(urlObj);
        var url = urlTuple[0];
        var duration = urlTuple[2] || DEFAULT_TRANSITION_INTERVAL; //NOTE: 0 seconds is not supported

        if(typeof(url) === "function") {
            // if it's a generator, generate
            url = url();
        }
        //console.log("url:", url, "index:", i, "recents:", this.recentUrls);
        var ret = {url: url, duration: duration};
        return ret;
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
