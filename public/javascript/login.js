async function signupFormHandler(room) {
    const roomName = room;

    const email = document.querySelector('#email').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            document.location.replace('/chat/'+roomName)
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(room) {
  const roomName = room
  
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();
  console.log(username, password)
  if (username && password) {
    console.log('you have entered here')
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      console.log('success')
      document.location.replace('/chat/'+roomName);
    } 
    else {
      alert(response.statusText);
    }
  }
}
async function logout(){
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: {'Content-Type': 'application/json'}
  });
  if (response.ok){
    document.location.replace('/');
  }
  else{
    alert(response.statusText);
  }
}
  
document.querySelector('#login-rock').addEventListener('click', (e) => {
  e.preventDefault();
  loginFormHandler('rock');
});
document.querySelector('#login-paper').addEventListener('click', (e) => {
  e.preventDefault();
  loginFormHandler('paper');
});
document.querySelector('#login-scissors').addEventListener('click', (e) => {
  e.preventDefault();
  loginFormHandler('scissors');
});

document.querySelector('#signup-rock').addEventListener('click', (e) => {
  e.preventDefault();
  signupFormHandler('rock');
});
document.querySelector('#signup-paper').addEventListener('click', (e) => {
  e.preventDefault();
  signupFormHandler('paper');
});
document.querySelector('#signup-scissors').addEventListener('click', (e) => {
  e.preventDefault();
  signupFormHandler('scissors');
});
document.querySelector('#logout').addEventListener('click', logout);