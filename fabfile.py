# coding: utf-8

import subprocess
import os

from fabric import task


@task
def build(ctx, names='johnny+webapp'):
    """Build images"""
    names = names.replace('+', ' ')
    ctx.run(f'docker compose build {names}', env=os.environ)


@task
def run(ctx, names='johnny+webapp+nginx+certbot'):
    """Start all containers necessary to run the system"""
    names = names.replace('+', ' ')
    ctx.run(
        f'docker compose up -d {names}',
        env={
            'COMPOSE_HTTP_TIMEOUT': '300',
            'USER_ID': str(os.geteuid()),
            **os.environ,
        },
    )

@task
def run_dev(ctx, docker='webapp'):
    """Start container in development mode"""
    ctx.run(
        f'docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d {docker}',
        env={
            'COMPOSE_HTTP_TIMEOUT': '300',
            'USER_ID': str(os.geteuid()),
            **os.environ,
        },
    )


@task
def stop(ctx, names='johnny+webapp+nginx+certbot'):
    """Stop all containers"""
    names = names.replace('+', ' ')
    ctx.run(f'docker compose stop {names}', env=os.environ)


@task
def restart(ctx, names='johnny+webapp+nginx+certbot'):
    """Restart all containers"""
    names = names.replace('+', ' ')
    ctx.run(f'docker compose restart {names}', env=os.environ)


@task
def purge(ctx, names='johnny+webapp+nginx+certbot'):
    """Stop and purge (remove) containers"""
    names = names.replace('+', ' ')
    ctx.run(f'docker compose stop {names} && docker compose rm -f {names}', env=os.environ)


@task
def sh(ctx, docker='johnny'):
    """Spawn and join bash shell in specified node ('johnny' by default)"""
    subprocess.call(['docker compose', 'exec', docker, 'env', 'TERM=xterm', '/bin/bash', '-li'])


@task
def zsh(ctx, docker='johnny'):
    """Spawn and join zsh shell in specified node ('johnny' by default)"""
    subprocess.call(['docker', 'compose', 'exec', docker, 'env', 'TERM=xterm', '/bin/zsh', '-li'])


@task
def log(ctx, docker='johnny'):
    """Show logs from specified node ('johnny' by default)"""
    subprocess.call(['docker', 'compose', 'logs', '--tail', 'all', '--follow', docker])


@task
def logs(ctx):
    """Show logs from all nodes"""
    subprocess.call(['docker', 'compose', 'logs', '--tail', 'all', '--follow'])
