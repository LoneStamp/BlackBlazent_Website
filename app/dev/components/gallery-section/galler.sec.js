// JSON Data (directly embedded in the code)
const appData = [
    {
      "file": './description/BlackVideo.json',
      "$AppInformation": {
        "AppName": "BlackVideo",
        "AppDescription": "BlackVideo - Black : Versatile Integrated Demi Empowerment Optimum—Player. A video player with integration of wide variety of playback functionalities."
      }
    },
    {
      "file": './description/BlackMusic.json',
      "$AppInformation": {
        "AppName": "BlackMusic",
        "AppDescription": "BlackMusic: Black - Music Ultra Superior Integrated Catalog. A music player designed to deliver an unparalleled audio experience. BlackMusic integrates a vast catalog of music with superior playback capabilities."
      }
    },
    {
      "file": './description/BlackGallery.json',
      "$AppInformation": {
        "AppName": "BlackGallery",
        "AppDescription": "BlackGallery: Black Gallery Amalgameted Luminous Library Expo Recreation Yearnability. BlackGallery is a comprehensive and innovative gallery app. "
      }
    },
    {
      "file": './description/BlackMiscellen.json',
      "$AppInformation": {
        "AppName": "BlackMiscellen",
        "AppDescription": "An Integrated Miscellaneous tools."
      }
    }
  ];
  
  const appNameElement = document.getElementById('App-Name');
  const appDescriptionElement = document.getElementById('App-Description');
  const fetchAppUrlButton = document.getElementById('fetchAppUrl');
  const carouselIndicators = document.querySelectorAll('.circle');
  const carouselItems = document.querySelectorAll('.card');
  let currentIndex = 0;
  
  // Set default active state for the carousel
  function setActiveCarouselItem(index) {
    carouselItems.forEach((item, i) => {
      item.style.transform = `translateX(-${index * 100}%)`;
      carouselIndicators[i].classList.remove('active');
      if (i === index) {
        carouselIndicators[i].classList.add('active');
      }
    });
  }
  
  // Set carousel indicator border color for active state
  function setActiveIndicator(index) {
    carouselIndicators.forEach((indicator, i) => {
      indicator.style.border = i === index ? '4px solid #ff0707' : 'transparent';
    });
  }
  
  // Load App Data (from the static object)
  function loadAppData() {
    const data = appData[currentIndex];
    appNameElement.innerText = data.$AppInformation.AppName;
    appDescriptionElement.innerText = data.$AppInformation.AppDescription;
  }
  
  // Set the URL based on the app
  function setAppUrl() {
    const urls = [
      "https://www.blackblazent.com/blackapps-01/downloads/get=1!",
      "https://www.blackblazent.com/blackapps-02/downloads/get=2!",
      "https://www.blackblazent.com/blackapps-03/downloads/get=3!",
      "https://www.blackblazent.com/blackapps-04/downloads/get=4!"
    ];
    window.open(urls[currentIndex], '_blank');
  }
  
  // Carousel Auto Sliding Functionality
  function autoSlideCarousel() {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      setActiveCarouselItem(currentIndex);
      setActiveIndicator(currentIndex);
    }, 10000); // Slide every 10 seconds per item
  }
  
  // Control Buttons (Next and Previous)
  document.getElementById('nextButton').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    setActiveCarouselItem(currentIndex);
    setActiveIndicator(currentIndex);
  });
  
  document.getElementById('prevButton').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    setActiveCarouselItem(currentIndex);
    setActiveIndicator(currentIndex);
  });
  
  // Start the carousel when the page loads
  window.onload = () => {
    setActiveCarouselItem(currentIndex);
    setActiveIndicator(currentIndex);
    loadAppData();
    autoSlideCarousel();
    fetchAppUrlButton.addEventListener('click', setAppUrl);
  };
  