// Add the event listener to the toggle icon for the menu
document.getElementById("blackblazent-menu").addEventListener("click", function() {
    createMenu();
});

// Function to create the menu
function createMenu() {
    // Define the menu HTML as a template string
    const blackblazentPopupMenu = `
        <div class="menu-background">
            <div class="menu-container">
                <div class="menu-header">
                    <h2 class="menu-title">Menu</h2>
                </div>
                <div class="menu-content">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Insert the menu HTML into the body
    document.body.insertAdjacentHTML('beforeend', blackblazentPopupMenu);

    // Add the animation for sliding the menu in from the right
    setTimeout(() => {
        document.querySelector('.menu-container').classList.add('slide-in');
    }, 10);  // Delay the animation slightly to let the menu render

    // Add event listener to close the menu when clicked outside of it
    document.querySelector('.menu-background').addEventListener('click', function(e) {
        if (e.target === this) {
            document.querySelector('.menu-background').remove(); // Remove menu when clicked outside
        }
    });
}
