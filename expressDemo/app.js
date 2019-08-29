var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')

var log = console.log.bind(console, '*** syslog: ')

var app = express()

app.use(express.static('static'))
app.use(bodyParser.json())

app.get('/', (requeset, response) => {
    const path = 'index.html'
    const options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, (error, data) => {
        response.send(data)
    })
})



var server = app.listen(8000, (...args) => {
    var host = server.address().address
    var port = server.address().port

    log(`应用实例访问地址为 http://${host}:${port}`)
})