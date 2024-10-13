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
    profilePhoto.addEventListener('click', function () {
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Handle logout link click
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            handleLogout(); // Call your logout function
            profileDropdown.style.display = 'none'; // Hide dropdown after logout
        });
    }

    // Handle updates link click (you can replace this with your actual logic)
    const updatesLink = document.getElementById('updates-link');
    if (updatesLink) {
        updatesLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert("This is where updates would be shown."); // Replace with actual logic
        });
    }
});
