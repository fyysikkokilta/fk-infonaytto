#!/bin/bash

# run this script to reload infonaytto HTML into firefox
# with option --pull, also pull from git


#NOTE: killing firefox makes it think it has crashed, to prevent it from nagging, go to about:config and set toolkit.startup.max_resumed_crashes to -1

cd "$(dirname "$0")"

if [ $1 -a $1 = "--pull" ]
then
	# exit on error
	set -e
	git pull
	set +e
fi

killall firefox-esr
DISPLAY=:0 sh launch_infonaytto.sh
