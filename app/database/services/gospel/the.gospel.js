/* Assuming the API endpoints are protected and only referenced securely
const path_of_api = "../app/database/api/youtube/youtube_key.json";
const list_youtube_channel = "../app/database/services/gospel/preacher.list.json";

// Variables to track video state
let currentVideoIndex = 0;
let videoFinished = true;
let videoTimeout = 600000; // 10 minutes in milliseconds
let reflectionFileCounter = 1;
let gospelWindowInterval;

// DOM Elements
const videoElement = document.getElementById('the-message');
const closeButton = document.getElementById('close-toggle');
const reflectionTextarea = document.getElementById('reflection-textarea');
const sendReflectionButton = document.getElementById('send-reflection-button');
const gospelContainer = document.querySelector('.share-the-good-news'); // Container element for gospel content

// Ensure gospel container is visible when page is loaded or refreshed
document.addEventListener('DOMContentLoaded', function() {
    // Ensure gospel container is displayed when the page loads or refreshes
    showGospelContainer();

    // Fetch the list of channels and videos from the server
    fetchVideoList().then(() => {
        pickRandomVideo(); // Load the first random video when the page loads
    });

    // Handle the close button click
    closeButton.addEventListener('click', () => {
        if (!videoFinished) {
            videoTimeout = 300000; // 5 minutes pause if the video is interrupted before finishing
            setTimeout(pickRandomVideo, videoTimeout);
        } else {
            setTimeout(pickRandomVideo, videoTimeout); // Regular 10 minutes pause if video finished
        }
        // Hide the video player window and store that the window was closed
        gospelContainer.style.display = 'none';
        localStorage.setItem('gospelWindowClosed', 'true'); // Store the fact that the window was closed
        clearInterval(gospelWindowInterval); // Stop toggling visibility if closed manually
    });

    // Handle reflection submission
    sendReflectionButton.addEventListener('click', () => {
        const reflectionText = reflectionTextarea.value;
        if (reflectionText.trim() === "") return; // Don't submit if there's no reflection

        // Save reflection to file (this would require server-side logic to handle)
        saveReflection(reflectionText);
        reflectionTextarea.value = ''; // Clear the textarea after submission
    });
});

// Show the gospel container if it's the first visit or a refresh
function showGospelContainer() {
    if (!localStorage.getItem('gospelWindowClosed')) {
        // Show the container if it hasn't been closed before (first visit or refresh)
        gospelContainer.style.display = 'flex';

        // Cycle between 'none' and 'flex' every 10 seconds if the video is playing
        gospelWindowInterval = setInterval(() => {
            if (!videoFinished) {
                gospelContainer.style.display = (gospelContainer.style.display === 'none') ? 'flex' : 'none';
            }
        }, 10000); // Toggle every 10 seconds if the video is still playing
    } else {
        gospelContainer.style.display = 'none'; // If the window was closed, keep it hidden
    }
}

// Fetch the list of YouTube channels and videos from the server
async function fetchVideoList() {
    try {
        const response = await fetch(list_youtube_channel);
        const data = await response.json();
        return data.Pastors_List;
    } catch (error) {
        console.error("Error fetching video list:", error);
    }
}

// Randomly pick a video from the list
async function pickRandomVideo() {
    const channels = await fetchVideoList();
    const channelNames = Object.keys(channels);
    const randomChannel = channelNames[Math.floor(Math.random() * channelNames.length)];
    const channelURL = channels[randomChannel];

    // Here, fetch the videos from the selected channel (this should be handled via an API on your backend)
    const videos = await fetchVideosFromChannel(channelURL);

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    loadVideo(randomVideo);
}

// Fetch videos from a YouTube channel (assumes an API endpoint on the backend)
async function fetchVideosFromChannel(channelURL) {
    try {
        const response = await fetch(path_of_api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ channelURL })
        });

        const videoData = await response.json();
        return videoData.videos; // Return an array of video URLs, titles, descriptions, etc.
    } catch (error) {
        console.error("Error fetching videos from channel:", error);
    }
}

// Load the video into the player
function loadVideo(video) {
    videoElement.src = video.url; // Assume video object has url, title, and description
    document.querySelector('.title-of-the-gospel').innerText = video.title;
    document.querySelector('.description-of-the-message').innerText = video.description;
    videoFinished = false;

    // Listen for video end event
    videoElement.onended = handleVideoEnd;
}

// Handle video end
function handleVideoEnd() {
    videoFinished = true;
    clearInterval(gospelWindowInterval); // Stop toggling visibility after the video finishes
    setTimeout(pickRandomVideo, videoTimeout); // Wait for 10 minutes before playing another video
}

// Save reflection text as a .txt file on the server
async function saveReflection(reflectionText) {
    const reflectionData = {
        filename: `reflect_${reflectionFileCounter}.txt`,
        content: reflectionText
    };

    try {
        const response = await fetch('../app/database/services/gospel/reflection/save_reflection.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reflectionData)
        });

        if (response.ok) {
            reflectionFileCounter++; // Increment the counter for next reflection
            alert('Reflection saved successfully.');
        } else {
            alert('Failed to save reflection.');
        }
    } catch (error) {
        console.error("Error saving reflection:", error);
    }
}

// Initial video pick when the page loads
window.onload = () => {
    pickRandomVideo();
};
*/


