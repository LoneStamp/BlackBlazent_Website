document.addEventListener('DOMContentLoaded', function() {
    // Map of tab IDs to content IDs
    const tabContentMap = {
        'for-ppt': 'powerpoints',
        'for-apps': 'apps',
        'for-web': 'websites',
        'for-photo': 'photos',
        'for-ebook': 'ebooks',
        'for-music': 'musics'
    };

    // Get all the tab elements
    const tabs = document.querySelectorAll('.sidenav-tabs');

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
        tab.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            // Hide all content sections
            hideAllContents();

            // Show the corresponding content section based on the tab's ID
            const contentId = tabContentMap[tab.id];
            if (contentId) {
                showContent(contentId);
            }
        });
    });

    // Optionally, show the default content on page load
    hideAllContents();
    showContent('powerpoints'); // Show the Powerpoints content by default
});