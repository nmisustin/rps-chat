const sendBtn = document.getElementById('send-message');
const messageInput = document.getElementById('message-input');
const messageWrapper = document.getElementById('chat-content');
const userList = document.getElementById('usernames')

const socket = io();
const room = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
socket.emit('create', room);
socket.on('connection', message =>{
    console.log(message);
    const username = window.sessionStorage.getItem('username');
    socket.emit('username', username);
})

socket.on('users', users => {
    console.log(users);
    creatUserList(users);
})
function creatUserList(users){
    userList.innerHTML = '';
    for (let i =0; i< users.length; i++){
        const user = users[i];
        const button = document.createElement('button');
        button.setAttribute('class', 'btn');
        button.innerHTML=user;
        userList.appendChild(button);
    }
}
function getInput(event){
    event.preventDefault();
    const message = messageInput.value.trim();
    const username = window.sessionStorage.getItem('username');
    socket.emit('userMessage', {'message': message, 'username': username})
    userOutput(message, username);
    messageInput.value = '';
}
socket.on('recievedMessage', message => {
    recievedOutput(message)
})
// socket.on('userMessage', message => {
//     userOutput(message);
// })
function userOutput(message, username){
    const div = document.createElement('div');
    div.setAttribute("class", "media media-chat media-chat-reverse")
    const div2 = document.createElement('div');
    div2.setAttribute("class", "media-body")
    const output = document.createElement('p');
    output.setAttribute("class", "sent-message");
    output.innerHTML= username +': ' +message;
    div2.appendChild(output);
    div.appendChild(div2);
    console.log(div);
    messageWrapper.appendChild(div)
}
function recievedOutput(message){
    console.log(message);
    const div = document.createElement('div');
    div.setAttribute("class", "media media-chat media-chat")
    const div2 = document.createElement('div');
    div2.setAttribute("class", "media-body")
    const output = document.createElement('p');
    output.setAttribute("class", "recieved-message");
    output.innerHTML= message.username + ': ' + message.message;
    div2.appendChild(output);
    div.appendChild(div2)
    messageWrapper.appendChild(div)
}

sendBtn.addEventListener('click', getInput);