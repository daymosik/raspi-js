FROM node:18

MAINTAINER Damian Majsner <d.majsner@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

# MAIN system packages
RUN apt-get -yq update && \
    apt-get -yq install make build-essential zsh
#    apt-get -yq install make python3 build-essential wget git net-tools sudo curl zsh

RUN usermod -a -G tty root
RUN usermod -a -G dialout root

WORKDIR /app

CMD ["make", "run"]
