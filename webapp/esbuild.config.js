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
    outdir: DIST_DIR,
    bundle: true,
    minify: true,
    sourcemap: true,
    logLevel: 'info',
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
  .then(async (context) => {
    const cb = (err) => {
      if (err) throw err
    }
    console.log(`⏳Copying files...`)
    if (!fs.existsSync(`${DIST_DIR}/images`)) {
      await fs.mkdir(`${DIST_DIR}/images`, cb)
    }
    await fs.copyFile(`./src/index.html`, `${DIST_DIR}/index.html`, cb)
    console.log(`✅ HTML: copied.`)
    await fs.copyFile(`./src/raspi-js.webmanifest`, `${DIST_DIR}/raspi-js.webmanifest`, cb)
    console.log(`✅ Manifest: copied.`)
    await fs.cp(`./src/assets/images/favicon`, `${DIST_DIR}`, { recursive: true }, cb)
    console.log(`✅ Favicons: copied.`)
    return context
  })
  .then(async (context) => {
    console.log(`⏳Service Worker: generating...`)
    await generateSW({
      globDirectory: 'dist/',
      globPatterns: ['**/*.{css,woff2,png,svg,jpg,js,html,webmanifest}'],
      swDest: 'dist/sw.js',
      ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
    })
    console.log(`✅ Service Worker: generated.`)
    return context
  })

if (watch) {
  console.log(`⏳Watching...`)
  await context.watch()
  console.log('👀 Watching for changes')
} else {
  console.log(`⏳Building...`)
  await context.rebuild()
  console.log('⚡ Build complete! ⚡')
  context.dispose()
}
