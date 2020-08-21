import React, { useEffect, useState } from "react";
import "./App.css";
import socket from "./socket";
import ChessGame from "./components/chess";

function App() {
  const [user, setUser] = useState("");
  const [whiteChess, setWhiteChess] = useState([
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
  ]);
  const [bleckChess, setBleckChess] = useState([
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
  ]);
  const [gameRooms, setGameRooms] = useState("");
  useEffect(() => {
    socket.on("onlineUsers", console.log);
    socket.on("gameRoomWasUpdated", console.log);
    socket.on("boardPositions", ({ positionsWhite, positionsBleck }) => {
      setWhiteChess(positionsWhite);
      setBleckChess(positionsBleck);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            socket.emit("user", user);
          }}
        >
          <input
            value={user}
            onChange={({ target: { value } }) => setUser(value)}
          />
        </form>
      </header>
      <ChessGame {...{ whiteChess, bleckChess }} />
    </div>
  );
}

export default App;
