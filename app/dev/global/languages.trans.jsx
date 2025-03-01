document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const chooseLanguagesButton = document.getElementById('choose-languages');
    const languagePopup = document.getElementById('language-popup');
    const languageItems = document.querySelectorAll('.language-item');

    // Event listener to toggle the popup visibility
    chooseLanguagesButton.addEventListener('click', function(event) {
        // Toggle visibility of popup
        languagePopup.style.display = (languagePopup.style.display === 'none' || languagePopup.style.display === '') ? 'block' : 'none';
        // Adjust position to be near the button
        const buttonRect = chooseLanguagesButton.getBoundingClientRect();
        languagePopup.style.left = buttonRect.left + 'px';
        languagePopup.style.top = (buttonRect.top + buttonRect.height) + 'px';
        event.stopPropagation(); // Prevent event from propagating to document
    });

    // Event listeners for each language item
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            const selectedLanguage = item.getAttribute('data-lang');
            console.log("Selected language:", selectedLanguage);
            // You can change the website language here based on selection
            // For example, call a function to change text content
            languagePopup.style.display = 'none'; // Close popup after selection
        });
    });

    // Close popup if clicking outside the popup
    document.addEventListener('click', function(event) {
        if (!languagePopup.contains(event.target) && event.target !== chooseLanguagesButton) {
            languagePopup.style.display = 'none';
        }
    });
});
