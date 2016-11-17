require('babel-core/register')({
  presets: ['latest', 'react'],
});

var webpack = require('webpack')
var config = require('./webpack.prod.config')
var path = require('path')
var express = require('express');
var requestHandler = require('./prodRequestHandler')

var app = new express();
var port = process.env.PORT || 8080;
const publicPath = express.static(path.join(__dirname, './public'))
console.log("======path.join(__dirname, '../public')", path.join(__dirname, './public'))
app.use('/public', publicPath)
var compiler = webpack(config)
delete process.env.BROWSER;

app.use(requestHandler);

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})