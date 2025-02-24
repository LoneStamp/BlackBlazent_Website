document.addEventListener('DOMContentLoaded', function() {
    // Get the button and popup elements
    const seeMoreButton = document.getElementById('see-more-page');
    const popup = document.getElementById('morePageViewer');
    const iconMorePage = document.getElementById('icon-more-page');
    
    // Toggle the popup visibility when the button is clicked
    seeMoreButton.addEventListener('click', function(event) {
        // If the popup is already visible, hide it; otherwise, show it
        if (popup.style.display === 'flex') {
            popup.style.display = 'none'; // Hide the popup
        } else {
            popup.style.display = 'flex'; // Show the popup
        }
    });

    // Close the popup when clicking outside of the popup content
    window.addEventListener('click', function(event) {
        // Close the popup if the click is outside of the popup
        if (event.target === popup) {
            popup.style.display = 'none'; // Hide the popup
        }
    });
});
