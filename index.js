const app = require("express")();
const server = require("http").createServer(app);
const fs = require("fs");
const io = require("socket.io").listen(server);
const cors = require("cors");

const users = [];
const connections = [];
const gameRums = [];

server.listen(process.env.PORT || 4000);

app.use(cors());
app.get("*", (req, res) => {
  switch (req.originalUrl) {
    case "/":
      res.sendFile(`${__dirname}/chess-ui/build/`);
    default:
      res.sendFile(`${__dirname}/chess-ui/build${req.originalUrl}`);
      break;
  }
});

io.on("connection", (socket) => {
  connections.push(socket);
  socket.on("user", function (user) {
    socket.user = user;
    io.emit(
      "onlineUsers",
      connections.reduce((str, client) => `${str} \n hey ${client.user}`)
    );
    // socket.emit("changed", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15]);
  });
  socket.on("changeChessPosition", function (
    positionsWhite = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    positionsBlack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  ) {
    // console.log(positions)

    io.emit("changed", { positionsWhite, positionsBlack });
  });

  // socket.on("createGameRoom", ({}) => {
  //   if (socket.user) {
  //     this.gameRoomId = `id:${Math.random()}-${Math.random()}`;
  //     gameRums[this.gameRoom] = { players: [socket.user], id: this.gameRoom };
  //   }
  // });

  // socket.on("joinGameRoom", (id) => {
  //   if ((socket.user, gameRums[id] && gameRums[id].players.length === 1)) {
  //     gameRums[id] = {
  //       ...gameRums[id],
  //       players: [...gameRums[id].players, this.user],
  //     };
  //   }
  // });

  // socket.on("closeGameRoom", (id) => {
  //   if ((gameRums[id], socket.user)) {
  //     delete gameRums[id];
  //   }
  // });
  // socket.on("changePositionInGameRoom", (id, color, chessNumber) => {

  //   //   if ((gameRums[id], socket.user, color, chessNumber)) {
  //   //     const chessPositions =
  //   //       gameRums[id][
  //   //         color === "white" ? "whiteChessPositions" : "blackChessPositions"
  //   //       ];
  //   //     gameRums[id][chessPositions] = {
  //   //       ...(gameRums[id][chessPositions][chessNumber] = chessNumber),
  //   //     };
  //   //   }
  // });
});
