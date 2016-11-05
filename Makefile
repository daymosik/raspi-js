install:
	npm install
	sudo npm install webpack -g
	npm install webpack-dev-server -g

	# install nodebots-interchange for HCSR04 sensor
	interchange install hc-sr04 -a uno -p /dev/ttyACM0 --firmata

build:
	npm install
	webpack

run:
	npm run dev