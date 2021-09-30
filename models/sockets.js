const TicketControl = require("./TicketControl")

class Sockets {
    constructor(io){
        this.io = io
        this.ticket = new TicketControl()
        this.socketEvents()
    }

    socketEvents(){
        this.io.on('connection', (socket) => {
            
            // Es preferible enviar esta informacion por un get
            // socket.emit('actualizarHistorial', this.ticket.ultimos13)

            socket.on('nuevo-ticket', (payload, callback) => {
                callback(this.ticket.nuevo())
            })

            socket.on('siguiente-ticket', ({agente, escritorio}, callback) => {
                const ticket = this.ticket.atender(agente, escritorio)
                if (!ticket) return callback({numero: null, agente: null, escritorio: null})
                callback(ticket)
                this.io.emit('actualizarHistorial', this.ticket.ultimos13)
            })

        })
    }

}

module.exports = Sockets