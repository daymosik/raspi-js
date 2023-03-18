FROM node:18-alpine

MAINTAINER Damian Majsner <d.majsner@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN apk add make python3 zsh

WORKDIR /app

EXPOSE 9005

CMD ["./run.sh"]
