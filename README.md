[![Build Status](https://github.com/daymosik/raspi-js/workflows/build/badge.svg)](https://github.com/daymosik/raspi-js/actions?query=workflow%3Abuild)
[![codebeat badge](https://codebeat.co/badges/e6723bd6-9439-4147-bc3d-12e1baabb89b)](https://codebeat.co/projects/github-com-daymosik-raspi-js-master)

RaspiJS 
====

![alt text](https://raw.githubusercontent.com/daymosik/raspi-js/master/app/src/assets/images/logo-vertical.png)

A Raspberry PI and Arduino based smart robot.  
Built with Johnny-Five, React, esbuild and Typescript.  
Powered with NodeJS, express, socket.io and firebase.  

## Raspi's actual abilities ##

* Remote control from GUI (arrows + joystick)
* Exploration mode
* Play songs on buzzer :)
* It speaks!
* AirPlay server
* View from USB Camera through GUI
* Yamaha AV receiver control from GUI

## Hardware specification ##

### Raspberry Pi ###

* Raspberry Pi 3 Model B + Lithium Battery Board (3800mAH, 5.1V)
* Raspberry Pi Camera Module V2 IR 8MP
* USB Sound Card

### Arduino ###

* Arduino Mega 2560 + Sensor Shield V2.0
* Arduino Uno R3
* NodeMcu Lua Wifi ESP8266 + NodeMcu Base ver 1.0 (NodeMcu v3 CH340 Lua WIFI )
* LiPo Battery (2200mAH, 11,1V)
* L298N H-bridge Dual Motor Controller + 2 x LEGO 88003 SILNIK L
* L298N H-bridge Dual Motor Controller + 1 x LEGO 88003 SILNIK L
* 5161AS Seven Segment LED Display with 74HC595 Shift Register
* RGB Common cathode LED
* Buzzer
* LCD 2x16 Display with PCF8574 I2C converter
* ~~Arduino Uno R3 + Sensor Shield V4.0~~
* ~~TowerPro SG90 Servo~~
* ~~Ultrasonic sensor HC-SR04~~

## Software specification ##

### Raspberry Pi ###

* **Johnny-Five** - javascript robotic platform with great [API](http://johnny-five.io/api/) for controlling ardunino via **socket.io** from node server
* **ReactJS** GUI hosted on firebase hosting with **socket.io** communication to RaspiJS 
* **GitHub Actions CI** automated deploys to firebase hosting
* **Docker**
* **Typescript**
* **Bootstrap 5**
* **Node v18.x**
* **Makefile** for running scripts
* Raspbian Buster

## Docker ##

```
docker compose build
docker compose up -d

docker compose restart webapp

docker exec -ti webapp zsh
```


## Installation ##

For preparing your Raspberry Pi connection through Node.js with Arduino Uno, You have to upload **StandardFirmataPlus** on Arduino. For more information please refer to [Johnny-Five](http://johnny-five.io)

Install nodebots-interchange for HCSR04 sensor (change **/dev/ttyACM0** to arduino correct interface)

20.03.2023: Removed from package.json "nodebots-interchange": "^2.1.3",
```
interchange install hc-sr04 -a uno -p /dev/ttyACM0 --firmata
```
TODO: find a way to install nodebots-hcsr04 on Arduino Mega 2560

For running scripts You must have a **SSH** connection or direct bash access to Raspberry Pi  

### Fresh start ###

Install all required node dependencies 
```
npm install
```

For AirPlay install [shairport](https://github.com/abrasive/shairport)

Install motion for USB webcamera:
```
sudo apt-get install motion
```

Useful commands:
```
sudo modprobe bcm2835-v4l2
sudo vim /etc/motion/motion.conf
sudo service motion start
```

https://raspberry-valley.azurewebsites.net/Streaming-Video-with-Motion/#setup-streaming

TODO: write about flite: https://learn.adafruit.com/speech-synthesis-on-the-raspberry-pi/speak-easier-flite?view=all

### Firebase ###

For firebase API and deployment create .env file in root catalog with following

```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
FIREBASE_DATABASE_URL=https://your-domain.firebaseio.com
FIREBASE_PROJECT_ID=your-domain
FIREBASE_STORAGE_BUCKET=your-domain.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
```

### Running scripts ###

#### Johnny ####

Run RaspiJS app
(NodeJS server, socket.io server, Arduino connection)
```
make run
```

Build app
```
make build
```

Run app in development mode
```
make start-dev
```

#### Webapp ####

Build GUI
```
make build
```

Watch GUI
```
make watch
```

#### Github actions ####

Run this command to build with firebase config
```
./build.sh
```
