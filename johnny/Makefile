SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run: build server

build:
	tslint -p . && tsc

watch:
	tsc -w

airplay:
	shairport -a 'RaspiJS'

server:
	node dist/server.js
