const path = require("path");
const express = require("express");
const app = express();

//Setttings
//Se configura el puerto
app.set("port", process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, "public")));

//Se inicia el servidor
const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

const SocketIO = require("socket.io");
const io = SocketIO(server);

//WebSockets
io.on("connection", socket => {
  console.log("new connection", socket.id);

  socket.on("mensaje", data => {
    io.sockets.emit("mensaje", data);
  });

  socket.on("escribiendo", data => {
    socket.broadcast.emit("escribiendo", data);
  });
});
