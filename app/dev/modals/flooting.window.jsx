document.addEventListener('DOMContentLoaded', function() {
    const flooter = document.getElementById('assistant_flooter');
    const icon = document.getElementById('flooting-icon');
    const toolist = document.querySelector('.flooting-toolist');
    const boxes = document.querySelectorAll('.box');
    
    let originalPosition = { top: flooter.offsetTop, left: flooter.offsetLeft };
    let timer = null;
    let isDragging = false;
    let mouseOffsetX, mouseOffsetY;

    // Show the flooting tool list at the center of the screen
    function showToolList() {
        toolist.style.display = 'flex'; // Show the tool list
        toolist.style.opacity = '1'; // Make sure it's visible
        arrangeBoxesInCircle();
    }

    // Hide the flooting tool list
    function hideToolList() {
        toolist.style.display = 'none'; // Hide the tool list
        toolist.style.opacity = '0'; // Make it invisible
    }

    // Function to arrange the boxes in a circular pattern
    function arrangeBoxesInCircle() {
        const radius = 150; // Radius of the circle
        const angleStep = 360 / boxes.length; // Angle step between boxes

        boxes.forEach((box, index) => {
            const angle = angleStep * index;
            const x = Math.cos((angle * Math.PI) / 180) * radius + 200; // 200 is center of the circle
            const y = Math.sin((angle * Math.PI) / 180) * radius + 200; // 200 is center of the circle
            box.style.left = `${x - 40}px`; // Adjusting for box size
            box.style.top = `${y - 40}px`; // Adjusting for box size
            box.style.animationDelay = `${index * 0.5}s`; // Delay the appearance for each box
        });
    }

    // Function to make the div draggable
    function makeDraggable(element) {
        element.addEventListener('mousedown', function(e) {
            // Only allow dragging when left mouse button is clicked
            if (e.button !== 0) return; // Ignore right-click or other mouse buttons

            isDragging = true;
            mouseOffsetX = e.clientX - element.getBoundingClientRect().left;
            mouseOffsetY = e.clientY - element.getBoundingClientRect().top;

            // Add event listeners to track the mouse move and mouse up
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    // Mouse move event handler
    function onMouseMove(e) {
        if (isDragging) {
            // Move the element with the mouse
            flooter.style.position = 'absolute';
            flooter.style.left = `${e.clientX - mouseOffsetX}px`;
            flooter.style.top = `${e.clientY - mouseOffsetY}px`;
        }
    }

    // Mouse up event handler
    function onMouseUp() {
        if (isDragging) {
            isDragging = false;

            // Reset the inactivity timer when dragging stops
            resetReturnTimer();

            // Remove mousemove and mouseup event listeners after drag ends
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    // Function to reset the inactivity timer
    function resetReturnTimer() {
        // Clear any existing timer
        clearTimeout(timer);

        // Set a new timer to return the floater after 10 seconds of inactivity
        timer = setTimeout(() => {
            returnToOriginalPosition();
        }, 10000); // 10 seconds of inactivity
    }

    // Function to return the floater to its original position
    function returnToOriginalPosition() {
        flooter.style.transition = 'left 0.5s ease, top 0.5s ease';
        flooter.style.left = `${originalPosition.left}px`;
        flooter.style.top = `${originalPosition.top}px`;

        // Reset opacity after return
        flooter.style.opacity = '0.3';
    }

    // Show the tool list when clicking the floating window icon
    icon.addEventListener('click', function() {
        showToolList();
    });

    // Close the tool list when clicking outside of the tool list
    document.addEventListener('click', function(e) {
        if (!toolist.contains(e.target) && e.target !== icon) {
            hideToolList();
        }
    });

    // Make the element draggable (without removing the draggable functionality)
    makeDraggable(flooter);

    // Hover effect to change opacity
    flooter.addEventListener('mouseenter', function() {
        flooter.style.opacity = '1'; // Show full opacity when hovered
    });

    flooter.addEventListener('mouseleave', function() {
        flooter.style.opacity = '0.3'; // Return to initial opacity when mouse leaves
    });

    // Initial opacity
    flooter.style.opacity = '0.3'; // Slightly transparent when idle
});
