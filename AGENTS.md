# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this repo is

RaspiJS is a LEGO robot driven by a Raspberry Pi and Arduino boards. It has two TypeScript apps:

- `johnny/`: a Node.js server that runs on the Raspberry Pi (`192.168.1.180`). It talks to the Arduino boards with Johnny-Five (Firmata over serial) and accepts commands over socket.io. It also exposes a small express API for the Yamaha receiver.
- `webapp/`: a React 19 single-page app (PWA) bundled with esbuild. It sends socket.io events to `johnny`, and Firebase Authentication handles login.

This repo is also checked out as a nested repo inside the home-server repo `terminal` (`/home/damian/terminal/raspi-js`). There, the `raspi-js` Compose service builds only `webapp/dist`, and nginx serves it on `:5000`. Commit changes in this repo (`daymosik/raspi-js`), never in `terminal`.

## Layout

| Path | Purpose |
|---|---|
| `johnny/src/server.ts` | Entry point. Imports `raspi.ts` |
| `johnny/src/raspi.ts` | Board setup (`five.Boards`: Mega `/dev/ttyUSB0` = index 0, Uno `/dev/ttyACM0` = index 1). Builds `RaspiComponents` on `ready` |
| `johnny/src/app.ts` | Express + socket.io server on port `8090`, socket path `/chat/socket.io` |
| `johnny/src/routes/socket-routes.ts` | All `command.*` socket events → component/service calls |
| `johnny/src/routes/api-routes.ts` | `GET /api/yamaha/power-on|power-off|power-status` |
| `johnny/src/components/` | Hardware wrappers (motors, servo, LCD, RGB LED, buzzer, 7-segment, sensor) |
| `johnny/src/services/` | Speech (`festival`), sound player (`/wav`), Yamaha (`yamaha-nodejs`), translate, exploration (commented out) |
| `webapp/src/app.tsx` | Firebase init, HashRouter, routes (`/`, `/login`, private: `/remote-control`, `/arrows`, `/components`, `/remotes`) |
| `webapp/src/services/socket.ts` | socket.io client. **Hard-coded** `https://daymosik.freemyip.com:5000`, path `/chat/socket.io` |
| `webapp/src/providers/local-ai-provider.ts` | Ollama chat client. **Hard-coded** `https://daymosik.freemyip.com:5000/ollama`, model `llama3` |
| `webapp/src/components/`, `modules/` | UI widgets and views |
| `webapp/esbuild.config.js` | Build/watch/serve. Injects `FIREBASE_*` env vars, copies HTML, manifest and favicons, generates `dist/sw.js` with Workbox |
| `nginx/app.conf` | nginx on the Pi: `:80` ACME + redirect, `:443` `/chat/` → `127.0.0.1:8090`, `:5001` static `webapp/dist` |
| `docker-compose.yml` / `docker-compose.dev.yml` | Services `johnny`, `webapp`, `nginx`, `certbot`; the dev override switches to `make start-dev` / `make watch` |
| `fabfile.py` | Fabric tasks around `docker compose` |
| `.github/workflows/nodejs.yml` | On push to `master`: webapp `npm install`, `lint`, `./build.sh`, deploy to Firebase Hosting (`raspi-js`) |
| `data/wav/` | Sound clips mounted as `/wav` in johnny |
| `fritzing/` | Wiring diagrams |
| `test/` | Legacy mocha/chai specs. Not run by anything, and mocha/chai are not dependencies |

## Commands

Run the npm/make commands inside the matching container (`fab zsh --docker=johnny|webapp`) or locally with Node 24.

```bash
# johnny
make build        # npm install if needed, eslint, prettier --check, tsc -> dist/
make run          # build + node dist/server.js (needs the Arduino boards connected)
make start-dev    # nodemon src/server.ts
make lint

# webapp (needs webapp/.env, see webapp/.env.example; the Makefile `include`s it)
make build        # clean dist, eslint, prettier --check, production build
make watch / make serve / make lint
npm run fix       # eslint --fix + prettier --write (uses yarn internally)

# containers (Fabric 2: dashes in task names, '+' joins services)
fab build [--names=johnny+webapp]
fab run [--names=...]            # default: johnny+webapp+nginx+certbot
fab run-dev --docker=webapp
fab stop / restart / purge --names=...
fab log --docker=johnny / fab logs / fab zsh --docker=johnny
```

There is no working test suite. To verify a change, run `npm run lint`, `npm run prettier` and the build (`npx tsc --noEmit` in johnny, `npm run build` in webapp) for the app you touched.

## Rules for agents

- **Hardware and production are live.** Do not run `make run`, `fab run`, `restart`, `stop`, `purge`, `docker compose up/down` or `init-letsencrypt.sh` unless the user asks. `johnny` drives physical motors.
- **Never commit secrets.** `webapp/.env`, `certbot/`, `.firebase/` and `firebase-debug.log` are git-ignored. Keep them that way. Firebase config only reaches CI through GitHub secrets.
- **Keep the socket contract in sync.** Socket event names (`command.*`) and payload shapes live in `johnny/src/routes/socket-routes.ts` and in the `socket.emit(...)` calls across `webapp/src`. If you change one side, change the other in the same commit.
- If you add a `FIREBASE_*` variable, update `webapp/.env.example`, the `define` block in `esbuild.config.js`, `build.sh` and the "Create env file" step in the CI workflow.
- **Path aliases** are defined twice in johnny: in `tsconfig.json` `paths` (for `src`) and in `package.json` `_moduleAliases` (for `dist`, used by `module-alias` at runtime). Add new aliases to both. The webapp aliases live only in `tsconfig.json`, because esbuild reads them from there.
- Code style: Prettier + ESLint (flat config, `typescript-eslint`). The build fails on lint or formatting errors. Run `npm run fix:prettier` before finishing.
- `react-router-dom` is pinned to v5 (`Switch`, `component=`). Don't migrate it to v6 APIs as a side effect.
- Hard-coded LAN addresses: Pi `192.168.1.180`, Yamaha `192.168.1.140`, NodeMCU `192.168.1.181` (disabled). The public host is `daymosik.freemyip.com` (`:5000` home server, `:5001` Pi, `:8082` camera). If one changes, grep the whole repo and the parent `terminal` repo.
- Write docs (`README.md`) and code comments in English.
- Commit messages are short, lowercase and imperative-ish (e.g. `update deps`, `update eslint`).

## Known quirks

- `fab sh` is broken: it passes `'docker compose'` as one argv element. Use `fab zsh`.
- The CI "Create env file" step does not write `FIREBASE_APP_ID`.
- `webapp/build.sh` runs `mkdir dist` without `-p`, so it fails if `dist` already exists. This is harmless in CI.
- Speech: `getCommand` in `johnny/src/services/speech.ts` pipes a quoted string to `festival` without `echo`, so custom text is not spoken correctly. Random `fortune` output works.
- `exploration*.ts` and the HC-SR04 `sensor` are commented out. The servo is listed as removed hardware, but `Servo` is still instantiated.
- `johnny` serves `/` with plain `hello`. The real UI is always the webapp.
