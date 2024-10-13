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

    // Handle create account button click
    const createAccountBtn = document.getElementById('create-account-btn');
    const createAccountForm = document.getElementById('create-account-form');
    if (createAccountBtn && createAccountForm) {
        createAccountBtn.addEventListener('click', function () {
            createAccountForm.style.display = 'block';
        });
        createAccountForm.addEventListener('submit', handleCreateAccount);
    }

    // Handle profile picture click to toggle dropdown
    const profilePhoto = document.getElementById('profile-photo');
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profilePhoto && profileDropdown) {
        profilePhoto.addEventListener('click', function () {
            profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Handle logout link click
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            handleLogout(); // Call your logout function
            profileDropdown.style.display = 'none'; // Hide dropdown after logout
        });
    }

    // Handle updates link click to route to updates.html
    const updatesLink = document.getElementById('updates-link');
    if (updatesLink) {
        updatesLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'updates.html'; // Redirect to updates.html
        });
    }
});

function checkLoginStatus() {
    const profileContainer = document.getElementById('profile-container');
    const loginLink = document.querySelector('nav ul li a[href="login.html"]');
    const usernameDisplay = document.getElementById('profile-username'); // Update for correct username element

    const loggedIn = getCookie("loggedIn");
    const username = getCookie("username"); // Get the username from the cookie

    if (loggedIn === "true") {
        if (profileContainer) profileContainer.style.display = 'inline-block';
        if (loginLink) loginLink.style.display = 'none';
        if (usernameDisplay) usernameDisplay.textContent = `Logged in as: ${username}`; // Display the username
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
        alert('Login successful.');
        setCookie("loggedIn", "true", 1);
        setCookie("username", username, 1); // Store username in a cookie
        window.location.href = 'index.html';
    } else {
        alert('Invalid username/password');
    }
}

function handleLogout() {
    setCookie("loggedIn", "", -1);
    setCookie("username", "", -1); // Clear the username cookie
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

function handleCreateAccount(e) {
    e.preventDefault();
    const specialCode = document.getElementById('special-code').value;
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Replace 'teamSpecialCode' with the actual special code for team members
    const teamSpecialCode = '1234';

    if (specialCode === teamSpecialCode) {
        setCookie(newUsername, newPassword, 365); // Save the new account details
        alert('Account created successfully. You can now log in.');
        document.getElementById('create-account-form').style.display = 'none'; // Hide the form
    } else {
        alert('Invalid special code. Please try again.');
    }
}
