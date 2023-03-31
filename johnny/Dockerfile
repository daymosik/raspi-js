FROM node:lts-buster

MAINTAINER Damian Majsner <d.majsner@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -yq update && \
    apt-get -yq install make build-essential zsh vim mpg123 festival flite fortune

RUN usermod -a -G tty root
RUN usermod -a -G dialout root

WORKDIR /app
