function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function handleCreateAccount(e) {
    e.preventDefault();
    const specialCode = document.getElementById('special-code').value;
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    const teamSpecialCode = '1234';

    if (specialCode === teamSpecialCode) {
        setCookie('username', newUsername, 7);
        setCookie('password', newPassword, 7);
        alert('Account created successfully!');
    } else {
        alert('Invalid special code.');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = getCookie('username');
    const storedPassword = getCookie('password');

    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        displayProfile(username);
    } else {
        alert('Invalid username or password.');
    }
}

function displayProfile(username) {
    const profileContainer = document.getElementById('profile-container');
    const profileUsername = document.getElementById('profile-username');
    profileUsername.textContent = username;
    profileContainer.style.display = 'block';
}

document.getElementById('create-account-form').addEventListener('submit', handleCreateAccount);
document.getElementById('login-form').addEventListener('submit', handleLogin);

document.getElementById('create-account-btn').addEventListener('click', function() {
    document.getElementById('create-account-form').style.display = 'block';
});