// Combined data from the JSON file (Pastors List and API Key)
const data = {
    "Pastors_List": {
        "Tetelestai": "UCOlwfh5t72pgFX2V_Q7riYA",  /*TetelestaiKingReyes, KhaelMinistry, givemeananswer, billygraham, NickVMinistries, vladhungrygen*/
        "Khael_Ministrhy": "UCjV2Z_RwC-GvkLrNxXf6MYQ",
        "Cliffe_Knechtle": "UCKr-liguaGWMf3f94eQXsug",
        "Billy_Graham": "UC29BKw2DaNMQe2B90QRVCNw",
        "Nick_Vujicic": "UCm71Z36uSgQtoNmnYjelvNA",
        "Vladimir_Savchuk": "UC1DuOQg0-nr99t17Ca8Hlag"
    },
    "YouTube": "AIzaSyBGuZsZyra_svzooWjwUl1oN2_M-dBaroU"
};

// Variables to track video state
let currentVideoIndex = 0;
let videoFinished = true;
let videoTimeout = 600000; // 10 minutes in milliseconds
let reflectionFileCounter = 1;
let gospelWindowInterval;

// DOM Elements
const videoElement = document.getElementById('the-message');
const closeButton = document.getElementById('close-toggle');
const reflectionTextarea = document.getElementById('reflection-textarea');
const sendReflectionButton = document.getElementById('send-reflection-button');
const gospelContainer = document.querySelector('.share-the-good-news'); // Container element for gospel content

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    showGospelContainer();
    fetchVideoList().then(() => pickRandomVideo()); // Load first random video
    setUpEventListeners();
});

// Set up event listeners for close button and reflection submission
function setUpEventListeners() {
    if (closeButton) {
        closeButton.addEventListener('click', handleCloseButton);
    }
    if (sendReflectionButton) {
        sendReflectionButton.addEventListener('click', handleReflectionSubmission);
    }
}

// Show gospel container if it's the first visit or a refresh
function showGospelContainer() {
    if (!localStorage.getItem('gospelWindowClosed')) {
        gospelContainer.style.display = 'flex';
        gospelWindowInterval = setInterval(toggleGospelContainer, 10000); // Toggle every 10 seconds if video is playing
    } else {
        gospelContainer.style.display = 'none';
    }
}

// Toggle visibility of gospel container
function toggleGospelContainer() {
    if (!videoFinished) {
        gospelContainer.style.display = (gospelContainer.style.display === 'none') ? 'flex' : 'none';
    }
}

// Handle close button click
function handleCloseButton() {
    videoTimeout = videoFinished ? 600000 : 300000; // Set timeout based on whether the video finished
    setTimeout(pickRandomVideo, videoTimeout); // Wait before picking a new video

    gospelContainer.style.display = 'none';
    localStorage.setItem('gospelWindowClosed', 'true');
    clearInterval(gospelWindowInterval); // Stop toggling visibility after close
}

// Handle reflection submission
function handleReflectionSubmission() {
    const reflectionText = reflectionTextarea.value.trim();
    if (reflectionText) {
        saveReflection(reflectionText);
        reflectionTextarea.value = ''; // Clear textarea after submission
    }
}

// Fetch the list of YouTube channels and videos from the data object
async function fetchVideoList() {
    try {
        if (!data.Pastors_List) {
            throw new Error("Pastors list is not available in data");
        }
        return data.Pastors_List;
    } catch (error) {
        console.error("Error fetching video list:", error);
    }
}

// Randomly pick a video from the list
async function pickRandomVideo() {
    const pastors = await fetchVideoList();
    const channelNames = Object.keys(pastors);
    const randomChannel = channelNames[Math.floor(Math.random() * channelNames.length)];
    const channelId = pastors[randomChannel]; // Now, this is the correct YouTube Channel ID

    // Fetch videos from the selected channel
    const videos = await fetchVideosFromChannel(channelId);

    if (!videos || videos.length === 0) {
        console.error("No videos found for the channel:", channelId);
        return;
    }

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    loadVideo(randomVideo);
}

// Fetch videos from a YouTube channel using the YouTube API
async function fetchVideosFromChannel(channelId) {
    try {
        const youtubeAPIKey = data.YouTube;

        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&key=${youtubeAPIKey}`);
        const videoData = await response.json();

        if (response.ok) {
            return videoData.items || []; // Return an array of video data
        } else {
            console.error("API Error:", videoData.error.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching videos from channel:", error);
        return []; // Return empty array on error
    }
}

// Load the selected video into the player
function loadVideo(video) {
    if (!video || !video.snippet || !video.id || !video.id.videoId) return; // Ensure video has necessary data

    // Construct the YouTube video URL
    const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`; // Correct video URL for embedding
    videoElement.src = videoUrl; // Set the video element's source to the video URL

    // Update the gospel message title and description
    document.querySelector('.title-of-the-gospel').innerText = video.snippet.title;
    document.querySelector('.description-of-the-message').innerText = video.snippet.description;

    // Mark video as not finished
    videoFinished = false;

    // Handle video end
    videoElement.onended = handleVideoEnd;
}

// Handle video end
function handleVideoEnd() {
    videoFinished = true;
    clearInterval(gospelWindowInterval);
    setTimeout(pickRandomVideo, videoTimeout);
}

// Save reflection text as a .txt file on the server
async function saveReflection(reflectionText) {
    const reflectionData = {
        filename: `reflect_${reflectionFileCounter}.txt`,
        content: reflectionText
    };

    try {
        const response = await fetch('../app/database/services/gospel/reflection/save_reflection.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reflectionData)
        });

        if (response.ok) {
            reflectionFileCounter++; // Increment the counter for next reflection
            alert('Reflection saved successfully.');
        } else {
            alert('Failed to save reflection.');
        }
    } catch (error) {
        console.error("Error saving reflection:", error);
    }
}

// Initial video pick when the page loads
window.onload = () => {
    pickRandomVideo();
};



