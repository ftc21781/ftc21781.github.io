
document.addEventListener('DOMContentLoaded', function () {
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);

    document.addEventListener('mousemove', function (e) {
        const cursor = document.querySelector('.custom-cursor');
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });

    /* Optional: Hide cursor when leaving the document */
    document.addEventListener('mouseleave', function () {
        customCursor.style.display = 'none';
    });

    document.addEventListener('mouseenter', function () {
        customCursor.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Create the custom cursor element and append it to the body
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);

    // Move the custom cursor based on mouse movement
    document.addEventListener('mousemove', function (e) {
        customCursor.style.left = `${e.pageX}px`;
        customCursor.style.top = `${e.pageY}px`;
    });

    // Hide the custom cursor when leaving the window
    document.addEventListener('mouseleave', function () {
        customCursor.style.display = 'none';
    });

    // Show the custom cursor when entering the window
    document.addEventListener('mouseenter', function () {
        customCursor.style.display = 'block';
    });

    // Detect when the mouse hovers over a link
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function () {
            customCursor.classList.add('pulsate'); // Add pulsate animation
        });

        link.addEventListener('mouseleave', function () {
            customCursor.classList.remove('pulsate'); // Remove pulsate animation
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Create the custom cursor element and append it to the body
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);

    // Move the custom cursor based on mouse movement
    document.addEventListener('mousemove', function (e) {
        customCursor.style.left = `${e.pageX}px`;
        customCursor.style.top = `${e.pageY}px`;
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
});
