// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));  // Expiration in days
    const expiresString = "expires=" + expires.toUTCString();
    document.cookie = `${name}=${value}; ${expiresString}; path=/`;  // Cookie valid across the entire site
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);  // Return the cookie value
        }
    }
    return null;
}

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";  // Set to past date to expire it
}

// Function to accept all cookies (set cookies and hide the banner)
function acceptCookies() {
    setCookie("cookiesAccepted", "true", 30);  // Set a cookie to remember that user accepted cookies
    document.getElementById('cookieConsentBanner').style.display = 'none';  // Hide the cookie banner
    setCookie("userName", "John Doe", 7); // Example of setting a userName cookie (you can change this)
}

// Function to accept partial cookies (accept only necessary cookies, e.g., tracking)
function acceptPartialCookies() {
    setCookie("cookiesAccepted", "partial", 30);  // Set a partial consent cookie
    document.getElementById('cookieConsentBanner').style.display = 'none';  // Hide the cookie banner
    // You can store some cookies for necessary functionality, like analytics, etc.
}

// Show cookie consent banner if the user hasn't accepted cookies yet
if (!getCookie("cookiesAccepted")) {
    document.getElementById('cookieConsentBanner').style.display = 'block';
}

// Check if we already have a user name cookie and display it
const userName = getCookie("userName");
if (userName) {
    document.getElementById("userName").innerText = "User: " + userName;  // Display stored user name
}

// You can also set a user name cookie for testing
// Uncomment this line to set a user name cookie for 7 days
// setCookie("userName", "John Doe", 7);