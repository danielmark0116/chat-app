const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const io = socketIo.listen(server);
const port = process.env.PORT || 8000;

const UserService = require('./services/UserService');
const userService = new UserService();

const socketManager = require('./controllers/socket');

require('dotenv').config();

app.use(express.static(__dirname + '/public'));

socketManager(io, userService);

if (process.env.MODE === 'production') {
  app.get('/', (req, res) => {
    res.sendFile('index');
  });
}

server.listen(port, () => console.log(`Server is running on port ${port}`));
