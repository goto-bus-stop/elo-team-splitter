const fs = require('fs')
const browserify = require('browserify')

browserify({ entries: 'src/app.js' })
  .transform('bubleify', { jsx: 'h' })
  .transform('sheetify/transform')
  .bundle()
  .pipe(fs.createWriteStream('bundle.js'))
