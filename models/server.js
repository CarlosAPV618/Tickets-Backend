const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const cors = require('cors')
const Sockets = require('./sockets')

class Server {
    constructor(){
        this.port = process.env.PORT
        this.app = express()
        this.paths = {
            ultimos: '/ultimos'
        }
        this.server = http.createServer(this.app)
        this.io = socketio(this.server)
        this.sockets = new Sockets(this.io)
        this.middlewares()
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.get('/ultimos', (req, res) => {
            res.json({
                ultimos: this.sockets.ticket.ultimos13
            })
        })
    }

    // routes(){
    //     this.app.use(this.paths.ultimos, require('../routes/ultimos'))
    //     this.app.use('*', require('../routes/undefined'))
    // }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }

}

module.exports = Server