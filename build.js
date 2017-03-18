const fs = require('fs')
const browserify = require('browserify')
const replace = require('replacestream')

browserify({ entries: 'src/app.js' })
  .transform('bubleify', {
    jsx: 'h',
    objectAssign: 'Object.assign'
  })
  .transform('sheetify/transform')
  .plugin('css-extract', { out: 'build/bundle.css' })
  .bundle()
  .pipe(fs.createWriteStream('build/bundle.js'))

fs.createReadStream('index.html')
  .pipe(replace('</head>', '<link rel="stylesheet" href="bundle.css"></head>'))
  .pipe(fs.createWriteStream('build/index.html'))
