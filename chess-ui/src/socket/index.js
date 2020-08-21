import openSocket from "socket.io-client";

const socket = openSocket("http://192.168.0.104:4000/");

export default socket;
