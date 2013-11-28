if (!process.env.NODE_ENV) process.env.NODE_ENV='development'

var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , logs = require('./server/api/logs')
  , colors = require('colors')

var app = express()

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/api/logs', logs.list) 

app.get('/api/logs/total', logs.total) //placement matters

app.get('/api/logs/:id', logs.read) //sometimes called 'show'
app.post('/api/logs', logs.create)
app.put('/api/logs/:id', logs.update)
app.del('/api/logs/:id', logs.del)



var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


