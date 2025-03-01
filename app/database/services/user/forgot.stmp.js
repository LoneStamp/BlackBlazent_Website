document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");

    forgotPasswordForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission to avoid page reload
        
        const email = document.getElementById("resetEmail").value;

        // Send a request to the server to send a reset password link
        fetch('/sendResetLink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Password reset link sent to your email.');
            } else {
                alert('Failed to send reset link. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending the password reset link.');
        });
    });
});