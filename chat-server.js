const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected!`);
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("user-chat", msg);
  });
});

server.listen(3001, () => {
  console.log("listening on port 3001");
});
