const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

const {generateMessage} = require('./utils/message');
let app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  // socket.emit from Admin text Welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  // socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
  // socket.emit('newEmail',{
  //   from: 'mike@example.com',
  //   text: 'hey what is going ',
  //   createAt: 123
  // });
  // socket.emit('newMessage', {
  //   from: "john",
  //   text: 'see you then',
  //   createdAt: 12343
  // })

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })

})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
