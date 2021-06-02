async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            document.location.replace('/chat')
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
  
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
        document.location.replace('/chat');
      } else {
        alert(response.statusText);
      }
    }
  }
  
document.querySelector('#signInBtn').addEventListener('click', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);