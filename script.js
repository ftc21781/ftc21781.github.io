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

    // Handle profile picture click
    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', function () {
            const profileDropdown = document.getElementById('profile-dropdown');
            profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Handle logout link click
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
});

function checkLoginStatus() {
    const profileContainer = document.getElementById('profile-container');
    const loginLink = document.querySelector('nav ul li a[href="login.html"]');

    if (getCookie("loggedIn") === "true") {
        if (profileContainer) profileContainer.style.display = 'inline-block';
        if (loginLink) loginLink.style.display = 'none';
    } else {
        if (profileContainer) profileContainer.style.display = 'none';
        if (loginLink) loginLink.style.display = 'inline-block';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedPassword = getCookie(username);

    if (storedPassword && storedPassword === password) {
        alert('Login successful!');
        setCookie("loggedIn", "true", 1);
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
}

function handleLogout() {
    setCookie("loggedIn", "", -1);
    window.location.href = 'index.html';
}

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

document.addEventListener('DOMContentLoaded', function () {
    // Handle create account button click
    const createAccountBtn = document.getElementById('create-account-btn');
    const createAccountForm = document.getElementById('create-account-form');
    createAccountBtn.addEventListener('click', function () {
        createAccountForm.style.display = 'block';
    });

    // Handle create account form submission
    createAccountForm.addEventListener('submit', handleCreateAccount);
});

function handleCreateAccount(e) {
    e.preventDefault();
    const specialCode = document.getElementById('special-code').value;
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Replace 'teamSpecialCode' with the actual special code for team members
    const teamSpecialCode = '1234';

    if (specialCode === teamSpecialCode) {
        // Save the new account details (this is a simple example, in a real application you would save this to a database)
        setCookie(newUsername, newPassword, 365);
        alert('Account created successfully! You can now log in.');
        createAccountForm.style.display = 'none';
    } else {
        alert('Invalid special code. Please try again.');
    }
}

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
        const data = `Username: ${newUsername}, Password: ${newPassword}\n`;
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'logininfo.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        alert('Account created successfully! You can now log in.');
        createAccountForm.style.display = 'none';
    } else {
        alert('Invalid special code. Please try again.');
    }
}