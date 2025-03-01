document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const chatbotButton = document.getElementById('chatbot-assistant');
    const chatbotPopup = document.getElementById('chatbot-popup');
    const closeButton = document.querySelector('.close-btn');
    const minimizeButton = document.querySelector('.minimize-btn');
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input'); // Now targets the div
    const userText = userInput.querySelector('.user-prompted-text'); // The <p> inside the div
    const chatContent = document.getElementById('chat-content');
    let isPopupMinimized = false;

    if (!chatbotButton || !chatbotPopup || !closeButton || !minimizeButton || !sendButton || !userInput || !chatContent) {
        console.error("One or more elements not found in the DOM!");
        return;
    }

    // Array of predefined data (information about your website)
    const websiteData = [
        {
            question: "What is our mission?",
            answer: "Our mission is to provide the best services to our customers and ensure customer satisfaction."
        },
        {
            question: "What products do we offer?",
            answer: "We offer a variety of products ranging from software tools to consulting services."
        },
        {
            question: "How can I contact support?",
            answer: "You can contact our support team via email at support@example.com."
        },
        {
            question: "Where is our office located?",
            answer: "Our office is located at 123 Main St, Suite 400, City, Country."
        },
        // Add more questions and answers as needed
    ];

    // Open the chatbot popup
    chatbotButton.addEventListener('click', () => {
        chatbotPopup.style.display = 'block';
    });

    // Close the chatbot popup
    closeButton.addEventListener('click', () => {
        chatbotPopup.style.display = 'none';
    });

    // Minimize the chatbot popup
    minimizeButton.addEventListener('click', () => {
        if (isPopupMinimized) {
            chatbotPopup.style.height = '700px';
            chatbotPopup.querySelector('.chatbot-body').style.display = 'flex';
            isPopupMinimized = false;
        } else {
            chatbotPopup.style.height = '50px';
            chatbotPopup.querySelector('.chatbot-body').style.display = 'none';
            isPopupMinimized = true;
        }
    });

    // Handle sending messages
    sendButton.addEventListener('click', () => {
        const message = userText.innerText.trim(); // Get the text from the <p> element
        if (message) {
            addMessage('user', message);
            getChatbotReply(message);
            userText.innerText = ''; // Clear the input after sending
        }
    });

    // Add message to the chat window
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender);
        messageElement.innerText = message;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight; // Scroll to the bottom
    }

    // Get reply from the chatbot (via predefined data or fallback to OpenAI API)
    function getChatbotReply(userMessage) {
        // First, attempt to fetch the reply from the website data array
        const replyMessage = findReplyInData(userMessage);
        if (replyMessage) {
            addMessage('chatbot', replyMessage);
        } else {
            // If no reply found in the data array, fall back to OpenAI API
            getOpenAIResponse(userMessage);
        }
    }

    // Search for a matching response in the predefined website data
    function findReplyInData(userMessage) {
        const messageLower = userMessage.toLowerCase();
        for (const entry of websiteData) {
            if (entry.question.toLowerCase().includes(messageLower)) {
                return entry.answer;
            }
        }
        return null; // No match found
    }

    // Get reply from OpenAI if no match found in the website data
    function getOpenAIResponse(userMessage) {
        const apiUrl = 'https://api.openai.com/v1/completions'; // Ensure this is the correct API endpoint

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your_api_key' // Replace with your actual OpenAI API key
            },
            body: JSON.stringify({
                model: "text-davinci-003", // Or your model of choice
                prompt: userMessage,
                max_tokens: 150
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if 'choices' field exists and has content
            if (data && data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
                const replyMessage = data.choices[0].text.trim();
                addMessage('chatbot', replyMessage);
            } else {
                console.error('No valid choices in OpenAI API response:', data);
                addMessage('chatbot', "I'm sorry, I couldn't understand that. Can you ask something else?");
            }
        })
        .catch(error => {
            console.error('Error with OpenAI API:', error);
            addMessage('chatbot', "Oops! There was an error. Please try again later.");
        });
    }

    // Make the chatbot popup draggable
    chatbotPopup.addEventListener('mousedown', (e) => {
        let offsetX = e.clientX - chatbotPopup.offsetLeft;
        let offsetY = e.clientY - chatbotPopup.offsetTop;

        function mouseMoveHandler(e) {
            chatbotPopup.style.left = `${e.clientX - offsetX}px`;
            chatbotPopup.style.top = `${e.clientY - offsetY}px`;
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        });
    });
});
