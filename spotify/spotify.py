"""
This quick and dirty script finds the 'now playing' track on Spotify and sends
it to a specified server (the one displaying the info screen) using SCP. The
infoscreen computer can then read the file to display it.

Remember to `ssh-copy-id` to the target machine so scp works without password.
"""

import dbus
import json
import time
import os

# fill these in
TARGET_HOST = "???"
TARGET_USERNAME = "???"
TARGET_FOLDER = "\"~/infonaytto/spotify\"" # remember to add quotes to escape ~

HISTORY_LENGTH = 5
CHECK_INTERVAL = 30 # check every this many seconds


def get_now_playing():
    #TODO: don't hardcode spotify, select player from available ones using dbus.SessionBus().list_names()
    player = dbus.SessionBus().get_object("org.mpris.MediaPlayer2.spotify", "/org/mpris/MediaPlayer2")
    metadata = player.Get('org.mpris.MediaPlayer2.Player', 'Metadata', dbus_interface='org.freedesktop.DBus.Properties')

    title = str(metadata['xesam:title'])
    artist = str(metadata['xesam:artist'][0])
    thumbnail = str(metadata['mpris:artUrl'])
    timestamp = time.time()

    return { "title": title, "artist": artist, "thumbnail": thumbnail, "timestamp": timestamp }

def send_songs():
    #from pprint import pprint
    #print("would send entries:")
    #pprint(history)
    #print("\n")

    filename = "history.json"
    with open(filename, "w") as f:
        f.write(json.dumps(history, sort_keys = True, indent = 4))
    os.system("scp {} {}@{}:{}".format(filename, TARGET_USERNAME, TARGET_HOST, TARGET_FOLDER))


history = []

while True:
    now_playing = get_now_playing()

    keys_to_cmp = ["title", "artist"]
    if not history or not all([history[0][key] == now_playing[key] for key in keys_to_cmp]):
        history.insert(0, now_playing)

        while len(history) > HISTORY_LENGTH and history:
            history.pop()

        send_songs()

    time.sleep(CHECK_INTERVAL)
