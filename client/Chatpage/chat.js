const sendMessageBtn = document.getElementById('send-message-btn');
const messageInput = document.getElementById('message-text');

sendMessageBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const text = messageInput.value;
    const token = localStorage.getItem('token');

    try {
        await axios.post('http://localhost:3000/users/message', {
        text: text,
        }, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        }
        );

    alert("Message sent");
    }
    catch (err) {
        console.log(err);
        alert("some error ");
    }  

})