SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

build:
	webpack

watch: server webpack-watch
	# concurrently --kill-others "node ./server.js" "webpack -w" "shairport -a 'RaspiJS'"

webpack-watch:
	webpack -w
