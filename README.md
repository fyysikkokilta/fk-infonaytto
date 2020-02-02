# FK-Infonaytto

Lörinä as service

!!!

This repo is not actively maintained. For current version of infonaytto please see

https://github.com/fyysikkokilta/fk-infonaytto-v2

!!!

## Setup

1. `git clone` the repo
1. Install a browser plugin that allows CORS to make Kanttiinit menus work. We used [CORS Everywhere](https://addons.mozilla.org/fi/firefox/addon/cors-everywhere/) on Firefox and [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) on Chrome (tested April 2019). On firefox, you should also go to `about:config` and set the `security.fileuri.strict_origin_policy` flag to false. Note that this makes browsing the web possibly unsafe.
1. If you want to bridge Telegram messages to the info screen, make sure that `TelegramURLGenerator` is uncommented in `js/urlmanager.js` and check the readme and configuration file in `telegram/`.
1. Open `naytto.html` in a browser (Firefox seems to have smoother animations) and press `F11` to go full ~~blast~~ screen and you're done. If you want to bridge Telegram messages, be sure to keep the bot running.

That's it, there's no pöhinä stuff like React or anything. All dependencies are included in the repo in `lib/`.

## Raspberry Pi configuration
Install dependencies: `sudo apt install xdotool tmux`

To make Firefox open automatically on startup, do the following:
1. Set up Raspbian to automatically log in to the user you want. This can be done with `sudo raspi-config` and select "auto-login GUI" from the Boot options. Then, find all instances of the username of the user which was used to run `raspi-config` in the files `/etc/lightdm/lightdm.conf` and `/etc/systemd/system/getty@tty1.service.d/autologin.conf`, and replace them with the user name you want.
1. Add the line `@sh path/to/infonaytto/launch_infonaytto.sh` to `~/.config/lxsession/LXDE-pi/autostart` (note the `@` at the beginning), with the user that will log in automatically.
1. To prevent the raspi from going to sleep, also add the following lines to `autostart` (instructions from [here](https://www.bitpi.co/2015/02/14/prevent-raspberry-pi-from-sleeping/)):
```
@xset s noblank
@xset s off
@xset -dpms
```

To automatically turn of the screen during certain time of day (e.g. between 2 AM and 7:45 AM): `sudo crontab -e` and add the lines
```
0  2 * * * vcgencmd display_power 0
45 7 * * * vcgencmd display_power 1
```

## Adding content, configuration

You can add custom URLs in `js/urlmanager.js`. URLs are added as pairs `[url, weight]`, where `weight` determines how often the given URL is shown.
For dynamic URLS which are not just strings, see the examples in `js/urlgenerators.js`.
HTML files should go in `html/`, see examples therein.

Some configuration variables such as transition interval are defined in `config.js`.
