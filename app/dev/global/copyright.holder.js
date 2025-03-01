document.addEventListener('DOMContentLoaded', function() {
    // Get the element with the class "date-configuration"
    const dateSpan = document.querySelector('.date-configuration');
    
    // Function to update the year dynamically
    function updateYear() {
        const currentYear = new Date().getFullYear(); // Get the current year
        dateSpan.textContent = currentYear; // Update the content of the span with the current year
    }

    // Call the function to set the year when the page loads
    updateYear();
});
