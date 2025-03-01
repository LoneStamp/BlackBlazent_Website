document.addEventListener('DOMContentLoaded', function() {
  const banner = document.querySelector('.blackblazent-container');
  if (!banner) {
    console.error('Element .blackblazent-container not found!');
    return;
  }

  // Array of image filenames (you'll need to know these or have a way to generate them)
  const images = [
    'bg_1.jpg', 'bg_2.jpg', 'bg_3.avif', 'bg_4.jpg', 'bg_5.webp', 'bg_6.webp', 'bg_7.webp', 'bg_8.jpg',
    'bg_9.webp', 'bg_10.jpg', 'bg_11.webp', 'bg_12.jpg', 'bg_13.jpg', 'bg_14.jpg', 'bg_15.jpg', 'bg_16.jpg',
    'bg_17.jpg', 'bg_18.jpg', 'bg_19.jpg', 'bg_20.jpg', 'bg_21.jpg', 'bg_22.jpg', 'bg_23.jpg', 'bg_24.webp',
    'bg_25.webp', 'bg_26.webp', 'bg_27.jpg', 'bg_28.webp', 'bg_29.jpg', 'bg_30.jpg'
  ];

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return `../app/assets/images/backgrounds/${images[randomIndex]}`;
  }

  let currentIndex = 0;

  function changeBackgroundImage() {
    banner.classList.add('fade');
    setTimeout(() => {
      banner.style.backgroundImage = `url(${getRandomImage()})`;
      banner.classList.remove('fade');
    }, 1000);
  }

  // Initial background set
  banner.style.backgroundImage = `url(${getRandomImage()})`;

  // Change background every 10 seconds
  setInterval(changeBackgroundImage, 10000);
});
