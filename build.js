const fs = require('fs')
const PassThrough = require('stream').PassThrough
const browserify = require('browserify')
const uglifyify = require('uglifyify')
const bubleify = require('bubleify')
const exorcist = require('exorcist')
const replace = require('replacestream')
const concat = require('concat-stream')
const purify = require('purifycss')
const cssnano = require('cssnano')
const after = require('after')

// Promise to wait for the bundles to build before we run `purify`.s
let onComplete
const ready = new Promise((resolve) => {
  onComplete = after(2, resolve)
})

browserify({ entries: 'src/app.js', debug: true })
  .transform('bubleify', {
    jsx: 'h',
    objectAssign: 'Object.assign'
  })
  .transform(bubleForDependencies, { global: true })
  .transform('sheetify/transform')
  .transform('uglifyify', { global: true })
  .plugin('css-extract', { out: createCssStream })
  .plugin('bundle-collapser/plugin')
  .bundle()
  .pipe(uglify())
  .pipe(exorcist('build/bundle.js.map'))
  .pipe(fs.createWriteStream('build/bundle.js'))
  .on('close', onComplete)

fs.createReadStream('index.html')
  .pipe(replace('</head>', '<link rel="stylesheet" href="bundle.css"></head>'))
  .pipe(fs.createWriteStream('build/index.html'))
  .on('close', onComplete)

function uglify (opts) {
  return uglifyify('build/bundle.js', opts)
}

function bubleForDependencies (file, opts) {
  if (file.includes('node_modules/tiny-toast')) {
    return bubleify(file, opts)
  }
  return PassThrough()
}

function createCssStream () {
  return concat((css) => {
    ready.then(() => {
      purify([
        'build/bundle.js',
        'build/index.html'
      ], css, (purified) => {
        cssnano.process(purified).then((result) => {
          fs.writeFile('build/bundle.css', result.css)
        })
      })
    })
  })
}
