[![Build Status](https://github.com/daymosik/raspi-js/workflows/build/badge.svg)](https://github.com/daymosik/raspi-js/actions?query=workflow%3Abuild)
[![codebeat badge](https://codebeat.co/badges/e6723bd6-9439-4147-bc3d-12e1baabb89b)](https://codebeat.co/projects/github-com-daymosik-raspi-js-master)

RaspiJS 
====

![alt text](https://raw.githubusercontent.com/daymosik/raspi-js/master/webapp/src/assets/images/raspi-logo-1-200.png)

A Raspberry PI and Arduino based smart robot.  
Built with Johnny-Five, React, esbuild and Typescript.  
Powered with NodeJS, express, socket.io and firebase.  
Assembled with LEGO bricks.

## Raspi's actual abilities ##

* Remote control from GUI (arrows + joystick)
* Speech recognition commands in the browser (Polish, via annyang)
* Play songs on buzzer :)
* Play random WAV clips from `data/wav`
* It speaks! (text-to-speech with `festival`)
* Print text on the LCD display, drive the RGB LED and seven segment display
* View from USB Camera through GUI (`motion` stream)
* Yamaha AV receiver control from GUI
* Chat with a local LLM (Ollama, `llama3`) through GUI
* ~~Exploration mode~~ (code kept in `johnny/src/services/exploration*.ts`, currently commented out)

## Project structure ##

| Path | Description |
|---|---|
| `johnny/` | Node.js server running on the Raspberry Pi: Johnny-Five boards, express (`/api/yamaha/*`) and socket.io on port `8090` (path `/chat/socket.io`) |
| `webapp/` | React GUI bundled with esbuild into `webapp/dist` (PWA with a Workbox service worker) |
| `nginx/` | nginx config for the Raspberry Pi (`:443` proxies `/chat/` to johnny, `:5001` serves `webapp/dist`) |
| `data/wav/` | Sound clips mounted into johnny as `/wav` |
| `fritzing/` | Wiring diagrams (`.fzz` + `.png`) |
| `test/` | Legacy mocha/chai specs (not wired to any npm script) |
| `docker-compose.yml`, `fabfile.py` | Containers `johnny`, `webapp`, `nginx`, `certbot` and Fabric tasks to manage them |
| `init-letsencrypt.sh` | One-time Let's Encrypt bootstrap for nginx |

## How it is deployed ##

```
browser ──> https://daymosik.freemyip.com:5000   (home server, "terminal" repo)
              ├─ /          -> webapp/dist (built by the raspi-js container)
              ├─ /chat/     -> 192.168.1.180:8090 (johnny on the Raspberry Pi, socket.io)
              └─ /ollama/   -> 192.168.1.100:8001 (local-ai on the Mac)
         ──> https://daymosik.freemyip.com:5001   (Raspberry Pi nginx, webapp/dist)
         ──> Firebase Hosting (project raspi-js)  (deployed by GitHub Actions)
```

* The socket.io and local AI addresses are hard-coded in `webapp/src/services/socket.ts` and `webapp/src/providers/local-ai-provider.ts`.
* The camera stream is expected at `https://daymosik.freemyip.com:8082/` (`webapp/src/components/camera.tsx`).
* The Yamaha receiver IP (`192.168.1.140`) is set in `johnny/src/services/yamaha.ts`.
* Login uses Firebase Authentication (email + password). All views except Home and Login are private.

## Hardware specification ##

### Raspberry Pi ###

* Raspberry Pi 3 Model B + Lithium Battery Board (3800mAH, 5.1V)
* Raspberry Pi Camera Module V2 IR 8MP
* USB Sound Card

### Arduino ###

* Arduino Mega 2560 + Sensor Shield V2.0 (`/dev/ttyUSB0`)
* Arduino Uno R3 (`/dev/ttyACM0`)
* NodeMcu Lua Wifi ESP8266 + NodeMcu Base ver 1.0 (NodeMcu v3 CH340 Lua WIFI ), currently disabled in `johnny/src/raspi.ts`
* LiPo Battery (2200mAH, 11,1V)
* L298N H-bridge Dual Motor Controller + 2 x LEGO Technic - Power Functions L-Motor 88003
* L298N H-bridge Dual Motor Controller + 1 x LEGO Technic - Power Functions L-Motor 88003
* 5161AS Seven Segment LED Display with 74HC595 Shift Register
* RGB Common cathode LED
* Buzzer
* LCD 2x16 Display with PCF8574 I2C converter
* ~~Arduino Uno R3 + Sensor Shield V4.0~~
* ~~TowerPro SG90 Servo~~
* ~~Ultrasonic sensor HC-SR04~~

## Software specification ##

* **Johnny-Five** - javascript robotic platform with great [API](http://johnny-five.io/api/) for controlling Arduino, driven via **socket.io** from the node server
* **React 19** GUI with **socket.io** communication to RaspiJS, hosted on Firebase Hosting and on nginx
* **esbuild** + Sass + PostCSS, **Workbox** service worker
* **GitHub Actions CI** - lint, build and automated deploys to Firebase Hosting
* **Docker** with **Docker Compose** for running the environment in containers (`node:24-bookworm` for johnny, `node:24-alpine` for webapp)
* **Fabric** for managing containers
* **Makefile** for running scripts
* **Node v24.x**
* **Typescript 5**, ESLint 10 + Prettier
* **Bootstrap 5**
* Raspbian Buster

## Fresh start ##

For running scripts you must have a **SSH** connection or direct bash access to Raspberry Pi.

Make sure to have `docker`, `docker compose` and `fabric` installed on your Raspberry Pi.

### Firebase ###

For firebase API and deployment create `webapp/.env` (see `webapp/.env.example`) with the following:

```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
FIREBASE_DATABASE_URL=https://your-domain.firebaseio.com
FIREBASE_PROJECT_ID=your-domain
FIREBASE_STORAGE_BUCKET=your-domain.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
```

The values are injected into the bundle at build time by `webapp/esbuild.config.js`. `webapp/Makefile` requires this file to exist.

### Starting app ###

First you have to init certbot to generate new SSL certificates:
```
$ ./init-letsencrypt.sh
```

Build dockerfiles:
```
$ fab build
```

Start all containers (`johnny`, `webapp`, `nginx`, `certbot`):
```
$ fab run
```

`webapp` is a one-shot container: it runs `make build`, writes `webapp/dist` and exits.

To run in development mode (`docker-compose.dev.yml`: johnny runs `make start-dev`, webapp runs `make watch`):
```
$ fab purge --names=webapp
$ fab run-dev --docker=webapp

$ fab purge --names=johnny
$ fab run-dev --docker=johnny
```

Other tasks:
```
$ fab stop / fab restart / fab purge [--names=johnny+nginx]
$ fab log --docker=johnny
$ fab logs
$ fab zsh --docker=johnny
```

### Running scripts ###

#### Johnny ####

To be executed on `johnny` container

Run Johnny Five app with NodeJS server, socket.io server and Arduino connection
```
make run
```

Build app (npm install if needed, lint, prettier check, `tsc` into `dist/`)
```
make build
```

Run app in development mode (nodemon)
```
make start-dev
```

Lint only
```
make lint
```

#### Webapp ####

To be executed on `webapp` container

Build GUI (lint, prettier check, production build into `dist/`)
```
make build
```

Watch GUI
```
make watch
```

Serve `dist/` with esbuild
```
make serve
```

#### Github actions ####

On every push to `master` the `build` workflow installs dependencies, lints, builds the webapp with firebase config from repository secrets and deploys it to Firebase Hosting (`raspi-js` project). The build uses:
```
./build.sh
```

-------

## Useful informations ##

For preparing your Raspberry Pi connection through Node.js with Arduino Uno, You have to upload **StandardFirmataPlus** on Arduino. For more information please refer to [Johnny-Five](http://johnny-five.io)

Install nodebots-interchange for HCSR04 sensor (change **/dev/ttyACM0** to arduino correct interface)

```
interchange install hc-sr04 -a uno -p /dev/ttyACM0 --firmata
```
TODO: find a way to install nodebots-hcsr04 on Arduino Mega 2560

For AirPlay install [shairport](https://github.com/abrasive/shairport) and run `make airplay` in johnny.

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

Text-to-speech uses `festival` (`flite` is also installed in the johnny image): https://learn.adafruit.com/speech-synthesis-on-the-raspberry-pi/speak-easier-flite?view=all
