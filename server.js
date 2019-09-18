const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const io = socketIo.listen(server);
const port = process.env.PORT || 8000;
require('dotenv').config();

const UserService = require('./services/UserService');
const userService = new UserService();

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  console.log('SockeIO: user connected');

  socket.on('join', name => {
    userService.addUser({
      id: socket.id,
      name
    });

    console.log('SockeIO: New user joined the channel');

    io.emit('update', { users: userService.getAllUsers() });
  });

  io.emit('update', { users: userService.getAllUsers() });

  socket.on('disconnect', () => {
    console.log('user disconected');

    userService.removeUser(socket.id);

    socket.broadcast.emit('update', {
      users: userService.getAllUsers()
    });

    console.log('SockeIO: User disconnected from the channel');

    socket.emit('userDisconnected', true);
  });

  socket.on('message', msg => {
    const { name } = userService.getUserById(socket.id);

    socket.emit('message', {
      msg: msg,
      from: name
    });

    socket.broadcast.emit('message', {
      msg: msg,
      from: name
    });
  });
});

if (process.env.MODE === 'production') {
  app.get('/', (req, res) => {
    res.sendFile('index');
  });
}

server.listen(port, () => console.log(`Server is running on port ${port}`));
