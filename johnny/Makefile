SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run: build-raw server

build:
	tslint -p . && tsc

build-raw:
	tsc

watch:
	tsc -w

airplay:
	shairport -a 'RaspiJS'

server:
	node dist/server.js
