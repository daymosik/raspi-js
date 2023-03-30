# coding: utf-8

import subprocess
import os

from fabric import task


@task
def build(ctx, name='johnny+webapp'):
    """Build images"""
    name = name.replace('+', ' ')
    ctx.run(f'docker compose build {name}', env=os.environ)


@task
def run(ctx, name='johnny+webapp+nginx+certbot'):
    """Start all containers necessary to run the system"""
    name = name.replace('+', ' ')
    ctx.run(
        f'docker compose up -d {name}',
        env={
            'COMPOSE_HTTP_TIMEOUT': '300',
            'USER_ID': str(os.geteuid()),
            **os.environ,
        },
    )


@task
def stop(ctx, name='johnny+webapp+nginx+certbot'):
    """Stop all containers"""
    name = name.replace('+', ' ')
    ctx.run(f'docker compose stop {name}', env=os.environ)


@task
def restart(ctx, name='johnny+webapp+nginx+certbot'):
    """Restart all containers"""
    name = name.replace('+', ' ')
    ctx.run(f'docker compose restart {name}', env=os.environ)


@task
def purge(ctx, name='johnny+webapp+nginx+certbot'):
    """Stop and purge (remove) containers"""
    name = name.replace('+', ' ')
    ctx.run(f'docker compose stop {name} && docker compose rm -f {name}', env=os.environ)


@task
def sh(ctx, name='johnny'):
    """Spawn and join bash shell in specified node ('johnny' by default)"""
    subprocess.call(['docker compose', 'exec', name, 'env', 'TERM=xterm', '/bin/bash', '-li'])


@task
def zsh(ctx, name='johnny'):
    """Spawn and join bash shell in specified node ('johnny' by default)"""
    subprocess.call(['docker', 'compose', 'exec', name, 'env', 'TERM=xterm', '/bin/zsh', '-li'])


@task
def log(ctx, name='johnny'):
    """Spawn and join bash shell in specified node ('johnny' by default)"""
    subprocess.call(['docker', 'compose', 'logs', '--tail', 'all', '--follow', name])


@task
def logs(ctx):
    """Spawn and join bash shell in specified node ('johnny' by default)"""
    subprocess.call(['docker', 'compose', 'logs', '--tail', 'all', '--follow'])
