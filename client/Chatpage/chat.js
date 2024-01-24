
const sendMessageBtn = document.getElementById('send-message-btn');
const messageInput = document.getElementById('message-text');
const msgContainer = document.getElementById('user-message');
const token = localStorage.getItem('token');
let messagesArray;

sendMessageBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const text = messageInput.value;
    

    try {
        const sentMessage = await axios.post('http://localhost:3000/users/message', {
            text: text,
        }, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        }
        );
        const message = sentMessage.data.message;
       
    }
    catch (err) {
        console.log(err);
        alert("some error ");
    }

    messageInput.value = "";

});
document.addEventListener("DOMContentLoaded", async (e) => {
    // Assuming you have the token stored in localStorage
    const token = localStorage.getItem('token');
    

    // Use setInterval, not setTimeInterval
    setInterval(async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/messages', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });

            messagesArray = response.data.messages;
            console.log(response.data.messages,"messages");
            
        } catch (error) {
            console.error(error);
        }
    }, 0);

    console.log(messagesArray);

    messagesArray.messagesArray.forEach(message => {
        console.log(message);
        addMessageToUi(message.Text);
    });
    
});


const addMessageToUi = (message) => {

    const messageContainer = document.createElement('div');
    messageContainer.classList.add("message-container");

    const userDiv = document.createElement('div');
    userDiv.classList.add("user-one");

    const messageParagraph = document.createElement('p');
    messageParagraph.classList.add("user-message");
    messageParagraph.textContent = message;

    userDiv.appendChild(messageParagraph);

    // Append user div to message container
    messageContainer.appendChild(userDiv);

    // Append message container to the body or any other parent element
    document.body.appendChild(messageContainer);
}