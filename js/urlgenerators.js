/*
 * Some functions for generating URLs, e.g. a different title for HSL timetable
 * every time or getting a random image from a folder.
 * Each function should return a string that can be set as the src of the iframe
 * in the main HTML file.
 */

HSLTimetableURLGenerator = function () {
    // Generate HSL timetable with random title

    var titlesWeighted = [
        ["Lähtevät bussit", 1],
        ["lörs", 0.2],
        ["bussningkörsnings", 0.2],
        ["TÄNÄÄN lähtee", 0.5],
        ["π = 3", 0.2],
        ["Otani", 0.2],
        ["Körsbärsvägen", 0.2],
        ["mee töihi", 0.5],
        ["Bussi kulkee vaan", 0.5],
        ["new Bus(True, False)", 0.2],
        ["Joskus on hyvä poistua", 0.7],
        ["Poistu", 0.2],
        ["Ota takkisi ja poistu", 0.2],
        ["Jos ei oo varaa taksiin", 0.1],
        ["aik ata ulu", 0.05],
    ];

    // instructions for HSL link parameters: https://drive.google.com/file/d/0B6kYA7HJwmafemo2RU1senU1Z0pfUTZEQmNkS0thSzg4dTRJ/view
    //TODO: mittaa kauan kestää kävellä metrikselle/550 pysäkille ja laita offset = se.
    var url = "http://hsl.trapeze.fi/traveller/web?command=fullscreen&id=FyyKiOK&cols=1&extracolumn=platform&offset=240"
    url += "&title=" + encodeURIComponent(weighted_choice(titlesWeighted));
    return url;
}

const PerjantaiURLGenerator = function() {
    // return false if it is not friday, urlmanager checks for this
    if((new Date()).getDay() != 5) return false;

    return "html/perjantai/perjantai.html";
}
