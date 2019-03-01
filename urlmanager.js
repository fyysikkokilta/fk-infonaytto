function randint(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//TODO: replace with a list of functions that generate urls
var urls = [
    "https://fyysikkokilta.fi",
    "https://www.example.com",
    "naytto2.html", // local file
    "http://hsl.trapeze.fi/traveller/web?command=fullscreen&id=FyyKiOK&title=lors&cols=1&extracolumn=platform",
    "https://en.wikipedia.org/wiki/Special:Random",
];

var maxRecentUrls = Math.max(4, urls.length - 1);

class URLManager {
    constructor() {
        this.index = 0;
        this.recentUrls = [];
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
        console.log("url:", urls[this.index], "index:", i, "recents:", this.recentUrls);
        return urls[this.index];
    }
};
