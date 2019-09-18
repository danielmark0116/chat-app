module.exports = function(io, userService) {
  io.on('connection', socket => {
    console.log('SockeIO: socket opened');

    socket.on('join', name => {
      userService.addUser({
        id: socket.id,
        name
      });

      console.log('SockeIO: New user joined the channel');

      io.emit('update', { users: userService.getAllUsers() });
      socket.emit('userDisconnected', false);
    });

    io.emit('update', { users: userService.getAllUsers() });

    socket.on('leaveChat', () => {
      console.log('SockeIO: User left the channel');
      socket.emit('userDisconnected', true);
      socket.emit('disconnect');
    });

    socket.on('disconnect', () => {
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
};
