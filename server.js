const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io');
require('dotenv').config();
const port = process.env.PORT || 8000;

const UserService = require('./services/UserService');
const userService = new UserService();

app.use(express.static(__dirname + '/public'));

const io = socketIo.listen(server);

io.on('connection', socket => {
  console.log('socket io: user connected');
  socket.on('join', name => {
    console.log('add user');
    userService.addUser({
      id: socket.id,
      name
    });
    io.emit('update', { users: userService.getAllUsers() });
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
    // const { name } = userService.getUserById(socket.id);
    // console.log('user id ', socked.id);
    console.log('msg is: ', msg);
    // socket.broadcast.emit('message', {
    //   msg: msg.text,
    //   from: name
    // });
  });
});

if (process.env.MODE === 'production') {
  app.get('/', (req, res) => {
    res.sendFile('index');
  });
}
server.listen(port, () => console.log(`Server is running on port ${port}`));
