const {v4} = require('uuid')

class Ticket{
    constructor(numero){
        this.id = v4()
        this.numero = numero
        this.escritorio = null
        this.agente = null
    }
}

class TicketControl{
    
    constructor(){
        this.ultimo = 0
        this.pendientes = []
        this.asignados = []
    }

    get siguiente(){
        return this.ultimo += 1
    }

    get ultimos13(){
        return this.asignados.slice(0,13)
    }

    nuevo(){
        const nuevoTicket = new Ticket(this.siguiente)
        this.pendientes.push(nuevoTicket)
        return nuevoTicket
    }

    atender(agente, escritorio){
        if (this.pendientes.length < 1) return null
        const ticket = this.pendientes.shift()
        ticket.agente = agente
        ticket.escritorio = escritorio
        this.asignados.unshift(ticket)
        return ticket
    }

}

module.exports = TicketControl