SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run: server

build:
	webpack

watch: server webpack-watch
	# concurrently --kill-others "node ./server.js" "webpack -w" "shairport -a 'RaspiJS'"

webpack-watch:
	webpack -w

airplay:
	shairport -a 'RaspiJS'

server:
	node server.js

test: test-frontend test-backend

test-backend:
	mocha ./test/johny/*.spec.js --reporter spec --compilers js:babel-core/register

test-frontend:
	karma start karma.conf.js
