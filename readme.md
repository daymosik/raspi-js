RaspiJS 
====

A Raspberry PI and Arduino based smart robot.  
Built with Johnny-Five, React, Webpack.  
Powered with NodeJS, Express server and socket.io.  

## Raspi's actual abilities ##

* Remote controll from gui
* Exploration mode

## Hardware specification ##

### Raspberry Pi ###

* Raspberry Pi 3 Model B + Lithium Battery Board (3800mAH, 5.1V)

### Arduino ###

* Arduino Mega 2560 + LiPo Battery (2200mAH, 11,1V)
* Arduino Mega Sensor Shield V2.0
* Ultrasonic sensor HC-SR04
* L298N H-bridge Dual Motor Controller + 4 x DC dual axis TT gear motor
* TowerPro SG90 Servo

## Software specification ##

### Raspberry Pi ###

* **Johnny-Five** - javascript robotic platform with great [API](http://johnny-five.io/api/) for controlling ardunino via **socket.io** from node server
* **ReactJS** GUI with **Webpack** and **Express** server for user communication with RaspiJS via **socket.io**
* **ES6 Syntax** with babel preprocessor
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

### Running scripts ###

Run RaspiJS app in development mode  
(NodeJS server, socket.io server, Express server, Webpack watch server, Arduino connection)
```
npm run dev
```

Run backend tests
```
npm run test
```

Run frontend tests
```
npm run test-frontend
```

