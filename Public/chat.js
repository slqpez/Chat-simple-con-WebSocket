const socket = io();

let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", function() {
  socket.emit("mensaje", {
    message: message.value,
    username: username.value
  });
  message.value = "";
  message.focus();
});

document.addEventListener("keypress", function(e) {
  if (e.keyCode == 13) {
    socket.emit("mensaje", {
      message: message.value,
      username: username.value
    });
    message.value = "";
    message.focus();
  }
});

message.addEventListener("keypress", function() {
  socket.emit("escribiendo", username.value);
});

socket.on("mensaje", function(data) {
  actions.innerHTML = "";
  output.innerHTML += `<p> 
  <strong> ${data.username}</strong>: ${data.message} 
  </p>`;
});

socket.on("escribiendo", function(data) {
  actions.innerHTML = `<p><em>${data} está escribiendo...</em></p>`;
});
