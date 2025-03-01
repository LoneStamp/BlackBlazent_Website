document.addEventListener('DOMContentLoaded', function () {
    // Map of tab text to content IDs
    const tabContentMap = {
        'Company Overview': 'about-container',
        'Our History': 'our-history-container',
        'Mission & Vision': 'mission-vison-container',
        'Leadership': 'leadership-container',
        'Careers': 'career-container',
        'Contact Us': 'contacts-container'
    };

    // Get all the tab elements
    const tabs = document.querySelectorAll('.about-nav-tabs li');

    // Function to hide all content sections
    function hideAllContents() {
        Object.values(tabContentMap).forEach(contentId => {
            const content = document.getElementById(contentId);
            if (content) {
                content.style.display = 'none';
            }
        });
    }

    // Function to show a specific content section
    function showContent(contentId) {
        const content = document.getElementById(contentId);
        if (content) {
            content.style.display = 'block';
        }
    }

    // Add click event listeners to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior

            // Hide all content sections
            hideAllContents();

            // Get the text content of the clicked tab
            const tabText = tab.textContent.trim();

            // Show the corresponding content section based on the tab's text
            const contentId = tabContentMap[tabText];
            if (contentId) {
                showContent(contentId);
            }
        });
    });

    // Optionally, show the default content on page load
    hideAllContents();
    showContent('about-container'); // Show the "Company Overview" content by default
});