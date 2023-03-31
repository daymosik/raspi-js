import { sassPlugin } from 'esbuild-sass-plugin'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import esbuild from 'esbuild'
import * as fs from 'fs'
// import manifestPlugin from 'esbuild-plugin-manifest'

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
      // manifestPlugin(),
      sassPlugin({
        async transform(source) {
          const { css } = await postcss([autoprefixer]).process(source)
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

if (watch) {
  await context.watch()
  console.log('watching')
} else {
  await context.rebuild()
  console.log('⚡ Build complete! ⚡')
  context.dispose()
}

// TODO
// new WebpackPwaManifest({
//     name: 'RaspiJS',
//     short_name: 'RaspiJS',
//     description: '',
//     background_color: '#ffffff',
//     crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
//     icons: [
//         {
//             src: path.resolve('src/assets/images/logo-vertical.png'),
//             sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
//         },
//         {
//             src: path.resolve('src/assets/images/logo-vertical.png'),
//             size: '1024x1024', // you can also use the specifications pattern
//         },
//     ],
// }),
//     new WorkboxPlugin.GenerateSW({
//         swDest: 'sw.js',
//         clientsClaim: true,
//         skipWaiting: true,
//     }),
