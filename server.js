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

//firebase 
var firebase = require('firebase/compat/app');
require('firebase/compat/database');

const firebaseConfig = {
    apiKey: "AIzaSyCq-gD05dihbZgntvnhX1RXxaAEEUxsFT0",
    authDomain: "allarmedicasa-dc621.firebaseapp.com",
    projectId: "allarmedicasa-dc621",
    storageBucket: "allarmedicasa-dc621.appspot.com",
    messagingSenderId: "881462219879",
    appId: "1:881462219879:web:ebae1cddc700903082b0c2",
    databaseURL: "https://allarmedicasa-dc621-default-rtdb.europe-west1.firebasedatabase.app"
  };
firebase.initializeApp(firebaseConfig)

var data 
firebase.database().ref().on('value', (snapshot) => {
    data = snapshot.val();
    console.log(`dati caricati da firebase`)
});


function nnu(x) {
    return x !== undefined || x !== null;
  }
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
    if(nnu(data['sendMessage']) && data['sendMessage']){
        bot.telegram.sendMessage(862519383, 'sensore di movimento scattato in garage', {
        })
    }
    res.send({buzzerIsOn: data['buzzerIsOn']})
})

//comandi per il bot

//comandi per attivate e disattivare il suono del buzzer allo scattare di un sensore
bot.command('attiva_buzzer', (ctx) => {
    firebase
        .database()
        .ref('buzzerIsOn')
        .set(true);
    ctx.reply('Buzzer attivato');
    console.log('buzzer attivato')
});
bot.command('disattiva_buzzer', (ctx) => {
    firebase
        .database()
        .ref('buzzerIsOn')
        .set(false);
    ctx.reply('Buzzer disattivato');
    console.log('buzzer disattivato')
});

//comandi per attivare e disattivare l'invio del messaggio allo scattare del sensore
bot.command('attiva_messaggi', (ctx) => {
    firebase
        .database()
        .ref('sendMessage')
        .set(true);
    ctx.reply('Messaggi attivati');
    console.log('Messaggi attivati')
});
bot.command('disattiva_messaggi', (ctx) => {
    firebase
        .database()
        .ref('sendMessage')
        .set(false);
    ctx.reply('Messaggi disattivati');
    console.log('Messaggi disattivati')
});

bot.launch()


