/*
 * Some functions for generating URLs, e.g. a different title for HSL timetable
 * every time or getting a random image from a folder.
 * Each function should return a string that can be set as the src of the iframe
 * in the main HTML file.
 */

HSLTimetableURLGenerator = function() {
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
    var url = "http://hsl.trapeze.fi/traveller/web?command=fullscreen&id=FyyKiOK&cols=1&extracolumn=platform&offset=240"
    url += "&title=" + encodeURIComponent(weighted_choice(titlesWeighted));
    return url;
}

const PerjantaiURLGenerator = function() {
    // return false if it is not friday, urlmanager checks for this
    if((new Date()).getDay() != 5) return false;

    return "html/perjantai/perjantai.html";
}

const WappuURLGenerator = function() {
    const wappu_titles = [
        ["Hauskaa wappua!", 1.],
        ["Hyvää wappua ja onnelista uutta vuotta!", 0.2],
        ["Wappu on taas", 0.1],
        ["Wabedi wabs!", 0.1],
        ["Wappu on TÄNÄÄN", 0.1],
    ];

    const wappu_countdown_titles = [
        ["Aikaa wappuun", 1.0],
        ["Wappu tulee!", 0.1],
        ["Onko simat jo tulilla?", 0.02],
    ]
    const now = new Date();
    var wappu = new Date(now.getFullYear() + "-05-01");
    var millis_until_wappu = wappu - now;
    if(millis_until_wappu < 0) {
        // wappu has started, figure out if it has ended
        const millis_per_week = 7 * 24 * 60 * 60 * 1000;
        if(Math.abs(millis_until_wappu) < millis_per_week) {

            return "html/wappu/wappu.html?title=" + weighted_choice(wappu_titles);

        } else {

            // wabu time is over, count down to next year
            // TODO: should this return false at some point of the year?
            wappu = new Date((now.getFullYear() + 1) + "-05-01");

        }
    }

    // hacky way to take time zones into account (not sure if correct during winter...)
    const timestamp = Math.floor(wappu.getTime()/1000 + 60 * now.getTimezoneOffset());

    var url = "html/wappu/countdown_ullis.html";
    url += "?title=" + weighted_choice(wappu_countdown_titles);
    url += "&timestamp=" + timestamp;
    return url;
}

const TelegramURLGenerator = function() {
    const chat_usernames = [
        ["fk_infonaytto", 1],
        //["fklors", 1.], //TODO
    ];

    var url = "html/tgpost.html";
    url += "?chat_username=" + weighted_choice(chat_usernames);
    //url += "&n_messages_to_show=" + n_tg_messages_to_show; // defined in config.js
    return url;
}
