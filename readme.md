RaspiJS 
====

A Raspberry PI and Arduino based smart robot.  
Built with Johnny-Five, React, Webpack.  
Powered with NodeJS, Express server and socket.io.  

## Raspi's actual abilities ##

* Remote controll from gui
* Exploration mode
* Play songs on buzzer :)
* It speaks!
* AirPlay server

## Hardware specification ##

### Raspberry Pi ###

* Raspberry Pi 3 Model B + Lithium Battery Board (3800mAH, 5.1V)
* USB Sound Card

### Arduino ###

* Arduino Mega 2560 + Sensor Shield V2.0
* Arduino Uno R3 + Sensor Shield V4.0
* LiPo Battery (2200mAH, 11,1V)
* Ultrasonic sensor HC-SR04
* L298N H-bridge Dual Motor Controller + 4 x DC dual axis TT gear motor
* TowerPro SG90 Servo
* 5161AS Seven Segment LED Display with 74HC595 Shift Register
* RGB Common cathode LED
* Buzzer

## Software specification ##

### Raspberry Pi ###

* **Johnny-Five** - javascript robotic platform with great [API](http://johnny-five.io/api/) for controlling ardunino via **socket.io** from node server
* **ReactJS** GUI with **Webpack** and **Express** server for user communication with RaspiJS via **socket.io**
* **ES6 Syntax** with babel preprocessor
* **Bootstrap 4**
* **Mocha + chai + sinon** server side testing
* **Karma + PhantomJS + mocha + chai + sinon** frontend side testing
* **Node v7.0.0**
* **npm** package manager - managing packages and running scripts
* Raspbian Jessie

## Installation ##

For preparing your Raspberry Pi connection through Node.js with Arduino Uno, You have to upload **StandardFirmataPlus** on Arduino. For more information please refer to [Johnny-Five](http://johnny-five.io)

For running scripts You must have a **SSH** connection or direct bash access to Raspberry Pi  

### Fresh start ###

Install all required node dependencies 
```
npm install
```

Install nodebots-interchange for HCSR04 sensor (change **/dev/ttyACM0** to arduino correct interface)
```
interchange install hc-sr04 -a uno -p /dev/ttyACM0 --firmata
```
TODO: find a way to install nodebots-hcsr04 on Arduino Mega 2560

For AirPlay install [shairport](https://github.com/abrasive/shairport)

TODO: write about flite: https://learn.adafruit.com/speech-synthesis-on-the-raspberry-pi/speak-easier-flite

### Running scripts ###

Run RaspiJS app
(NodeJS server, socket.io server, Express server, Arduino connection, Sharepoint)
```
make run
```

Run app in development mode
(+ Webpack watch server)
```
make watch
```

Build GUI
```
make build
```

Run tests
```
make test
```


