function randint(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function timetablesHSL() {
    var titles = [
        "Otani",
        "Mee töihin",
        "bussningkörsnings",
        "lörs lärä",
        "körsbärsvägen",
        "Kiltis",
        "Körs",
        "boi",
    ];
    let index = randint(titles.length);
    return "http://hsl.trapeze.fi/traveller/web?command=fullscreen&id=FyyKiOK&title=" + titles[index] + "&cols=1&extracolumn=platform";
}

function wikipediaRandomArticle() {
    return "https://en.wikipedia.org/wiki/Special:Random";
}


//TODO: this freezes the browser if there are only few functions in the list (1-3) 
var urls = [
    timetablesHSL,
    timetablesHSL,
    timetablesHSL,
    timetablesHSL,
    wikipediaRandomArticle,
    wikipediaRandomArticle,
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
        console.log("url:", urls[this.index]());//, "index:", i, "recents:", this.recentUrls);
        return urls[this.index]();
    }
};

