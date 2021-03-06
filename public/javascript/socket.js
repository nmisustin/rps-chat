const sendBtn = document.getElementById('send-message');
const messageInput = document.getElementById('message-input');
const messageWrapper = document.getElementById('chat-content');
const gameWrapper = document.getElementById('game-text')
const weaponButtons = document.getElementById('weapon-buttons')
const userList = document.getElementById('usernames')

let users = [];

const socket = io();
const room = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
socket.emit('create', room);
socket.on('ready', message =>{
    console.log(message);
    const username = window.sessionStorage.getItem('username');
    socket.emit('username', username);
})

socket.on('users', userObjects => {
    console.log(userObjects);
    creatUserList(userObjects);
})
function creatUserList(userObjects){
    userList.innerHTML = '';
    users = userObjects
    console.log(users);
    for (let i =0; i< users.length; i++){
        const user = users[i];
        const button = document.createElement('button');
        button.setAttribute('class', 'btn');
        button.setAttribute('value', user);
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
function getGameUsers(event){
    const player_1 = event.target.value;
    const player_2 = window.sessionStorage.getItem('username');
    socket.emit('startGame', {'player_1': player_1, 'player_2':player_2});
}
function gameDialogue(msg){
    const div = document.createElement('div');
    div.setAttribute("class", "media media-chat media-chat")
    const div2 = document.createElement('div');
    div2.setAttribute("class", "media-body")
    const output = document.createElement('p');
    output.setAttribute("class", "recieved-message");
    output.innerHTML= msg;
    div2.appendChild(output);
    div.appendChild(div2)
    gameWrapper.appendChild(div)
}
socket.on('challenge', msg => {
    gameDialogue(msg);
})
function getAttacks(event){
    const weapon = event.target.value;
    socket.emit('fight', {'weapon': weapon, 'user': window.sessionStorage.getItem('username')});
}
function renderGameResults(message){
    console.log(message);
    const div = document.createElement('div');
    div.setAttribute("class", "media media-chat media-chat")
    const div2 = document.createElement('div');
    div2.setAttribute("class", "media-body")
    const output = document.createElement('p');
    output.setAttribute("class", "game-result");
    output.innerHTML= message;
    div2.appendChild(output);
    div.appendChild(div2)
    messageWrapper.appendChild(div)
}
socket.on('gameResult', msg => {
    renderGameResults(msg);
});
socket.on('result', msg => {
    gameWrapper.innerHTML = '';
    gameDialogue(msg)
});
messageInput.addEventListener("keyup", event => {
    if (event.keyCode === 13){
        event.preventDefault();
        sendBtn.click();
    }
})

sendBtn.addEventListener('click', getInput);
userList.addEventListener('click', getGameUsers);
weaponButtons.addEventListener('click', getAttacks)