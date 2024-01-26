const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the "Create Group" button
  document
    .getElementById("createGroupBtn")
    .addEventListener("click", function () {
      // Show the modal
      var myModal = new bootstrap.Modal(
        document.getElementById("createGroupModal"),
        {
          keyboard: false,
        }
      );
      myModal.show();
    });
});

// const messageInput = document.getElementById("message-input");
// const sendMessageBtn = document.getElementById("send-message-btn");
const createGroupBtn = document.getElementById("create-grp-btn");

createGroupBtn.addEventListener("click", async () => {
  try {
    const groupName = document.getElementById("groupName").value;

    // Collect the selected users
    const selectedUsers = Array.from(
      document.querySelectorAll(".form-check-input:checked")
    ).map((checkbox) => checkbox.value);

    // Send a POST request to create a new group
    const response = await axios.post(
      "http://localhost:3000/users/groups",
      {
        name: groupName,
        users: selectedUsers,
      },
      {
        headers: {
          Authorization: "Bearer " + token, // Assuming you have a token for authorization
        },
      }
    );

    // Assuming the response contains the newly created group data
    const newGroup = response.data.group;

    // Add the new group to the UI
    addGroupToUi(newGroup.name, newGroup.id);

    // Close the modal if needed
    var myModal = new bootstrap.Modal(
      document.getElementById("createGroupModal"),
      {
        keyboard: false,
      }
    );
    myModal.hide();
  } catch (error) {
    console.error(error);
    alert("Error creating the group");
  }
});

// sendMessageBtn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const text = messageInput.value;

//   try {
//     const sentMessage = await axios.post(
//       "http://localhost:3000/users/message",
//       {
//         text: text,
//       },
//       {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }
//     );
//     const message = sentMessage.data.message;
//   } catch (err) {
//     console.log(err);
//     alert("some error ");
//   }

//   messageInput.value = "";
// });

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const users = await axios.get("http://localhost:3000/users");
    const usersArray = users.data.users;

    usersArray.forEach((user) => {
      // adduserstoUi(user.Name, user.Phone);
      adduserstogroupmodal(user);
      console.log(user);
    });

    const userId = localStorage.getItem("userid");

    const groups = await axios.get("http://localhost:3000/users/groups", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    groups.data.userGroups.forEach((group) => {
      addGroupToUi(group.name, group.id);
    });

    // const currentUserId = localStorage.getItem("userid");
    // console.log("CURRENT USER ID", currentUserId);

    // const lastSavedMessageId = getLastSavedMessageId();

    // // Fetch new messages based on the last saved message ID
    // const newMessages = await fetchNewMessages(lastSavedMessageId);

    // // Merge new messages with existing messages in local storage
    // mergeMessagesWithLocalStorage(newMessages);

    // // Display messages on the frontend
    // displayMessagesFromLocalStorage();
  } catch (error) {
    console.error(error);
  }
});

// Function to add groups to UI
function addGroupToUi(name, groupId) {
  // Assuming you have a reference to the ul element with id 'group-list'
  const groupList = document.getElementById("group-list");

  // Create a new li element
  const newListItem = document.createElement("li");
  newListItem.classList.add("p-2", "border-bottom");
  newListItem.style.backgroundColor = "#eee";
  newListItem.dataset.groupId = groupId; // Store groupId in dataset

  // Create the inner content structure
  newListItem.innerHTML = `
    <a href="#!" class="d-flex justify-content-between">
        <div class="d-flex flex-row">
            <div class="pt-1">
                <p class="fw-bold mb-0">${name}</p>
            </div>
        </div>
    </a>
  `;
  // Add an event listener to the list item
  newListItem.addEventListener("click", function () {
    // Retrieve the groupId from the dataset
    const groupId = this.dataset.groupId;

    // Store the groupId in localStorage
    localStorage.setItem("selectedGroupId", groupId);

    // Redirect the user to the Group Details Page
    window.location.href = "../Chatpage/chat.html"; // Replace with your actual page URL
  });

  // Append the new li element to the ul
  groupList.appendChild(newListItem);
}

function adduserstogroupmodal(user) {
  const inviteUsersList = document.getElementById("invite-users-list");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = user.id; // Assuming user has an 'id' property
  checkbox.id = "user" + user.id; // Assuming user.id is a unique identifier
  checkbox.classList.add("form-check-input");

  // Create a label element for the checkbox
  const label = document.createElement("label");
  label.classList.add("form-check-label");
  label.htmlFor = "user" + user.id;
  label.textContent = user.Name; // Assuming user has a 'name' property

  // Create a div to hold the checkbox and label
  const checkboxDiv = document.createElement("div");
  checkboxDiv.classList.add("form-check");

  // Append the checkbox and label to the div
  checkboxDiv.appendChild(checkbox);
  checkboxDiv.appendChild(label);

  // Append the div to the inviteUsersList
  inviteUsersList.appendChild(checkboxDiv);
}

// function getLastSavedMessageId() {
//   const msgsFromLS = JSON.parse(localStorage.getItem("messages")) || [];
//   return msgsFromLS.length > 0 ? msgsFromLS[msgsFromLS.length - 1].id : 0;
// }

// async function fetchNewMessages(lastSavedMessageId) {
//   const response = await axios.get(
//     `http://localhost:3000/users/messages?lastmessageid=${lastSavedMessageId}`,
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

// function addMemberMessageToUi(message, name) {
//   // Assuming you have a reference to the ul element with id 'message-list'
//   const messageList = document.getElementById("message-list");

//   // Create a new li element
//   const newListItem = document.createElement("li");
//   newListItem.classList.add("d-flex", "justify-content-between", "mb-4");

//   // Create the inner content structure
//   newListItem.innerHTML = `

//     <div class="card w-100">
//         <div class="card-header d-flex justify-content-between p-3">
//             <p class="fw-bold mb-0">${name}</p>

//         </div>
//         <div class="card-body">
//             <p class="mb-0">
//                 ${message}
//             </p>
//         </div>
//     </div>
// `;

//   // Append the new li element to the ul
//   messageList.appendChild(newListItem);
// }

// function adduserstoUi(name, number) {
//   // Assuming you have a reference to the ul element with id 'user-list'
//   const userList = document.getElementById("user-list");

//   // Create a new li element
//   const newListItem = document.createElement("li");
//   newListItem.classList.add("p-2", "border-bottom");
//   newListItem.style.backgroundColor = "#eee";

//   // Create the inner content structure
//   newListItem.innerHTML = `
//     <a href="#!" class="d-flex justify-content-between">
//         <div class="d-flex flex-row">
//             <img src="https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
//                 alt="avatar"
//                 class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                 width="60">
//             <div class="pt-1">
//                 <p class="fw-bold mb-0">${name}</p>
//                 <p>${number}</p>
//             </div>
//         </div>

//     </a>
// `;

//   // Append the new li element to the ul
//   userList.appendChild(newListItem);
// }
