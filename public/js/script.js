const socket = io();

var nome_usuario = prompt("Qual seu nome?");

document.getElementById('send-message').addEventListener("click", enviarMenssagem)

function enviarMenssagem(){
    var msg = document.getElementById('message').value

    var dataMessage = {nome: nome_usuario,
                        msg: msg}

    console.log(dataMessage);
    // concatena o nome de usuário e a mensagem para enviar ao socketIo
    socket.emit('chat message',dataMessage);
    // reseta o valor do input da mensagem
    document.getElementById('message').value = "";
}

socket.on("chat message", function(dataMessage){
    if(dataMessage.msg != ""){    
        if(dataMessage.nome == nome_usuario){
            var mensagem = `<div class='chat received'><img src='/img/user.png'><div class='details'><p>${dataMessage.msg}</p></div></div>`
        }else{
            var mensagem = `<div class="chat sent"><div class="details"><p>${dataMessage.msg}</p></div></div>`
        }
        document.getElementById('chat').innerHTML += mensagem
    }
})


