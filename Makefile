SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run:
	@cd johnny && make run

build:
	@cd app && make build
