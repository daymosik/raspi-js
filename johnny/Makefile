SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run: build start

build: node_modules/INSTALLED $(shell find src -type f)
	yarn run build
	touch $@

build-raw:
	tsc

watch:
	yarn run watch

airplay:
	shairport -a 'RaspiJS'

start:
	yarn run start-app

server:
	yarn run server

node_modules/INSTALLED: package.json
	yarn install
	touch $@
