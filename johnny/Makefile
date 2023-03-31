export PATH := node_modules/.bin:$(PATH)

sources := tsconfig.json .eslintrc.json $(shell find ./src -type f)
npm_dep = package.json
libs = node_modules/installed_ts

run: build start

start:
	npm run start

start-dev:
	npm run start:dev

build: VERSION
VERSION: $(libs) $(sources)
	npm run lint
	npm run prettier
	npm run build
	echo $(GIT_VERSION) > VERSION

build-raw:
	tsc

watch:
	npm run watch

lint:
	npm run lint
	npm run prettier

airplay:
	shairport -a 'RaspiJS'

$(libs): $(npm_dep)
	npm install
	touch node_modules/installed_ts

.PHONY: build watch lint
