document.addEventListener('DOMContentLoaded', function() {
    // Get the h1 element and the button
    const sloganElement = document.getElementById('blackblazent-slogan');
    const exploreButton = document.getElementById('explore_blackblazent');
    
    // Array of text phrases to type in animation
    const sloganTexts = ['BlackBlazent', 'Innovative Ideas', 'Creative Solutions', 'Future Technologies', 'Empowering You'];
    let currentIndex = 0;
    
    // Function to simulate typing effect
    function typeSlogan(text, callback) {
        let currentLetterIndex = 0;
        let typingIndicator = '|'; // Typing indicator
        
        // Start with an empty text and typing indicator
        sloganElement.textContent = '';

        function typeNextLetter() {
            if (currentLetterIndex < text.length) {
                // Add the current letter to the text
                sloganElement.textContent += text[currentLetterIndex];
                currentLetterIndex++;
                setTimeout(typeNextLetter, 150); // Adjust the typing speed here
            } else {
                // After typing the text, append the typing indicator
                sloganElement.textContent += ' ' + typingIndicator;
                // Trigger the callback when typing is complete
                if (callback) callback();
            }
        }

        typeNextLetter();
    }
    
    // Function to loop through the text array with 5-second intervals
    function loopTyping() {
        // Type the current phrase
        typeSlogan(sloganTexts[currentIndex], function() {
            // Wait for 5 seconds after typing the current phrase
            setTimeout(function() {
                // Remove the typing indicator and clear text for the next phrase
                sloganElement.textContent = '';
                currentIndex = (currentIndex + 1) % sloganTexts.length; // Loop back to the start after the last text
                loopTyping(); // Recursively call loopTyping to type the next text
            }, 5000); // Wait 5 seconds before starting the next animation
        });
    }
    
    // Start the typing animation on page load
    loopTyping();
});
