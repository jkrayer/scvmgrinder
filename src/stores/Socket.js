// Establish a Socket.io connection
// const socket = new WebSocket("wss://dae9057c.ngrok.io");
const socket = io("http://localhost:3030/");

// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
client.configure(feathers.socketio(socket));
// Use localStorage to store our login token
// client.configure(feathers.authentication());

// // Connection opened
// socket.addEventListener("open", function (event) {
//   console.log("It's open");
// });

// // Listen for messages
// socket.addEventListener("message", function (event) {
//   messageStore.set(event.data);
// });

export default client;
