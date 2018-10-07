SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run: server

airplay:
	shairport -a 'RaspiJS'

server:
	node src/server.js
