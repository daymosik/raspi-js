FROM node:18-bookworm

MAINTAINER Damian Majsner <d.majsner@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -yq update && \
    apt-get -yq install --no-install-recommends make build-essential zsh vim mpg123 festival flite fortune && \
    rm -rf /var/lib/apt/lists/*

RUN usermod -a -G tty root
RUN usermod -a -G dialout root

WORKDIR /app
