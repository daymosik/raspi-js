SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

build: node_modules/INSTALLED $(shell find src -type f)
	webpack

build-w:
	webpack -w

node_modules/INSTALLED: package.json
	yarn install
	touch $@
