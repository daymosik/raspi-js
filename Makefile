SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

include .env
export $(shell sed 's/=.*//' .env)

run:
	@cd johnny && make run

build:
	rm -rf public/*
	@cd app && make build

build-w:
	rm -rf public/*
	@cd app && make build-w
