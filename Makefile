SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

include .env
export $(shell sed 's/=.*//' .env)

run:
	@cd johnny && make run

build:
	@cd app && make build

build-w:
	@cd app && make build-w
