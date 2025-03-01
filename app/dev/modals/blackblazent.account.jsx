document.addEventListener('DOMContentLoaded', function() {
    // Add the event listener to the toggle icon
    document.getElementById("blackblazent_establishments").addEventListener("click", function() {
        createModal();
    });

    // Function to create the modal
    function createModal() {
        // Define the modal HTML as a template string
        const blackblazentModalAccount = `
            <div class="modal-background">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="modal-title">BlackBlazent</h2>
                    </div>
                    <div class="modal-content">
                    <a href="./components/blackblazent-login.html" class="login-now" target="_blank">Login</a>
                    </div>
                </div>
            </div>
        `;

        // Insert the modal HTML into the body
        document.body.insertAdjacentHTML('beforeend', blackblazentModalAccount);

        // Add the animation for sliding the modal in
        setTimeout(() => {
            document.querySelector('.modal-container').classList.add('slide-in');
        }, 10);  // Delay the animation slightly to let the modal render

        // Add event listener to close the modal when clicked outside of it
        document.querySelector('.modal-background').addEventListener('click', function(e) {
            if (e.target === this) {
                document.querySelector('.modal-background').remove(); // Remove modal when clicked outside
            }
        });
    }
});
