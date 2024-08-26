const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')   
const { Telegraf } = require('telegraf')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded());
const bot = new Telegraf('7234218457:AAFeRmBk_T3JI5z7BD9yjww-Lud8UN-TMUY')

server.listen(PORT)
let socketAddressEsp = null
io.on('connection', socket=>{
    socket.on('esp', () =>{
        console.log(socket.id)
        socketAddressEsp = socket.id
    })

})


app.post('/newMovement', (req, res)=>{
    console.log('arrivata')
    console.log(req.body)
    bot.telegram.sendMessage(862519383, 'sensore di movimento scattato in cantina', {
    })
})

bot.launch()


