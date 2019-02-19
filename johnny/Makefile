SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run: build start

build: node_modules/INSTALLED $(shell find src -type f)
	npm run build
	touch $@

build-raw:
	tsc

watch:
	npm run watch

airplay:
	shairport -a 'RaspiJS'

start:
	npm run start-app

server:
	npm run server

node_modules/INSTALLED: package.json
	npm install
	touch $@
