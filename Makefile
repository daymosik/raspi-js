NPM_BIN = node_modules/.bin/

run: server airplay 

build:
	webpack

watch: server airplay webpack-watch
	# $(NPM_BIN)concurrently --kill-others "node ./server.js" "webpack -w" "shairport -a 'RaspiJS'"

webpack-watch:
	webpack -w

airplay:
	shairport -a 'RaspiJS'

server:
	node server.js

test: test-frontend test-backend

test-backend:
	$(NPM_BIN)mocha ./test/johny/*.spec.js --reporter spec --compilers js:babel-core/register

test-frontend:
	$(NPM_BIN)karma start karma.conf.js

