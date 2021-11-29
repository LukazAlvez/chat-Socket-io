const express = require('express')
const {engine}= require('express-handlebars') 
const app = express()
const http =require('http');
const server = http.createServer(app);
const path = require('path');
const {Server} = require('socket.io');
const io = new Server(server);

//config pasta public
app.use(express.static(path.join(__dirname, 'public')));

//configuração handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set("views", "./views")


//rotas
app.get('/', (req, res)=>{
  res.render('index')
  //sockt io
  io.on('connection', function(socket){
    socket.on('chat message', function(dataMessage){
      io.emit('chat message',dataMessage);
    });
  });
})


//abrindo servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})