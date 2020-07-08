import openSocket from "socket.io-client";
const socket = openSocket("http://192.168.31.243:4000/");

export default socket;
