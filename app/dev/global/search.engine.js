document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');
    const hintInputs = document.querySelectorAll('.feeder-question');
    const mainSearchBar = document.getElementById('main-search-address-bar');
    let timer; // Variable to store the inactivity timer

    // Function to toggle input visibility and animate the main search bar
    searchButton.addEventListener('click', function() {
        // Hide the 4 hint input boxes
        hintInputs.forEach(input => {
            input.style.display = 'none';
        });
        
        // Show the main search bar with animation
        mainSearchBar.style.display = 'block'; // Make the search bar visible
        
        // Start the width animation
        setTimeout(() => {
            mainSearchBar.style.width = '100%'; // Animate to 100% width
        }, 10); // Delay to trigger the animation
        
        // Reset and start inactivity timer
        resetInactivityTimer();
    });

    // Function to reset inactivity timer
    function resetInactivityTimer() {
        // Clear any existing timer
        clearTimeout(timer);

        // Set a new timer to hide the main search bar and show the hint inputs after 10 seconds
        timer = setTimeout(() => {
            // Hide the main search bar
            mainSearchBar.style.display = 'none';
            mainSearchBar.style.width = '10%'; // Reset the width to 10%

            // Show the hint input boxes
            hintInputs.forEach(input => {
                input.style.display = 'block';
            });
        }, 10000); // 10 seconds of inactivity
    }

    // Detect clicks outside the main search bar and hint inputs
    document.addEventListener('click', function(e) {
        // If the click is outside the search container, reset
        if (!document.querySelector('.search-container').contains(e.target)) {
            mainSearchBar.style.display = 'none';
            mainSearchBar.style.width = '10%'; // Reset the width
            hintInputs.forEach(input => {
                input.style.display = 'block'; // Show the hint inputs
            });
            clearTimeout(timer); // Clear the inactivity timer
        }
    });

    // Prevent the search button and the main search bar from triggering the click event
    searchButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click event from bubbling up to the document
    });

    mainSearchBar.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click event from bubbling up to the document
        resetInactivityTimer(); // Reset inactivity timer when interacting with the search bar
    });
});
