// Function to create the popup dialog dynamically near the logo
function createLogoBrandModal() {
    // Create the modal container using HTML template
    const modalHTML = `
        <div id="logoBrandModal" class="logoBrandModal">
            <button id="refreshButton" style="margin-right: 10px;">Refresh</button>
            <button id="cookiesButton">Cookies</button>
        </div>
    `;
    
    // Insert the modal into the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get the modal, buttons, and logo image
    const modal = document.getElementById('logoBrandModal');
    const refreshButton = document.getElementById('refreshButton');
    const cookiesButton = document.getElementById('cookiesButton');
    const logoImage = document.getElementById('logo_of_blackblazent');
    
    // Event listener to show the modal near the logo when clicked
    logoImage.addEventListener('click', function(event) {
        // Position the modal near the logo
        const logoRect = logoImage.getBoundingClientRect();
        modal.style.top = `${logoRect.top + window.scrollY + logoRect.height}px`;  // Below the logo
        modal.style.left = `${logoRect.left + window.scrollX}px`;  // Align with logo

        // Show the modal
        modal.style.display = 'block';
    });

    // Event listener for the "Refresh" button
    refreshButton.addEventListener('click', function() {
        location.reload(); // Refresh the page
    });

    // Event listener for the "Cookies" button
    cookiesButton.addEventListener('click', function() {
        alert('Cookies information');
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (!modal.contains(event.target) && event.target !== logoImage) {
            modal.style.display = 'none';
        }
    });
}

// Call the function to create the modal when the page loads
window.onload = function() {
    createLogoBrandModal();
};
