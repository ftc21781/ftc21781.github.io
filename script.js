document.addEventListener('DOMContentLoaded', function () {
    // Create the custom cursor element and append it to the body
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);

    // Move the custom cursor based on mouse movement
    document.addEventListener('mousemove', function (e) {
        customCursor.style.left = `${e.clientX + window.scrollX}px`;
        customCursor.style.top = `${e.clientY + window.scrollY}px`;
    });

    // Hide the custom cursor when leaving the window
    document.addEventListener('mouseleave', function () {
        customCursor.style.display = 'none';
    });

    // Show the custom cursor when entering the window
    document.addEventListener('mouseenter', function () {
        customCursor.style.display = 'block';
    });

    // Detect when the mouse hovers over a link, button, or input
    const interactiveElements = document.querySelectorAll('a, button, input');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            customCursor.classList.add('pulsate'); // Add pulsate animation
        });
        element.addEventListener('mouseleave', function () {
            customCursor.classList.remove('pulsate'); // Remove pulsate animation
        });
    });

    // Check login status and update UI
    checkLoginStatus();

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

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