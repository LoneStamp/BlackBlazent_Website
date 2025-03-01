document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById("signupForm");

    // Listen for form submission
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission to avoid page reload

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Send a request to the server to create a new account
        fetch('/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Account created successfully. A verification code has been sent to your email.');
                // Now ask the user for the verification code
                const code = prompt('Please enter the verification code sent to your email:');

                // Send the code to the server to verify it
                fetch('/verifyCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, code: code })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Sign-up successful!');
                        window.location.href = "index.html"; // Redirect to the dashboard or other page
                    } else {
                        alert('Invalid verification code. Please try again.');
                    }
                });
            } else {
                alert('Failed to create account. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the account.');
        });
    });
});