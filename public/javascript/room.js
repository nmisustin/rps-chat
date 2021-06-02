function loginRoomValue() {
    var rm = document.getElementsByName('login-room');

    for(i = 0; i < rm.length; i++) {
        if(rm[i].checked){
            const room = rm[i];
            console.log(room);
        }
    }
}
function signUpRoomValue(){
    var rm = document.getElementsByName('signup-room');

    for(i = 0; i < rm.length; i++) {
        if(rm[i].checked){
            const room = rm[i];
            console.log(room);
        }
    }
}
console.log('room is connected')
document.querySelector('#signInBtn').addEventListener('click', loginRoomValue);

document.querySelector('.signup-form').addEventListener('submit', signUpRoomValue);