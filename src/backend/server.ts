import express from 'express'
import path from 'path'

export const app = express()

if (!PRODUCTION) {
  Promise.all([
    import('webpack'),
    import('webpack-dev-middleware'),
    import('webpack-hot-middleware'),
    import('../../webpack/webpack.dev'),
  ] as const).then(
    ([
      { default: webpack },
      { default: devMiddleware },
      { default: hotMiddleware },
      { default: config },
    ]) => {
      const compiler = webpack(config.find((c) => c.name === 'frontend'))

      app.use(
        devMiddleware(compiler, {
          publicPath: '/',
          writeToDisk: true,
        })
      )
      app.use(hotMiddleware(compiler))
    }
  )
}

app.all('/index.html', (req, res) => res.redirect('/'))
app.all('/random.html', (req, res) => res.redirect('/random'))

app.use(
  express.static(path.join(__dirname, '../../dist/frontend/'), {
    extensions: ['html'],
  })
)

app.listen(process.env.PORT || 3000)
