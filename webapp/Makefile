export PATH := node_modules/.bin:$(PATH)

include .env
export $(shell sed 's/=.*//' .env)

sources := tsconfig.json .eslintrc.json esbuild.config.js $(shell find ./src -type f)
npm_dep = package.json
libs = node_modules/installed_ts

build: VERSION
VERSION: $(libs) $(sources)
	rm -rf ./dist/*
	npm run lint
	npm run prettier
	npm run build:production
	echo $(GIT_VERSION) > VERSION

clean:
	rm -rf VERSION dist

watch: $(libs)
	npm run watch

lint:
	npm run lint
	npm run prettier

$(libs): $(npm_dep)
	npm install
	touch node_modules/installed_ts

.PHONY: build watch lint clean
