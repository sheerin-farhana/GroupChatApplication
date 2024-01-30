const token = localStorage.getItem("token");
const groupId = localStorage.getItem("selectedGroupId");
const messageInput = document.getElementById("message-input");
const sendMessageBtn = document.getElementById("send-message-btn");

const messageListContainer = document.getElementById("message-list");
new SimpleBar(messageListContainer);

const socket = io(window.location.origin);

socket.on("group-message", (groupId) => {
  showGroupmessages(groupId);
});

sendMessageBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const text = messageInput.value;

  try {
    const sentMessage = await axios.post(
      `http://localhost:3000/users/groups/${groupId}/messages`,
      {
        text: text,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const message = sentMessage.data;
    socket.emit("new-group-message", groupId);
    addMemberMessageToUi(message.message, message.username);
  } catch (err) {
    console.log(err);
    alert("some error ");
  }

  messageInput.value = "";
});

document.addEventListener("DOMContentLoaded", async () => {
  var navbarToggler = document.querySelector(".navbar-toggler");
  var navbarCollapse = document.querySelector("#navbarSupportedContent");

  navbarToggler.addEventListener("click", function () {
    navbarCollapse.classList.toggle("show");
  });
  showGroupmessages(groupId);
});

async function showGroupmessages(groupid) {
  try {
    const groupUsers = await axios.get(
      `http://localhost:3000/users/groups/${groupId}/members`
    );

    const groupUsersArray = groupUsers.data.groupMembers;

    groupUsersArray.forEach((user) => {
      adduserstoUi(user.Name, user.Phone);
      console.log(user);
    });

    const groupMessages = await axios.get(
      `http://localhost:3000/users/groups/${groupId}/messages`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const groupMessagesArray = groupMessages.data.messages;

    groupMessagesArray.forEach((message) => {
      addMemberMessageToUi(message.Text, message.username);
    });
  } catch (err) {
    console.log(err);
  }
}

// function getLastSavedMessageId() {
//   const msgsFromLS = JSON.parse(localStorage.getItem("messages")) || [];
//   return msgsFromLS.length > 0 ? msgsFromLS[msgsFromLS.length - 1].id : 0;
// }

// async function fetchNewMessages(lastSavedMessageId) {
//   const response = await axios.get(
//     `http://localhost:3000/users/group/${groupId}/messages?lastmessageid=${lastSavedMessageId}`,
//     {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     }
//   );

//   return response.data.messages;
// }

// function mergeMessagesWithLocalStorage(newMessages) {
//   const msgsFromLS = JSON.parse(localStorage.getItem("messages")) || [];
//   const combinedMessages = [...msgsFromLS, ...newMessages];

//   // Save only the most recent 10 messages
//   if (combinedMessages.length > 800) {
//     combinedMessages = combinedMessages.slice(-10);
//   }

//   localStorage.setItem("messages", JSON.stringify(combinedMessages));
// }

// function displayMessagesFromLocalStorage() {
//   const msgsFromLS = JSON.parse(localStorage.getItem("messages")) || [];
//   if (msgsFromLS.length > 0) {
//     msgsFromLS.forEach((message) => {
//       console.log(message);
//       addMemberMessageToUi(message.Text, message.username);
//     });
//   } else {
//     console.log("No messages found in local storage");
//     alert("No messages");
//   }
// }

function addMemberMessageToUi(message, name) {
  // Assuming you have a reference to the ul element with id 'message-list'
  const messageList = document.getElementById("message-list");

  // Create a new li element
  const newListItem = document.createElement("li");
  newListItem.classList.add("d-flex", "justify-content-between", "mb-4");

  // Create the inner content structure
  newListItem.innerHTML = `
    
    <div class="card w-100">
        <div class="card-header d-flex justify-content-between p-3">
            <p class="fw-bold mb-0">${name}</p>
            
        </div>
        <div class="card-body">
            <p class="mb-0">
                ${message}
            </p>
        </div>
    </div>
`;

  // Append the new li element to the ul
  messageList.appendChild(newListItem);
}

function adduserstoUi(name, number) {
  // Assuming you have a reference to the ul element with id 'user-list'
  const userList = document.getElementById("user-list");

  // Create a new li element
  const newListItem = document.createElement("li");
  newListItem.classList.add("p-2", "border-bottom");
  newListItem.style.backgroundColor = "#eee";

  // Create the inner content structure
  newListItem.innerHTML = `
    <a href="#!" class="d-flex justify-content-between">
        <div class="d-flex flex-row">
            <img src="https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
                alt="avatar"
                class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                width="60">
            <div class="pt-1">
                <p class="fw-bold mb-0">${name}</p>
                <p>${number}</p>
            </div>
        </div>
        
    </a>
`;

  // Append the new li element to the ul
  userList.appendChild(newListItem);
}
