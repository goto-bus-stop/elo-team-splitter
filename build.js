const fs = require('fs')
const browserify = require('browserify')
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

browserify({ entries: 'src/app.js' })
  .transform('bubleify', {
    jsx: 'h',
    objectAssign: 'Object.assign'
  })
  .transform('sheetify/transform')
  .plugin('css-extract', { out: createCssStream })
  .bundle()
  .pipe(fs.createWriteStream('build/bundle.js'))
  .on('close', onComplete)

fs.createReadStream('index.html')
  .pipe(replace('</head>', '<link rel="stylesheet" href="bundle.css"></head>'))
  .pipe(fs.createWriteStream('build/index.html'))
  .on('close', onComplete)

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
