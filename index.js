const app = require("express")();
const server = require("http").createServer(app);
const fs = require("fs");
const io = require("socket.io").listen(server);

const cors = require("cors");
const { update } = require("lodash");
const { v4: uuidv4 } = require("uuid");

const connections = [];
let gameRooms = [];

let positionsWhite = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
let positionsBleck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

server.listen(process.env.PORT || 4000);

// app.use(cors());
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
    emitUsersOnline(io);
    emitBoardPositions(io);
  });

  socket.on("createGameRoom", function ({ whitePlayer, blackPlayer } = {}) {
    if (socket.user) {
      newGameRoom = createGameRoom({ whitePlayer, blackPlayer });
      gameRooms = [...gameRooms, newGameRoom];
      socket.gameRoomId = newGameRoom.id;
      emitGameRoomWasCreated(io, { gamaRoom: newGameRoom });
      emitGameRoomWasUpdated(io);
    }
  });

  socket.on("changeChessPosition", function (white, black) {
    if (white && black && socket.gameRoomId) {
      positionsWhite = white;
      positionsBlack = black;
    }

    emitBoardPositions(io, socket.gameRoomId);
  });

  socket.on("disconnect", function () {
    connections.splice(connections.indexOf(socket), 1);
    emitUsersOnline(io);
  });
});

function createGameRoom({ whitePlayer, blackPlayer }) {
  console.log(789);
  return { id: uuidv4(), whitePlayer, blackPlayer };
}

function emitGameRoomWasCreated(io, { gameRoom }) {
  io.emit("gameRoomWasCreated", { gameRoom, gameRooms });
}
function emitGameRoomWasUpdated(io) {
  io.emit("gameRoomWasUpdated", gameRooms);
}

function emitBoardPositions(io, id) {
  io.emit(
    "boardPositions",
    { positionsWhite, positionsBleck }
    // gameRooms = update(gameRooms, { id }, { id, positionsWhite, positionsBlack })
  );
}

function emitUsersOnline(io) {
  io.emit("onlineUsers", {
    hey: connections.reduce(
      (str, client) => `${str} \n hey ${client.user}`,
      ""
    ),
    onlineUsers: connections.filter(({ user }) => user).map(({ user }) => user),
  });
}
