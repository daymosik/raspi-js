FROM nginx:alpine

MAINTAINER Damian Majsner <d.majsner@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN apk add zsh vim

COPY ./default.conf /etc/nginx/conf.d/default.conf
