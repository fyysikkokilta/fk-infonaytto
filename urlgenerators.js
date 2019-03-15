/*
 * Some functions for generating URLs, e.g. a different title for HSL timetable
 * every time or getting a random image from a folder.
 * Each function should return a string that can be set as the src of the iframe
 * in the main HTML file.
 */

HSLTimetableURLGenerator = function () {
    // Generate HSL timetable with random title

    //TODO: add weights?
    var titles = [
        "lörs",
        "TÄNÄÄN lähtee",
        "π = 3",
        "bussningkörsnings",
        "Otani",
        "Körsbärsvägen",
        "mee töihi",
    ];

    // instructions for HSL link parameters: https://drive.google.com/file/d/0B6kYA7HJwmafemo2RU1senU1Z0pfUTZEQmNkS0thSzg4dTRJ/view
    //TODO: mittaa kauan kestää kävellä metrikselle/550 pysäkille ja laita offset = se.
    var url = "http://hsl.trapeze.fi/traveller/web?command=fullscreen&id=FyyKiOK&cols=1&extracolumn=platform&offset=240"
    url += "&title=" + encodeURIComponent(titles[randint(titles.length)]);
    return url;
}
