const banner = document.querySelector('.blackblazent-container');

// Array of image filenames (you'll need to know these or have a way to generate them)
const images = [
  'bg_1.jpg',
  'bg_2.jpg',
  'bg_3.avif',
  'bg_4.jpg',
  'bg_5.webp',
  'bg_6.webp',
  'bg_7.jpg',
  'bg_8.jpg',
  'bg_9.jpg',
  'bg_10.jpg'
  // Add more images if needed
];

function getRandomImage() {
  // Get a random index from the images array
  const randomIndex = Math.floor(Math.random() * images.length);
  // Return the image path with the directory prepended
  return `../app/assets/images/backgrounds/${images[randomIndex]}`;
}

let currentIndex = 0;

function changeBackgroundImage() {
  // Fade out the current background
  banner.classList.add('fade');

  // Wait for the fade effect to complete (1 second in this case)
  setTimeout(() => {
    // Switch to a random image
    banner.style.backgroundImage = `url(${getRandomImage()})`;

    // Fade in the new background
    banner.classList.remove('fade');
  }, 1000); // Fade duration (1 second)
}

// Initial background set
banner.style.backgroundImage = `url(${getRandomImage()})`;

// Change background every 10 seconds
setInterval(changeBackgroundImage, 10000);
