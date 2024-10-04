document.getElementById('dataForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = {
        "message": "Adding new entry",
        "content": btoa(JSON.stringify({ name, email, message }))
    };

    const response = await fetch('https://api.github.com/repos/ftc21781/ftc21781.github.io/contents/data.json', {
        method: 'PUT',
        headers: {
            'Authorization': 'YOUR_GITHUB_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
        alert('Data saved successfully!');
    } else {
        alert('Error saving data!');
    }
});
