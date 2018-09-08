import * as express from 'express'
import * as path from 'path'

export const app = express()

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const compiler = webpack(require('../config/webpack.dev'))

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: '/',
    })
  )

  app.use(require('webpack-hot-middleware')(compiler))
}

app.all('/random.html', (req, res) => res.sendStatus(404))

app.use(
  express.static(path.resolve(__dirname, '../dist/'), {
    extensions: ['html'],
  })
)

app.listen(process.env.PORT || 3000)
