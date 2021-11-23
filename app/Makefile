SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

build: node_modules/INSTALLED $(shell find src -type f)
	npm run build

build-w:
	npm run webpack-watch

node_modules/INSTALLED: package.json
	npm install
	touch $@
