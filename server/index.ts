import * as express from 'express'

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

app.use(express.static('./public'))
app.get('/about', (req, res) => res.send('Hello World'))

app.listen(3000)
