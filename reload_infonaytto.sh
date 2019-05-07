#!/bin/bash

# run this script to reload infonaytto HTML into firefox
# with option --pull, also pull from git


#NOTE: killing firefox makes it think it has crashed, to prevent it from nagging, go to about:config and set toolkit.startup.max_resumed_crashes to -1
killall firefox-esr

if [ $1 -a $1 = "--pull" ]
then
	#TODO
	echo "git pull not implemented yet"
fi

cd "$(dirname "$0")"
DISPLAY=:0 sh launch_infonaytto.sh
