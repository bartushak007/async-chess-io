import React, { useEffect, useState } from "react";
import "./App.css";
import socket from "./socket";
import ChessGame from './components/chess';

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    socket.on("onlineUsers", console.log);
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
      <ChessGame />
    </div>
  );
}



export default App;
