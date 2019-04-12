# FK-Infonaytto

Lörinä as service

## Setup

1. `git clone` the repo
1. Install a browser plugin that allows CORS to make Kanttiinit menus work. We used [CORS Everywhere](https://addons.mozilla.org/fi/firefox/addon/cors-everywhere/) on Firefox and [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) on Chrome (tested April 2019). On firefox, you should also go to `about:config` and set the `security.fileuri.strict_origin_policy` flag to false. Note that this makes browsing the web possibly unsafe.
1. If you want to bridge Telegram messages to the info screen, make sure that `TelegramURLGenerator` is uncommented in `js/urlmanager.js` and check the readme and configuration file in `telegram/`.
1. Open `naytto.html` in a browser (Firefox seems to have smoother animations) and press `F11` to go full ~~blast~~ screen and you're done. If you want to bridge Telegram messages, be sure to keep the bot running.

That's it, there's no pöhinä stuff like React or anything. All dependencies are included in the repo in `lib/`.


## Adding content, configuration

You can add custom URLs in `js/urlmanager.js`. URLs are added as pairs `[url, weight]`, where `weight` determines how often the given URL is shown.
For dynamic URLS which are not just strings, see the examples in `js/urlgenerators.js`.
HTML files should go in `html/`, see examples therein.

Some configuration variables such as transition interval are defined in `config.js`.
