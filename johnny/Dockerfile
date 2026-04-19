FROM node:24-bookworm

LABEL org.opencontainers.image.authors="Damian Majsner <d.majsner@gmail.com>"

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -yq update && \
    apt-get -yq install --no-install-recommends \
        make \
        build-essential \
        zsh \
        vim \
        mpg123 \
        festival \
        flite \
        fortune && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN usermod -a -G tty node && \
    usermod -a -G dialout node

WORKDIR /app
