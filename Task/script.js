const apiKey = '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'; 

document.getElementById("send-btn").addEventListener("click", function () {
    const message = document.getElementById("message-input").value;
    if (message) {
        displayMessage("You", message);
        sendMessageToAPI(message);
        document.getElementById("message-input").value = "";
    }
});


function displayMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; 
}

// Function to send message to the Groq API and display the response
function sendMessageToAPI(message) {
    const data = {
        messages: [
            {
                role: "user",
                content: message
            }
        ],
        model: "llama3-8b-8192"  // This is the model as specified in your curl command
    };

    // API call using fetch
    fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Convert the data object into a JSON string
    })
    .then(response => response.json())
    .then(result => {
        // Display the bot's response
        const botMessage = result.choices[0].message.content;
        displayMessage("Bot", botMessage);
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage("Bot", "An error occurred. Please try again.");
    });
}
