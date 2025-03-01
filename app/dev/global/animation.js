// Get the image element
const img = document.getElementById("blackblazent-brand");

// Detect mouse hover
img.addEventListener('mouseenter', () => {
    img.style.animationPlayState = 'paused';  // Pause the animation when hovered
});

// Detect mouse out
img.addEventListener('mouseleave', () => {
    img.style.animationPlayState = 'running';  // Resume the animation when the mouse leaves
});
