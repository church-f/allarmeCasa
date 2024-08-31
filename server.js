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

let buzzerIsOn = false
let sendMessage = false

app.post('/newMovement', (req, res)=>{
    console.log('arrivata')
    console.log(req.body)
    if(sendMessage){
        bot.telegram.sendMessage(862519383, 'sensore di movimento scattato in garage', {
        })
    }
    res.send({buzzerIsOn: buzzerIsOn})
})

//comandi per il bot

//comandi per attivate e disattivare il suono del buzzer allo scattare di un sensore
bot.command('attivaBuzzer', (ctx) => {
    buzzerIsOn = true
    ctx.reply('Buzzer attivato');
    console.log('buzzer attivato')
});
bot.command('disattivaBuzzer', (ctx) => {
    buzzerIsOn = false
    ctx.reply('Buzzer disattivato');
    console.log('buzzer disattivato')
});

//comandi per attivare e disattivare l'invio del messaggio allo scattare del sensore
bot.command('attivaMessaggio', (ctx) => {
    sendMessage = true
    ctx.reply('Messaggi attivati');
    console.log('Messaggi attivati')
});
bot.command('disattivaMessaggio', (ctx) => {
    sendMessage = false
    ctx.reply('Messaggi disattivati');
    console.log('Messaggi disattivati')
});

bot.launch()


