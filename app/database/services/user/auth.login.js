document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById("loginForm");
    
    // Listen for form submission
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission to avoid page reload

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Send a request to the server to generate a code
        fetch('/sendVerificationCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Verification code sent to your email.');
                // Now ask the user for the code
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
                        alert('Login successful!');
                        window.location.href = "index.html"; // Redirect to the dashboard or other page
                    } else {
                        alert('Invalid verification code. Please try again.');
                    }
                });
            } else {
                alert('Failed to send verification code. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending the verification code.');
        });
    });
});
