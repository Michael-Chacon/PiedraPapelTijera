const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const players = []

class Player{
    constructor(id){
        this.id = id
    }

    assignCharacter(character){
        this.character = character
    }

    assignAttacks(attack){
        this.attack = attack
    }
}

class Character{
    constructor(name){
        this.name = name
    }
}


app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const player = new Player(id)
    players.push(player)
    res.send(id)
})


app.post('/player/:playerId', (req, res) => {
    const playerId = req.params.playerId || ''
    const name = req.body.character || ''
    const character = new Character(name)
    const indexPlayer = players.findIndex(player => playerId === player.id)
    if (indexPlayer >= 0){
        players[indexPlayer].assignCharacter(character)
    }

    console.log("Id jugador: " + playerId)
    console.log("nombre: " + name)
    res.end()
})


app.post('/player/:playerId/attacks', (req, res) => {
    const playerId = req.params.playerId || ''
    const attacks = req.body.attacks || []

    const indexPlayer = players.findIndex(player => playerId === player.id)
    if (indexPlayer >=0){
        players[indexPlayer].assignAttacks(attacks)
    }
    res.end()
})


app.get('/playes/:playerId/attacks', (req, res) => {
    const playerId = req.params.playerId || ''
    const player = players.find(jugador => playerId === jugador.id)
    res.send({
        attack: player.attack || []
    })
})


app.listen(8080, () => {
    console.log("Star server")
})