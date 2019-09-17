// const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const port = 3000;

const UserService = require('./services/UserService');
const userService = new UserService();

app.use(express.static(__dirname + '/public'));

const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile('index');
});

io.on('connection', socket => {
  console.log('socket io: user connected');
  socket.on('join', name => {
    userService.addUser({
      id: socket.id,
      name
    });
  });
  io.emit('update', { users: userService.getAllUsers() });
  socket.on('disconnect', () => {
    console.log('user disconected');
    userService.removeUser(socket.id);
    socket.broadcast.emit('update', {
      users: userService.getAllUsers()
    });
  });
  socket.on('message', msg => {
    const { name } = userService.getUserById(socket.id);
    socket.broadcast.emit('message', {
      msg: msg.text,
      from: name
    });
  });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
