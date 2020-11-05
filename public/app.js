/**
 * View logic
 */


let socket = io.connect("http://localhost:5000");

let userlist = document.getElementById("userlist");
let roomlist = document.getElementById("roomlist");
let message = document.getElementById("message");
let sendMessageBtn = document.getElementById("send");
let createRoomBtn = document.getElementById("create-room");
let messages = document.getElementById("msg");
let chatDisplay = document.getElementById("chat-display");


let currentRoom = "general";


// Send message on button click
sendMessageBtn.addEventListener("click", function () {
  socket.emit("sendMessage", message.value);
  message.value = "";
});

// Send message on enter key press
message.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    sendMessageBtn.click();
  }
});

// Create new room on button click
createRoomBtn.addEventListener("click", function () {
  socket.emit("createRoom", prompt("Enter new room: "));
});


socket.on("connect", function () {
  socket.emit("createUser", prompt("Enter name: "));
});


socket.on("updateChat", function (username, data) {
  if (username == "INFO") {
    messages.innerHTML +=
      "<p class='alert alert-warning w-100'>" + data + "</p>";
  } else {
    messages.innerHTML +=
      "<p><span><strong>" + username + ": </strong></span>" + data + "</p>";
  }

  // socket.emit("updatUserChat"); 

  chatDisplay.scrollTop = chatDisplay.scrollHeight;
});


socket.on("updateUsers", function (usernames) {
  userlist.innerHTML = "";

  for (let user in usernames) {
    userlist.innerHTML += "<li>" + user + "</li>";
  }
});


socket.on("updateRooms", function (rooms, newRoom) {
  roomlist.innerHTML = "";

  for (let index in rooms) {
    roomlist.innerHTML +=
      '<li class="rooms" id="' +
      rooms[index] +
      '" onclick="changeRoom(\'' +
      rooms[index] +
      "')\"># " +
      rooms[index] +
      "</li>";
  }

  if (newRoom != null) {
    document.getElementById(newRoom).classList.add("text-warning");
  } else {
    document.getElementById(currentRoom).classList.add("text-warning");
  }

});


function changeRoom(room) {

  if (room != currentRoom) {
    socket.emit("updateRooms", room);
    document.getElementById(currentRoom).classList.remove("text-warning");
    currentRoom = room;
    document.getElementById(currentRoom).classList.add("text-warning");
  }

}