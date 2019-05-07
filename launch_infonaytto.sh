# Start the infonaytto html file in firefox and set it to full screen.
# To run this script on GUI login, add the following line (without # (but with @) and with the correct path) to ~/.config/lxsession/LXDE-pi/autostart
#@sh /home/infonaytto/infonaytto/launch_infonaytto.sh

# open terminal and display IP address
#lxterminal --command="watch ifconfig wlan0" &

# from https://askubuntu.com/questions/36287/how-to-start-firefox-in-fullscreen-mode
firefox ~/infonaytto/naytto.html &
until xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11; do
	# xdotool sometimes fails, retry
	echo retrying xdotool fullscreen
	sleep 0.1
done
