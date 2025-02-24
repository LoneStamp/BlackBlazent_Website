document.addEventListener("DOMContentLoaded", function() {
    // Grab all input elements
    const inputs = document.querySelectorAll('input[type="radio"]');
    const labels = document.querySelectorAll('label');

    // Function to handle label active state
    function handleActiveState() {
        // Remove active state from all labels
        labels.forEach(label => {
            label.classList.remove('pageNavigatorActive');
        });

        // Check if there is a checked radio button
        const checkedInput = document.querySelector('input[type="radio"]:checked');

        // If there is a checked radio, add the active state to the corresponding label
        if (checkedInput) {
            const activeLabel = document.querySelector(`label[for="${checkedInput.id}"]`);
            if (activeLabel) {
                activeLabel.classList.add('pageNavigatorActive');
            }
        }
    }

    // Function to handle navigation
    function handleNavigation() {
        // If no radio button is checked, select the 'home' radio button by default
        const homeRadio = document.getElementById('home');
        if (!document.querySelector('input[type="radio"]:checked')) {
            homeRadio.checked = true; // Set 'Home' as default selected
        }

        // Navigate based on the selected radio button
        if (homeRadio.checked) {
            // No action needed for "Home", since we're already there
            // Just keep the active state set to home
        } else if (document.getElementById('gallery').checked) {
            window.open('./components/gallery.html', '_blank'); // Open in new tab
        } else if (document.getElementById('products').checked) {
            window.open('./components/product.html', '_blank'); // Open in new tab
        } else if (document.getElementById('services').checked) {
            window.open('./components/about.html', '_blank'); // Open in new tab
        } else if (document.getElementById('privacy').checked) {
            window.open('./components/privacy.html', '_blank'); // Open in new tab
        } else if (document.getElementById('about').checked) {
            window.open('./components/about.html', '_blank'); // Open in new tab
        }
    }

    // Initial call to set active label and navigation
    handleActiveState();
    handleNavigation();

    // Add event listener to each input to update active state and handle navigation
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            handleActiveState();
            handleNavigation();
        });
    });
});
