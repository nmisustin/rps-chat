const sendBtn = document.getElementById('send-message');
const messageInput = document.getElementById('message-input');
const messageWrapper = document.getElementById('chat-content');

const socket = io();




function getRoomValue() {
    var rm = document.getElementsByName('room');

    for(i = 0; i < rm.length; i++) {
        if(rm[i].checked){
            // 
            // socket code here
            // 
        }
    }
}




function getInput(event){
    event.preventDefault();

    const message = messageInput.value.trim();
    socket.emit('userMessage', message)
    userOutput(message);
    messageInput.value = '';
}
socket.on('recievedMessage', message => {
    recievedOutput(message)
})
// socket.on('userMessage', message => {
//     userOutput(message);
// })
function userOutput(message){
    const div = document.createElement('div');
    div.setAttribute("class", "media media-chat media-chat-reverse")
    const div2 = document.createElement('div');
    div2.setAttribute("class", "media-body")
    const output = document.createElement('p');
    output.setAttribute("class", "sent-message");
    output.innerHTML= message;
    div2.appendChild(output);
    div.appendChild(div2)
    messageWrapper.appendChild(div)
}
function recievedOutput(message){
    const div = document.createElement('div');
    div.setAttribute("class", "media media-chat media-chat")
    const div2 = document.createElement('div');
    div2.setAttribute("class", "media-body")
    const output = document.createElement('p');
    output.setAttribute("class", "recieved-message");
    output.innerHTML= message;
    div2.appendChild(output);
    div.appendChild(div2)
    messageWrapper.appendChild(div)
}

sendBtn.addEventListener('click', getInput)