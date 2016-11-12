require('babel-core/register')({
  presets: ['latest', 'react'],
});

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.dev.config')
var path = require('path')
var Express = require('express')
var requestHandler = require('./requestHandler')

var app = new Express()
var port = 7770

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true}
}))

app.use(webpackHotMiddleware(compiler))

//delete browser 
//Solving the issue http://stackoverflow.com/questions/30347722/importing-css-files-in-isomorphic-react-components
delete process.env.BROWSER;

app.use(requestHandler);

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})