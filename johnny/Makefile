SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run: build server

build: lint node_modules/INSTALLED $(shell find src -type f)
	npm run build
	touch $@

build-raw:
	tsc

watch:
	npm run watch

airplay:
	shairport -a 'RaspiJS'

server:
	npm run server

lint:
	npm run lint
	npm run prettier

node_modules/INSTALLED: package.json
	npm install
	touch $@
