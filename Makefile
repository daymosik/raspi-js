SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run:
	@cd johny && make run

build:
	@cd app && make build
