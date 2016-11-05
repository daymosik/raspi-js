install:
	npm install

	# install nodebots-interchange for HCSR04 sensor
	interchange install hc-sr04 -a uno -p /dev/ttyACM0 --firmata