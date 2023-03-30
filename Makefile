SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

include .env
export $(shell sed 's/=.*//' .env)

run:
	@cd johnny && make run

serve:
	./build.sh
	firebase serve --host 0.0.0.0

build:
	rm -rf webapp/dist/*
	@cd webapp && make build

build-w:
	rm -rf webapp/dist/*
	@cd webapp && make build-w
