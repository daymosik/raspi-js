import { sassPlugin } from 'esbuild-sass-plugin'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import esbuild from 'esbuild'
import * as fs from 'fs'
import { generateSW } from 'workbox-build'

const args = process.argv.slice(2)
const watch = args.includes('--watch')

const DIST_DIR = './dist'

let context = await esbuild
  .context({
    entryPoints: ['src/app.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    logLevel: 'info',
    outdir: 'dist',
    format: 'esm',
    loader: {
      '.png': 'file',
      '.svg': 'file',
      '.ttf': 'file',
      '.woff': 'file',
      '.woff2': 'file',
      '.eot': 'file',
    },
    plugins: [
      sassPlugin({
        async transform(source) {
          const { css } = await postcss([autoprefixer]).process(source, { from: undefined })
          return css
        },
      }),
    ],
    define: {
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
    },
  })
  .then((context) => {
    fs.copyFile(`./src/index.html`, `${DIST_DIR}/index.html`, (err) => {
      if (err) throw err
      console.log(`${DIST_DIR}/index.html: copied.`)
    })
    return context
  })
  .then((context) => {
    fs.copyFile(`./src/raspi-js.webmanifest`, `${DIST_DIR}/raspi-js.webmanifest`, (err) => {
      if (err) throw err
      console.log(`${DIST_DIR}/raspi-js.webmanifest: copied.`)
    })
    return context
  })
  .then((context) => {
    fs.mkdir(`${DIST_DIR}/images`, () => {
      fs.copyFile(`./src/assets/images/logo-vertical.png`, `${DIST_DIR}/images/logo-vertical.png`, (err) => {
        if (err) throw err
        console.log(`${DIST_DIR}/images/logo-vertical.png: copied.`)
      })
    })
    return context
  })
  .then(async (context) => {
    await generateSW({
      globDirectory: 'dist/',
      globPatterns: ['**/*.{css,woff2,png,svg,jpg,js,html,webmanifest}'],
      swDest: 'dist/sw.js',
      ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
    })
    return context
  })

if (watch) {
  await context.watch()
  console.log('watching')
} else {
  await context.rebuild()
  console.log('⚡ Build complete! ⚡')
  context.dispose()
}
