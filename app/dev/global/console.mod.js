document.addEventListener('DOMContentLoaded', function() {
    // Declare variables to avoid redeclaration errors
    const consoleButton = document.getElementById('console-assistant');
    const terminal = document.getElementById('terminal');
    const minimizeButton = document.getElementById('minimize-btn');
    const maximizeButton = document.getElementById('maximize-btn');
    const closeButton = document.getElementById('close-btn');
    const terminalHeader = document.getElementById('terminal-header');

    // Toggle visibility of terminal dialog
    consoleButton.addEventListener('click', () => {
        terminal.style.display = 'block';
    });

    // Close terminal dialog
    closeButton.addEventListener('click', () => {
        terminal.style.display = 'none';
    });

    // Minimize terminal dialog
    minimizeButton.addEventListener('click', () => {
        terminal.classList.toggle('minimized');
    });

    // Maximize terminal dialog
    maximizeButton.addEventListener('click', () => {
        if (terminal.classList.contains('minimized')) {
            terminal.classList.remove('minimized');
        }

        if (terminal.style.width === '400px') {
            terminal.style.width = '100vw';
            terminal.style.height = '100vh';
            terminal.style.bottom = '0';
            terminal.style.right = '0';
        } else {
            terminal.style.width = '400px';
            terminal.style.height = '200px';
            terminal.style.bottom = '20px';
            terminal.style.right = '20px';
        }
    });

    // Draggable functionality
    let isDragging = false;
    let offsetX, offsetY;

    terminalHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - terminal.offsetLeft;
        offsetY = e.clientY - terminal.offsetTop;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    });

    function drag(e) {
        if (isDragging) {
            terminal.style.left = `${e.clientX - offsetX}px`;
            terminal.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }

    // Resizable functionality
    let isResizing = false;
    let resizeDirection;
    let startWidth, startHeight, startX, startY;

    function startResize(e, direction) {
        isResizing = true;
        resizeDirection = direction;
        startWidth = terminal.offsetWidth;
        startHeight = terminal.offsetHeight;
        startX = e.clientX;
        startY = e.clientY;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    }

    function resize(e) {
        if (isResizing) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            if (resizeDirection === 'right') {
                terminal.style.width = `${startWidth + dx}px`;
            } else if (resizeDirection === 'left') {
                terminal.style.width = `${startWidth - dx}px`;
                terminal.style.left = `${terminal.offsetLeft + dx}px`;
            } else if (resizeDirection === 'top') {
                terminal.style.height = `${startHeight - dy}px`;
                terminal.style.top = `${terminal.offsetTop + dy}px`;
            } else if (resizeDirection === 'bottom') {
                terminal.style.height = `${startHeight + dy}px`;
            } else if (resizeDirection === 'tr') {
                terminal.style.width = `${startWidth + dx}px`;
                terminal.style.height = `${startHeight - dy}px`;
                terminal.style.top = `${terminal.offsetTop + dy}px`;
            } else if (resizeDirection === 'bl') {
                terminal.style.width = `${startWidth - dx}px`;
                terminal.style.height = `${startHeight + dy}px`;
                terminal.style.left = `${terminal.offsetLeft + dx}px`;
            }
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }

    // Attach resize events to the resize handles
    document.querySelector('.resize-handle.right').addEventListener('mousedown', (e) => startResize(e, 'right'));
    document.querySelector('.resize-handle.left').addEventListener('mousedown', (e) => startResize(e, 'left'));
    document.querySelector('.resize-handle.top').addEventListener('mousedown', (e) => startResize(e, 'top'));
    document.querySelector('.resize-handle.bottom').addEventListener('mousedown', (e) => startResize(e, 'bottom'));
    document.querySelector('.resize-handle.tr').addEventListener('mousedown', (e) => startResize(e, 'tr'));
    document.querySelector('.resize-handle.bl').addEventListener('mousedown', (e) => startResize(e, 'bl'));

    // Optional: Handle typing in the terminal
    const terminalContent = document.getElementById('terminal-content');
    let commandInput = "";

    // Function to create a new prompt and input box
    function createNewPrompt(command) {
        // Create the prompt container
        const promptDiv = document.createElement('div');
        promptDiv.classList.add('console-agent-prompt');

        // Add the enumerator for the prompt and the editable space for the command
        const enumerator = document.createElement('div');
        enumerator.classList.add('enumarator');
        enumerator.textContent = `$BlackBlazent:`;

        const commandSpace = document.createElement('div');
        commandSpace.classList.add('command-text-space');
        commandSpace.textContent = command;

        // Append the elements to the prompt container
        promptDiv.appendChild(enumerator);
        promptDiv.appendChild(commandSpace);

        // Append the prompt container to terminal content
        terminalContent.appendChild(promptDiv);
    }

    // Listen for key presses to mimic a terminal input
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // Create a new prompt with the current command
            createNewPrompt(commandInput);

            // Clear the current input for the next command
            commandInput = "";
        } else if (e.key === 'Backspace') {
            commandInput = commandInput.slice(0, -1);
        } else {
            commandInput += e.key;
        }
    });
});
