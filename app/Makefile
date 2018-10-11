SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

build:
	webpack

build-w:
	webpack -w

watch: server webpack-watch
	# concurrently --kill-others "node ./server.ts" "webpack -w" "shairport -a 'RaspiJS'"
